import React, { useEffect, useRef, useState } from 'react'

import styles from "./Formulaire.module.css"
import { Calendar1, Mail, Phone, Timer, User, User2, Users } from 'lucide-react';

export default function Formulaire() {
      const [isVisible, setIsVisible] = useState(false);
      const sectionRef = useRef(null);
    
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    diningOption: "In",
  })



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }
    
  return (

    <div ref={sectionRef} className={styles.statsSection}>
      <div className={styles.container}>
        {isVisible &&
        <div className={styles.content}>
           <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="firstName" className={styles.label}>
                    First Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><User/></span>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Bob"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="lastName" className={styles.label}>
                    Last Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><User2/></span>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Smith"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Mail/></span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="smithbob@gmail.com"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Phone/></span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0123456789"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="date" className={styles.label}>
                    Date
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Calendar1/></span>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="time" className={styles.label}>
                    Time
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Timer/></span>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">00:00:00</option>
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
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="people" className={styles.label}>
                    People
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.icon}><Users/></span>
                    <select
                      id="people"
                      name="people"
                      value={formData.people}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Select number of people</option>
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
                </div>

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

                <button type="submit" className={styles.submitButton}>
                  Book A Table
                </button>
              </form>
            </div>
        </div>
        }
        
      </div>
      
    </div>
  )
}
