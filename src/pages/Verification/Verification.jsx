import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Verification.module.css';
import { CheckCircle2, XCircle, AlertCircle, X, QrCode, LogOut, Camera } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Verification() {
    const { reservationId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ show: false, message: '', type: '', title: '' });
    const [scanning, setScanning] = useState(!reservationId);
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');
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

    // Add effect to handle route changes
    useEffect(() => {
        if (!reservationId) {
            setScanning(true);
            setReservation(null);
        }
    }, [reservationId]);

    useEffect(() => {
        // Get available cameras
        const getCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setCameras(videoDevices);
                if (videoDevices.length > 0) {
                    setSelectedCamera(videoDevices[0].deviceId);
                }
            } catch (error) {
                console.error('Error getting cameras:', error);
                showModal('Error accessing camera. Please ensure camera permissions are granted.', 'error', 'Camera Error');
            }
        };

        getCameras();
    }, []);

    useEffect(() => {
        let scanner = null;
        if (scanning && !scannerRef.current) {
            // Wait for the next render cycle to ensure the DOM element exists
            setTimeout(() => {
                const qrReaderElement = document.getElementById('qr-reader');
                if (qrReaderElement) {
                    try {
                        scanner = new Html5QrcodeScanner('qr-reader', {
                            qrbox: {
                                width: 500,
                                height: 500,
                            },
                            fps: 10,
                            videoConstraints: {
                                facingMode: "environment"
                            },
                            aspectRatio: 1.0,
                            showTorchButtonIfSupported: true,
                            showZoomSliderIfSupported: true,
                            defaultZoomValueIfSupported: 2,
                            rememberLastUsedCamera: true,
                            showScanButton: false,
                            showStopButton: false,
                        });

                        scanner.render(handleScan, handleScanError)
                            .catch(err => {
                                console.error('Failed to start scanner:', err);
                                showModal('Failed to start camera. Please check camera permissions.', 'error', 'Camera Error');
                            });
                        scannerRef.current = scanner;
                    } catch (error) {
                        console.error('Scanner initialization error:', error);
                        showModal('Failed to initialize scanner. Please try again.', 'error', 'Scanner Error');
                    }
                }
            }, 100);
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear()
                    .catch(err => console.error('Failed to clear scanner:', err));
                scannerRef.current = null;
            }
        };
    }, [scanning]);

    const handleScan = (decodedText) => {
        try {
            // Navigate to the details page with the scanned ID
            navigate(`/verification/${decodedText}`);
        } catch (error) {
            showModal('Invalid QR code format', 'error', 'Scan Error');
        }
    };

    const handleScanError = (error) => {
        console.error('Scan error:', error);
    };

    const handleCameraChange = (event) => {
        setSelectedCamera(event.target.value);
        if (scannerRef.current) {
            scannerRef.current.clear()
                .catch(err => console.error('Failed to clear scanner:', err));
            scannerRef.current = null;
        }
        // Force scanner re-initialization
        setScanning(false);
        setTimeout(() => setScanning(true), 100);
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
            // Navigate back to scanner after successful verification
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
                    {cameras.length > 0 && (
                        <div className={styles.cameraSelector}>
                            <Camera size={20} />
                            <select
                                value={selectedCamera}
                                onChange={handleCameraChange}
                                className={styles.cameraSelect}
                            >
                                {cameras.map((camera) => (
                                    <option key={camera.deviceId} value={camera.deviceId}>
                                        {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div id="qr-reader" className={styles.scanner}></div>
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