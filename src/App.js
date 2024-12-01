import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Enquiries from "./pages/Enquiries";
import Sales from "./pages/Sales";
import Projects from "./pages/Projects";
import Stock from "./pages/Stock";
import CalendarPage from "./pages/Calendar";
import CustomerProfile from "./pages/CustomerProfile"; // Import Customer Profile Page
import app from "./firebase"; // Import the Firebase initialization
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    React.useEffect(() => {
        const auth = getAuth(app); // Use the initialized Firebase app
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // Update login state based on user presence
        });
        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route
                    path="/"
                    element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/calendar"
                    element={isLoggedIn ? <CalendarPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/leads"
                    element={isLoggedIn ? <Leads /> : <Navigate to="/" />}
                />
                <Route
                    path="/sales"
                    element={isLoggedIn ? <Sales /> : <Navigate to="/" />}
                />
                <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                    path="/enquiries"
                    element={isLoggedIn ? <Enquiries /> : <Navigate to="/" />}
                />
                <Route
                    path="/projects"
                    element={isLoggedIn ? <Projects /> : <Navigate to="/" />}
                />
                <Route
                    path="/stock"
                    element={isLoggedIn ? <Stock /> : <Navigate to="/" />}
                />
                {/* Add the Customer Profile route */}
                <Route
                    path="/customer/:id"
                    element={isLoggedIn ? <CustomerProfile /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
