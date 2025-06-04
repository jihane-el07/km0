import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import ItemModal from './ItemModal';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('menu');
    const [adminName, setAdminName] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [patisserieItems, setPatisserieItems] = useState([]);
    const [events, setEvents] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('https://km0-api.vercel.app/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    navigate('/login');
                    return;
                }

                const userData = await response.json();
                setAdminName(userData.name);
            } catch (error) {
                console.error('Error fetching admin profile:', error);
                navigate('/login');
            }
        };

        fetchAdminProfile();
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const [menuRes, patisserieRes, eventsRes, reservationsRes] = await Promise.all([
                fetch('https://km0-api.vercel.app/menu', { headers }),
                fetch('https://km0-api.vercel.app/patisserie', { headers }),
                fetch('https://km0-api.vercel.app/events', { headers }),
                fetch('https://km0-api.vercel.app/reservations', { headers })
            ]);

            if (menuRes.ok) setMenuItems(await menuRes.json());
            if (patisserieRes.ok) setPatisserieItems(await patisserieRes.json());
            if (eventsRes.ok) setEvents(await eventsRes.json());
            if (reservationsRes.ok) setReservations(await reservationsRes.json());

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`https://km0-api.vercel.app/${type}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            let url = '';
            let method = 'POST';
            let endpoint = '';

            switch (activeSection) {
                case 'menu':
                    endpoint = 'menu';
                    break;
                case 'patisserie':
                    endpoint = 'patisserie';
                    break;
                case 'events':
                    endpoint = 'events';
                    break;
                case 'reservations':
                    endpoint = 'reservations';
                    break;
                default:
                    return;
            }

            if (selectedItem) {
                url = `https://km0-api.vercel.app/${endpoint}/${selectedItem._id}`;
                method = 'PUT';
            } else {
                url = `https://km0-api.vercel.app/${endpoint}`;
            }

            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchData();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const sections = [
        { id: 'menu', label: 'Menu Management' },
        { id: 'patisserie', label: 'Patisserie Management' },
        { id: 'events', label: 'Events Management' },
        { id: 'reservations', label: 'Reservations' }
    ];

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
    };

    // Pagination functions
    const getCurrentItems = (items) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return items.slice(indexOfFirstItem, indexOfLastItem);
    };

    const getTotalPages = (items) => {
        return Math.ceil(items.length / itemsPerPage);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = (items) => {
        const totalPages = getTotalPages(items);
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pages}
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        );
    };

    const getModalType = () => {
        switch (activeSection) {
            case 'menu':
                return 'Menu Item';
            case 'patisserie':
                return 'Patisserie Item';
            case 'events':
                return 'Event';
            case 'reservations':
                return 'Reservation';
            default:
                return '';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>
                    <img src="/images/M.png" alt="Logo" />
                </div>
                <ul className={styles.sectionList}>
                    {sections.map((section) => (
                        <li
                            key={section.id}
                            className={`${styles.sectionItem} ${activeSection === section.id ? styles.active : ''}`}
                            onClick={() => handleSectionClick(section.id)}
                        >
                            {section.label}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.welcomeSection}>
                        <h1>{sections.find(s => s.id === activeSection)?.label}</h1>
                        <p className={styles.welcomeMessage}>Hello, {adminName}!</p>
                    </div>
                    <button
                        className={styles.logoutButton}
                        onClick={() => setShowLogoutModal(true)}
                    >
                        Logout
                    </button>
                </div>

                <div className={styles.mainContent}>
                    {activeSection === 'menu' && (
                        <div className={styles.sectionContent}>
                            <div className={styles.actions}>
                                <button className={styles.addButton} onClick={handleAdd}>
                                    Add New Menu Item
                                </button>
                            </div>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCurrentItems(menuItems).map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className={styles.itemImage}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.price} DH</td>
                                                <td>
                                                    <button
                                                        className={styles.editButton}
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() => handleDelete('menu', item._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {renderPagination(menuItems)}
                            </div>
                        </div>
                    )}

                    {activeSection === 'patisserie' && (
                        <div className={styles.sectionContent}>
                            <div className={styles.actions}>
                                <button className={styles.addButton} onClick={handleAdd}>
                                    Add New Patisserie Item
                                </button>
                            </div>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCurrentItems(patisserieItems).map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className={styles.itemImage}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.categorie}</td>
                                                <td>{item.price} DH</td>
                                                <td>
                                                    <button
                                                        className={styles.editButton}
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() => handleDelete('patisserie', item._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {renderPagination(patisserieItems)}
                            </div>
                        </div>
                    )}

                    {activeSection === 'events' && (
                        <div className={styles.sectionContent}>
                            <div className={styles.actions}>
                                <button className={styles.addButton} onClick={handleAdd}>
                                    Add New Event
                                </button>
                            </div>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCurrentItems(events).map((event) => (
                                            <tr key={event._id}>
                                                <td>
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className={styles.itemImage}
                                                    />
                                                </td>
                                                <td>{event.title}</td>
                                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                                <td>{event.type}</td>
                                                <td>
                                                    <button
                                                        className={styles.editButton}
                                                        onClick={() => handleEdit(event)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() => handleDelete('events', event._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {renderPagination(events)}
                            </div>
                        </div>
                    )}

                    {activeSection === 'reservations' && (
                        <div className={styles.sectionContent}>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Guests</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCurrentItems(reservations).map((reservation) => (
                                            <tr key={reservation._id}>
                                                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                                <td>{reservation.time}</td>
                                                <td>{reservation.numberOfGuests}</td>
                                                <td>
                                                    <span className={`${styles.status} ${styles[reservation.status]}`}>
                                                        {reservation.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className={styles.editButton}
                                                        onClick={() => handleEdit(reservation)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() => handleDelete('reservations', reservation._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {renderPagination(reservations)}
                            </div>
                        </div>
                    )}

                    {/* Logout Confirmation Modal */}
                    {showLogoutModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                                <div className={styles.modalHeader}>
                                    <h2>Confirm Logout</h2>
                                    <button className={styles.closeButton} onClick={() => setShowLogoutModal(false)}>&times;</button>
                                </div>
                                <div className={styles.modalContent}>
                                    <p>Are you sure you want to logout?</p>
                                </div>
                                <div className={styles.modalActions}>
                                    <button
                                        className={styles.cancelButton}
                                        onClick={() => setShowLogoutModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={styles.submitButton}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <ItemModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        item={selectedItem}
                        type={getModalType()}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 