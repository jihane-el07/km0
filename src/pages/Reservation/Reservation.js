import React, { useState } from 'react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Réservation envoyée : ${formData.nom}`);
    // Place for API call
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}>
        <h2 style={styles.title}>Réserver une séance</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            value={formData.nom}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Votre message"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Envoyer</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: `url('/images/Reservation.png')`, // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: '#e6d8c3cc', // semi-transparent beige
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    width: '80%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  title: {
    color: '#88490d',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#88490d',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
