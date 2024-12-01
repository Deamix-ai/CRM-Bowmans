import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { validateEnquiry } from "../utils/validation"; // Import validation function
import EnquiryModel from "../models/EnquiryModel"; // Import centralized model

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]); // Store list of enquiries
    const [showForm, setShowForm] = useState(false); // Control modal visibility
    const [formData, setFormData] = useState({ ...EnquiryModel }); // Initialize form data from the model
    const [message, setMessage] = useState("");

    // Real-time listener for enquiries
    useEffect(() => {
        const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEnquiries(data); // Update state with real-time data
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, []);

    // Handle form submission for new enquiry
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const error = validateEnquiry(formData);
        if (error) {
            alert(error); // Notify the user of validation errors
            return;
        }

        // Add enquiry to Firestore
        try {
            await addDoc(collection(db, "enquiries"), {
                ...formData,
                createdAt: new Date(), // Add createdAt automatically
            });
            setMessage("Enquiry added successfully!");
            setShowForm(false); // Close the modal
            setFormData({ ...EnquiryModel }); // Reset the form using the model
        } catch (error) {
            console.error("Error adding enquiry:", error);
            setMessage("Failed to add enquiry. Please try again.");
        }
    };

    // Handle delete enquiry
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "enquiries", id));
            setMessage("Enquiry deleted successfully!");
        } catch (error) {
            console.error("Error deleting enquiry:", error);
            setMessage("Failed to delete enquiry. Please try again.");
        }
    };

    const extractPhoneNumbers = (enquiry) => {
        const numbers = [];
        if (enquiry.mobile) numbers.push(enquiry.mobile);
        if (enquiry.mobile2) numbers.push(enquiry.mobile2);
        if (enquiry.telephone) numbers.push(enquiry.telephone);

        // Remove duplicates and return first two numbers
        const uniqueNumbers = [...new Set(numbers)];
        return {
            phone1: uniqueNumbers[0] || "", // First phone number
            phone2: uniqueNumbers[1] || "", // Second phone number
        };
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Enquiries</h1>
                <button
                    onClick={() => setShowForm(true)}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                    }}
                >
                    New Enquiry
                </button>
            </div>
            {message && <p>{message}</p>}

            {/* Enquiries Table */}
            <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Phone 1</th>
                        <th>Phone 2</th>
                        <th>Post Code</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enquiries.map((enquiry) => {
                        const { phone1, phone2 } = extractPhoneNumbers(enquiry);
                        return (
                            <tr key={enquiry.id}>
                                <td>{enquiry.firstName || ""}</td>
                                <td>{enquiry.surname || ""}</td>
                                <td>{phone1}</td>
                                <td>{phone2}</td>
                                <td>{enquiry.postCode || ""}</td>
                                <td>
                                    {enquiry.createdAt
                                        ? new Date(enquiry.createdAt.seconds * 1000).toLocaleString()
                                        : ""}
                                </td>
                                <td>
                                    <Link to={`/customer/${enquiry.id}`} style={{ marginRight: "10px" }}>
                                        View
                                    </Link>
                                    <button onClick={() => handleDelete(enquiry.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* New Enquiry Modal */}
            {showForm && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#fff",
                        padding: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                    }}
                >
                    <h2>Add New Enquiry</h2>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Surname"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Telephone"
                            value={formData.telephone}
                            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Post Code"
                            value={formData.postCode}
                            onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
                        />
                        <textarea
                            placeholder="Requirements"
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        ></textarea>
                        <button
                            type="submit"
                            style={{
                                padding: "10px",
                                backgroundColor: "#333",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            style={{
                                padding: "10px",
                                backgroundColor: "#ccc",
                                color: "#333",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Enquiries;
