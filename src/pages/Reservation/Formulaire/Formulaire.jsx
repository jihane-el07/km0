import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./Formulaire.module.css"
import { Calendar1, Mail, Phone, Timer, User, User2, Users, Calendar, Edit2, Trash2, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Formulaire() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEventPage = location.pathname.includes('/Event');
  const eventType = location.state?.eventType;

  const [isVisible, setIsVisible] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const sectionRef = useRef(null);

  const [modal, setModal] = useState({ show: false, message: '', type: '', title: '', onConfirm: null });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    fetchMyReservations();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://km0-api.vercel.app/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setFormData(prev => ({
            ...prev,
            email: userData.email || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchMyReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('https://km0-api.vercel.app/reservations/my-reservations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    numberOfGuests: "",
    type: location.state?.type || (isEventPage ? "event" : "table"),
    eventType: eventType || "",
    specialRequests: "",
    diningOption: "In",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.numberOfGuests) {
      newErrors.numberOfGuests = 'Number of guests is required';
    } else if (parseInt(formData.numberOfGuests) < 1) {
      newErrors.numberOfGuests = 'Minimum 1 guest required';
    }

    if (formData.type === 'event' && !formData.eventType) {
      newErrors.eventType = 'Event type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      numberOfGuests: "",
      type: location.state?.type || (isEventPage ? "event" : "table"),
      eventType: "",
      specialRequests: "",
      diningOption: "In",
    });
    setErrors({});
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (reservation) => {
    setFormData({
      firstName: reservation.firstName || "",
      lastName: reservation.lastName || "",
      email: reservation.contactEmail,
      phone: reservation.contactPhone,
      date: new Date(reservation.date).toISOString().split('T')[0],
      time: reservation.time,
      numberOfGuests: reservation.numberOfGuests.toString(),
      type: reservation.type,
      eventType: reservation.eventType || "",
      specialRequests: reservation.specialRequests || "",
      diningOption: reservation.diningOption || "In",
    });
    setIsEditing(true);
    setEditingId(reservation._id);
  };

  const showModal = (message, type = 'error', title = '', onConfirm = null) => {
    setModal({ show: true, message, type, title, onConfirm });
  };

  const hideModal = () => {
    setModal({ show: false, message: '', type: '', title: '', onConfirm: null });
  };

  const handleDelete = async (id) => {
    showModal(
      'Are you sure you want to delete this reservation?',
      'warning',
      'Confirm Deletion',
      async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`https://km0-api.vercel.app/reservations/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            setReservations(prev => prev.filter(res => res._id !== id));
            showModal('Reservation deleted successfully', 'success', 'Success');
          } else {
            throw new Error('Failed to delete reservation');
          }
        } catch (error) {
          console.error('Error deleting reservation:', error);
          showModal('Failed to delete reservation. Please try again.', 'error', 'Error');
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      showModal('Please login to make a reservation', 'warning', 'Login Required');
      navigate('/login');
      return;
    }

    const reservationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      type: formData.type,
      date: new Date(formData.date).toISOString(),
      time: formData.time,
      numberOfGuests: parseInt(formData.numberOfGuests),
      status: isEditing ? "confirmed" : "pending",
      specialRequests: formData.specialRequests || undefined,
      contactPhone: formData.phone,
      contactEmail: formData.email,
      ...(formData.type === 'event' && { eventType: formData.eventType })
    };

    try {
      const url = isEditing
        ? `https://km0-api.vercel.app/reservations/${editingId}`
        : 'https://km0-api.vercel.app/reservations';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Reservation failed');
      }

      const data = await response.json();

      // Show appropriate message based on email sending status
      const message = data.emailSent
        ? 'Reservation submitted successfully! Please check your email for confirmation and QR code.'
        : 'Reservation submitted successfully! However, there was an issue sending the confirmation email.';

      showModal(
        isEditing
          ? 'Reservation updated successfully!'
          : message,
        'success',
        'Success'
      );

      resetForm();
      fetchMyReservations();
    } catch (error) {
      console.error('Reservation error:', error);
      showModal(error.message || 'Failed to submit reservation. Please try again.', 'error', 'Error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div ref={sectionRef} className={styles.statsSection}>
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
              {modal.type === 'warning' ? (
                <>
                  <button onClick={hideModal} className={styles.cancelButton}>
                    Cancel
                  </button>
                  <button onClick={() => {
                    if (modal.onConfirm) {
                      modal.onConfirm();
                    }
                    hideModal();
                  }} className={styles.confirmButton}>
                    Confirm
                  </button>
                </>
              ) : (
                <button onClick={hideModal} className={styles.okButton}>
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>
        {isVisible &&
          <div className={styles.content}>
            {reservations.length > 0 && (
              <div className={styles.reservationsList}>
                <h3>My Reservations</h3>
                {reservations.map(reservation => (
                  <div key={reservation._id} className={styles.reservationCard}>
                    <div className={styles.reservationInfo}>
                      <h4>{reservation.type === 'event' ? 'Event' : 'Table'} Reservation</h4>
                      <p>Date: {formatDate(reservation.date)}</p>
                      <p>Time: {reservation.time}</p>
                      <p>Guests: {reservation.numberOfGuests}</p>
                      {reservation.type === 'event' && <p>Event Type: {reservation.eventType}</p>}
                      <p>Status: {reservation.status}</p>
                    </div>
                    <div className={styles.reservationActions}>
                      <button
                        onClick={() => handleEdit(reservation)}
                        className={styles.editButton}
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(reservation._id)}
                        className={styles.deleteButton}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.formWrapper}>
              <h2>{isEditing ? 'Edit Reservation' : 'Make a Reservation'}</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.typeSelector}>
                  <div className={styles.typeOption}>
                    <input
                      type="radio"
                      id="table"
                      name="type"
                      value="table"
                      checked={formData.type === "table"}
                      onChange={handleInputChange}
                      className={styles.typeRadio}
                    />
                    <label htmlFor="table" className={styles.typeLabel}>
                      <Calendar size={24} />
                      <span>Book a Table</span>
                    </label>
                  </div>
                  <div className={styles.typeOption}>
                    <input
                      type="radio"
                      id="event"
                      name="type"
                      value="event"
                      checked={formData.type === "event"}
                      onChange={handleInputChange}
                      className={styles.typeRadio}
                    />
                    <label htmlFor="event" className={styles.typeLabel}>
                      <Users size={24} />
                      <span>Book an Event</span>
                    </label>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="firstName" className={styles.label}>
                    First Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><User /></span>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Bob"
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                      required
                    />
                  </div>
                  {errors.firstName && <p className={styles.errorText}>{errors.firstName}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="lastName" className={styles.label}>
                    Last Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><User2 /></span>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Smith"
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                      required
                    />
                  </div>
                  {errors.lastName && <p className={styles.errorText}>{errors.lastName}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Mail /></span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="smithbob@gmail.com"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      required
                    />
                  </div>
                  {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Phone /></span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0123456789"
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      required
                    />
                  </div>
                  {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
                </div>

                {formData.type === 'event' && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="eventType" className={styles.label}>
                      Event Type
                    </label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.icon}><Users /></span>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className={`${styles.select} ${errors.eventType ? styles.inputError : ''}`}
                        required
                      >
                        <option value="">Select event type</option>
                        <option value="birthday">Birthday</option>
                        <option value="proposal">Proposal</option>
                        <option value="corporate">Corporate</option>
                        <option value="private">Private</option>
                        <option value="wedding">Wedding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors.eventType && <p className={styles.errorText}>{errors.eventType}</p>}
                  </div>
                )}

                <div className={styles.inputGroup}>
                  <label htmlFor="date" className={styles.label}>
                    Date
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Calendar1 /></span>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                      required
                    />
                  </div>
                  {errors.date && <p className={styles.errorText}>{errors.date}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="time" className={styles.label}>
                    Time
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Timer /></span>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`${styles.select} ${errors.time ? styles.inputError : ''}`}
                      required
                    >
                      <option value="">Select time</option>
                      <option value="18:00">18:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                    </select>
                  </div>
                  {errors.time && <p className={styles.errorText}>{errors.time}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="numberOfGuests" className={styles.label}>
                    Number of Guests
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Users /></span>
                    <select
                      id="numberOfGuests"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleInputChange}
                      className={`${styles.select} ${errors.numberOfGuests ? styles.inputError : ''}`}
                      required
                    >
                      <option value="">Select number of guests</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6">6 People</option>
                      <option value="7">7 People</option>
                      <option value="8">8 People</option>
                    </select>
                  </div>
                  {errors.numberOfGuests && <p className={styles.errorText}>{errors.numberOfGuests}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="specialRequests" className={styles.label}>
                    Special Requests
                  </label>
                  <div className={styles.inputWrapper}>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className={styles.textarea}
                      placeholder="Any special requests or requirements?"
                      rows="3"
                    />
                  </div>
                </div>

                {formData.type === 'table' && (
                  <div className={styles.radioGroup}>
                    <div className={styles.radioOption}>
                      <input
                        type="radio"
                        id="in"
                        name="diningOption"
                        value="In"
                        checked={formData.diningOption === "In"}
                        onChange={handleInputChange}
                        className={styles.radio}
                      />
                      <label htmlFor="in" className={styles.radioLabel}>
                        In
                      </label>
                    </div>
                    <div className={styles.radioOption}>
                      <input
                        type="radio"
                        id="out"
                        name="diningOption"
                        value="Out"
                        checked={formData.diningOption === "Out"}
                        onChange={handleInputChange}
                        className={styles.radio}
                      />
                      <label htmlFor="out" className={styles.radioLabel}>
                        Out
                      </label>
                    </div>
                  </div>
                )}

                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitButton}>
                    {isEditing ? 'Update Reservation' : (formData.type === 'event' ? 'Book Event' : 'Book A Table')}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
