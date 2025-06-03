import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Verification.module.css';
import { CheckCircle2, XCircle, AlertCircle, X, QrCode, LogOut } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

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
    const scannerRef = useRef(null);

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
        let html5QrCode = null;
        if (scanning && !scannerRef.current) {
            try {
                // Initialize the scanner with a smaller viewport
                html5QrCode = new Html5Qrcode("qr-reader", {
                    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                    verbose: false
                });

                const qrCodeSuccessCallback = (decodedText) => {
                    handleScan(decodedText);
                };

                // First try to get available cameras
                Html5Qrcode.getCameras().then(devices => {
                    if (devices && devices.length) {
                        // Try to use the back camera first, then fallback to any camera
                        const backCamera = devices.find(device =>
                            device.label.toLowerCase().includes('back') ||
                            device.label.toLowerCase().includes('rear')
                        );
                        const cameraId = backCamera ? backCamera.id : devices[0].id;

                        html5QrCode.start(
                            cameraId,
                            {
                                fps: 10,
                                qrbox: { width: 250, height: 250 },
                                aspectRatio: 1.0
                            },
                            qrCodeSuccessCallback,
                            handleError
                        ).then(() => {
                            console.log('Camera started successfully');
                            scannerRef.current = html5QrCode;
                        }).catch(err => {
                            console.error('Failed to start camera:', err);
                            // Try the first camera if back camera fails
                            if (backCamera && devices.length > 1) {
                                html5QrCode.start(
                                    devices[0].id,
                                    {
                                        fps: 10,
                                        qrbox: { width: 250, height: 250 },
                                        aspectRatio: 1.0
                                    },
                                    qrCodeSuccessCallback,
                                    handleError
                                ).then(() => {
                                    console.log('Fallback camera started successfully');
                                    scannerRef.current = html5QrCode;
                                }).catch(fallbackErr => {
                                    console.error('Fallback camera failed:', fallbackErr);
                                    showModal('Failed to start camera. Please check camera permissions.', 'error', 'Camera Error');
                                });
                            } else {
                                showModal('Failed to start camera. Please check camera permissions.', 'error', 'Camera Error');
                            }
                        });
                    } else {
                        showModal('No cameras found. Please connect a camera and try again.', 'error', 'Camera Error');
                    }
                }).catch(err => {
                    console.error('Error getting cameras:', err);
                    showModal('Error accessing camera. Please check camera permissions.', 'error', 'Camera Error');
                });
            } catch (error) {
                console.error('Scanner initialization error:', error);
                showModal('Failed to initialize scanner. Please try again.', 'error', 'Scanner Error');
            }
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(err => {
                    console.error('Failed to stop scanner:', err);
                });
                scannerRef.current = null;
            }
        };
    }, [scanning]);

    const handleScan = (decodedText) => {
        try {
            // Basic validation
            if (!decodedText) {
                console.error('Empty QR code result');
                showModal('Invalid QR code. Please scan a valid reservation QR code.', 'error', 'Invalid QR Code');
                return;
            }

            // Stop scanning and navigate
            setScanning(false);
            navigate(`/verification/${decodedText.trim()}`);
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
                    <div id="qr-reader" className={styles.scanner}></div>
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