import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Verification.module.css';
import { CheckCircle2, XCircle, AlertCircle, X, QrCode, LogOut } from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { BarcodeFormat } from '@zxing/library';

export default function Verification() {
    const { reservationId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ show: false, message: '', type: '', title: '' });
    const [scanning, setScanning] = useState(!reservationId);
    const [cameraError, setCameraError] = useState(null);
    const videoRef = useRef(null);
    const codeReader = useRef(new BrowserQRCodeReader());

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    showModal('Please login to access this page', 'warning', 'Login Required');
                    navigate('/login');
                    return;
                }

                const response = await fetch('https://km0-api.vercel.app/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Authentication failed');
                }

                const userData = await response.json();
                if (userData.role !== 'verifier') {
                    showModal('Only verifiers can access this page', 'error', 'Access Denied');
                    navigate('/');
                    return;
                }

                if (reservationId) {
                    fetchReservationDetails();
                } else {
                    setLoading(false);
                    setScanning(true);
                }
            } catch (error) {
                console.error('Auth error:', error);
                showModal('Authentication failed. Please login again.', 'error', 'Error');
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate, reservationId]);

    useEffect(() => {
        if (scanning && videoRef.current) {
            const startScanning = async () => {
                try {
                    const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
                    const selectedDeviceId = videoInputDevices[0].deviceId;

                    await codeReader.current.decodeFromVideoDevice(
                        selectedDeviceId,
                        videoRef.current,
                        (result, err) => {
                            if (result) {
                                handleScan(result);
                            }
                            if (err && !(err instanceof Error)) {
                                handleError(err);
                            }
                        }
                    );
                } catch (error) {
                    console.error('Scanner initialization error:', error);
                    handleError(error);
                }
            };

            startScanning();
        }

        return () => {
            if (codeReader.current) {
                try {
                    // Stop the video stream
                    if (videoRef.current && videoRef.current.srcObject) {
                        const tracks = videoRef.current.srcObject.getTracks();
                        tracks.forEach(track => track.stop());
                    }
                    // Clear the video element
                    if (videoRef.current) {
                        videoRef.current.srcObject = null;
                    }
                } catch (error) {
                    console.error('Error cleaning up scanner:', error);
                }
            }
        };
    }, [scanning]);

    const handleScan = (result) => {
        try {
            // Get the raw text from the QR code
            const qrText = result?.getText()?.trim();

            // Basic validation
            if (!qrText) {
                console.error('Empty QR code result:', result);
                showModal('Invalid QR code. Please scan a valid reservation QR code.', 'error', 'Invalid QR Code');
                return;
            }

            // Stop scanning and navigate
            setScanning(false);
            navigate(`/verification/${qrText}`);
        } catch (error) {
            console.error('Scan processing error:', error);
            showModal('Error processing QR code. Please try again.', 'error', 'Scan Error');
        }
    };

    const handleError = (error) => {
        console.error('Camera error:', error);
        setCameraError(error);

        if (error.name === 'NotAllowedError') {
            showModal('Camera access denied. Please allow camera access in your browser settings.', 'error', 'Camera Access Denied');
        } else if (error.name === 'NotFoundError') {
            showModal('No camera found. Please connect a camera and try again.', 'error', 'No Camera');
        } else if (error.name === 'NotReadableError') {
            showModal('Camera is in use by another application. Please close other apps using the camera.', 'error', 'Camera In Use');
        } else {
            showModal('Error accessing camera. Please check camera permissions and try again.', 'error', 'Camera Error');
        }
    };

    const fetchReservationDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://km0-api.vercel.app/verification/${reservationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Reservation not found');
            }
            const data = await response.json();
            setReservation(data.reservation);
            setScanning(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                showModal('Please login to verify reservations', 'warning', 'Login Required');
                navigate('/login');
                return;
            }

            const response = await fetch(`https://km0-api.vercel.app/verification/verify/${reservationId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to verify reservation');
            }

            showModal('Reservation verified successfully!', 'success', 'Success');
            navigate('/verification');
        } catch (error) {
            showModal(error.message || 'Failed to verify reservation', 'error', 'Error');
        }
    };

    const handleBackToScanner = () => {
        navigate('/verification');
        setScanning(true);
        setReservation(null);
    };

    const showModal = (message, type = 'error', title = '') => {
        setModal({ show: true, message, type, title });
    };

    const hideModal = () => {
        setModal({ show: false, message: '', type: '', title: '' });
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <XCircle size={48} />
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <button onClick={handleLogout} className={styles.logoutButton}>
                <LogOut size={20} />
                Logout
            </button>
            <img src="/M.png" alt="" className={styles.logo} width={80} />
            {modal.show && (
                <div className={styles.modalOverlay}>
                    <div className={`${styles.modal} ${styles[modal.type]}`}>
                        <div className={styles.modalHeader}>
                            {modal.type === 'success' && <CheckCircle2 size={24} />}
                            {modal.type === 'error' && <AlertCircle size={24} />}
                            {modal.type === 'warning' && <AlertCircle size={24} />}
                            <h3>{modal.title}</h3>
                            <button onClick={hideModal} className={styles.closeButton}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalContent}>
                            <p>{modal.message}</p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={hideModal} className={styles.okButton}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {scanning ? (
                <div className={styles.scannerContainer}>
                    <h1>Scan Reservation QR Code</h1>
                    <div className={styles.scanner}>
                        <video ref={videoRef} style={{ width: '100%', height: '100%' }} />
                    </div>
                    {cameraError && (
                        <div className={styles.errorContainer}>
                            <p className={styles.errorMessage}>
                                {cameraError.name === 'NotAllowedError'
                                    ? 'Camera access denied. Please allow camera access in your browser settings.'
                                    : cameraError.name === 'NotFoundError'
                                        ? 'No camera found. Please connect a camera and try again.'
                                        : cameraError.name === 'NotReadableError'
                                            ? 'Camera is in use by another application. Please close other apps using the camera.'
                                            : 'Error accessing camera. Please check camera permissions and try again.'}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className={styles.retryButton}
                            >
                                Retry Camera
                            </button>
                        </div>
                    )}
                    <p className={styles.scannerInstructions}>
                        Position the QR code within the frame to scan
                    </p>
                </div>
            ) : (
                <div className={styles.verificationCard}>
                    <div className={styles.header}>
                        <h1>Reservation Verification</h1>
                        <div className={`${styles.status} ${styles[reservation?.status]}`}>
                            {reservation?.status}
                        </div>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Name:</span>
                            <span className={styles.value}>{reservation?.firstName} {reservation?.lastName}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Type:</span>
                            <span className={styles.value}>{reservation?.type}</span>
                        </div>
                        {reservation?.type === 'event' && (
                            <div className={styles.detailItem}>
                                <span className={styles.label}>Event Type:</span>
                                <span className={styles.value}>{reservation?.eventType}</span>
                            </div>
                        )}
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Date:</span>
                            <span className={styles.value}>
                                {new Date(reservation?.date).toLocaleDateString()}
                            </span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Time:</span>
                            <span className={styles.value}>{reservation?.time}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Guests:</span>
                            <span className={styles.value}>{reservation?.numberOfGuests}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Contact:</span>
                            <span className={styles.value}>{reservation?.contactEmail}</span>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        {!reservation?.isVerified && (
                            <button
                                onClick={handleVerification}
                                className={styles.verifyButton}
                            >
                                Verify Reservation
                            </button>
                        )}
                        <button
                            onClick={handleBackToScanner}
                            className={styles.backButton}
                        >
                            Back to Scanner
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 