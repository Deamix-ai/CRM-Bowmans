import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setIsLoggedIn(false); // Set the user as logged out
                navigate('/'); // Redirect to the Login page
            })
            .catch((error) => {
                console.error("Logout failed:", error.message);
            });
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff'
        }}>
            <h2 style={{ margin: 0 }}>Nexus CRM</h2>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', margin: 0, padding: 0 }}>
                {!isLoggedIn && (
                    <li>
                        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
                    </li>
                )}
                {isLoggedIn && (
                    <>
                        <li><Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
                        <li><Link to="/enquiries" style={{ color: '#fff', textDecoration: 'none' }}>Enquiries</Link></li>
                        <li><Link to="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Projects</Link></li>
                        <li><Link to="/stock" style={{ color: '#fff', textDecoration: 'none' }}>Stock</Link></li>
                        <li><Link to="/leads" style={{ color: '#fff', textDecoration: 'none' }}>Leads</Link></li>
                        <li><Link to="/sales" style={{ color: '#fff', textDecoration: 'none' }}>Sales</Link></li>
                        <li><Link to="/calendar" style={{ color: '#fff', textDecoration: 'none' }}>Calendar</Link></li>
                        <li>
                            <button
                                onClick={handleLogout}
                                style={{
                                    backgroundColor: '#555',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer'
                                }}>
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
