import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Verification.module.css';
import { CheckCircle2, XCircle, AlertCircle, X, LogOut, Camera } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

export default function Verification() {
    const { reservationId } = useParams();
    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ show: false, message: '', type: '', title: '' });
    const [scanning, setScanning] = useState(!reservationId);
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');
    const scannerRef = useRef(null);
    const scannerInitialized = useRef(false);

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
        if (!reservationId) {
            setScanning(true);
            setReservation(null);
        } else {
            setScanning(false);
        }
    }, [reservationId]);

    // Get available cameras with proper back camera detection
    useEffect(() => {
        const getCameras = async () => {
            try {
                // First get media access
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: { ideal: 'environment' } } 
                });
                
                // Get all devices
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                
                // Identify back camera
                let backCamera = null;
                videoDevices.forEach(device => {
                    if (device.label.toLowerCase().includes('back') || 
                        device.label.toLowerCase().includes('rear') ||
                        device.label.toLowerCase().includes('environment')) {
                        backCamera = device;
                    }
                });
                
                setCameras(videoDevices);
                
                // Prefer back camera if available
                if (backCamera) {
                    setSelectedCamera(backCamera.deviceId);
                } else if (videoDevices.length > 0) {
                    setSelectedCamera(videoDevices[0].deviceId);
                }
                
                // Clean up stream
                stream.getTracks().forEach(track => track.stop());
            } catch (error) {
                console.error('Error getting cameras:', error);
                showModal('Camera access denied. Please enable camera permissions in your browser settings.', 'error', 'Camera Error');
            }
        };

        if (scanning) {
            getCameras();
        }
    }, [scanning]);

    // Initialize scanner with optimized settings
    useEffect(() => {
        let html5QrCode = null;

        const initScanner = async () => {
            if (!scanning || !selectedCamera || scannerInitialized.current) return;

            const qrReaderElement = document.getElementById('qr-reader');
            if (!qrReaderElement) return;

            try {
                html5QrCode = new Html5Qrcode("qr-reader");
                const config = {
                    fps: 5,  // Reduced FPS for better mobile performance
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                    disableFlip: true  // Improves detection for most QR codes
                };

                await html5QrCode.start(
                    { deviceId: selectedCamera },
                    config,
                    handleScan,
                    handleScanError
                );

                scannerRef.current = html5QrCode;
                scannerInitialized.current = true;
            } catch (err) {
                console.error('Scanner initialization error:', err);
                if (err.message.includes('Permission denied')) {
                    showModal('Camera permission denied. Please allow camera access in browser settings.', 'error', 'Permission Required');
                } else {
                    showModal(`Scanner error: ${err.message}`, 'error', 'Scanner Error');
                }
            }
        };

        initScanner();

        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(err => {
                    if (!err.message.includes('Scanner is not started')) {
                        console.error('Failed to stop scanner:', err);
                    }
                });
                scannerRef.current = null;
                scannerInitialized.current = false;
            }
        };
    }, [scanning, selectedCamera]);

    const handleScan = (decodedText) => {
        try {
            // Stop scanner before navigation
            if (scannerRef.current) {
                scannerRef.current.stop().catch(console.error);
                scannerRef.current = null;
                scannerInitialized.current = false;
            }
            
            // Navigate to the details page
            navigate(`/verification/${decodedText}`);
        } catch (error) {
            showModal('Invalid QR code format', 'error', 'Scan Error');
        }
    };

    const handleScanError = (errorMessage, error) => {
        // Ignore expected "not found" errors during scanning
        const isIgnorableError = 
            error?.name === 'NotFoundException' ||
            error?.name === 'NoQRCodeFoundException' ||
            errorMessage.includes('No QR code found') ||
            errorMessage.includes('No MultiFormat Readers were able to detect the code') ||
            errorMessage.includes('QR code parse error');
        
        if (!isIgnorableError) {
            console.error('Scan error:', errorMessage, error);
            showModal('Error scanning QR code. Please try again.', 'error', 'Scan Error');
        }
    };

    const handleCameraChange = (event) => {
        setSelectedCamera(event.target.value);
        
        // Reset scanner
        if (scannerRef.current) {
            scannerRef.current.stop().catch(console.error);
            scannerRef.current = null;
            scannerInitialized.current = false;
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
                    {cameras.length > 0 ? (
                        <>
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
                            <div className={styles.scannerWrapper}>
                                <div 
                                    id="qr-reader" 
                                    className={styles.scanner}
                                    style={{ minHeight: '300px' }}
                                ></div>
                                <div className={styles.scannerOverlay}>
                                    <div className={styles.scanFrame}></div>
                                    <p className={styles.scanHint}>Position QR code here</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.cameraPermissionPrompt}>
                            <Camera size={48} />
                            <p>Camera permission required</p>
                            <button 
                                className={styles.enableCameraButton}
                                onClick={() => window.location.reload()}
                            >
                                Enable Camera
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