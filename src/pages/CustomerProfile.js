import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";

const CustomerProfile = () => {
    const { id } = useParams(); // Customer ID from URL
    const [customer, setCustomer] = useState(null); // Store customer data
    const [isEditing, setIsEditing] = useState(false); // Control editing mode
    const [formData, setFormData] = useState({}); // Store editable form data

    // Fetch customer data in real-time
    useEffect(() => {
        const docRef = doc(db, "enquiries", id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                setCustomer(snapshot.data());
                setFormData(snapshot.data()); // Pre-fill form data
            } else {
                console.error("Customer not found.");
            }
        });

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, [id]);

    // Handle form submission to update customer details
    const handleSave = async () => {
        try {
            const docRef = doc(db, "enquiries", id);
            await updateDoc(docRef, formData); // Update Firestore document
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    if (!customer) {
        return <p>Loading customer details...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Customer Profile</h1>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "5px",
                    maxWidth: "600px",
                }}
            >
                {!isEditing ? (
                    <>
                        <p>
                            <strong>First Name:</strong> {customer.firstName || ""}
                        </p>
                        <p>
                            <strong>Surname:</strong> {customer.surname || ""}
                        </p>
                        <p>
                            <strong>Email:</strong> {customer.email || ""}
                        </p>
                        <p>
                            <strong>Mobile:</strong> {customer.mobile || ""}
                        </p>
                        <p>
                            <strong>Telephone:</strong> {customer.telephone || ""}
                        </p>
                        <p>
                            <strong>Address 1:</strong> {customer.address1 || ""}
                        </p>
                        <p>
                            <strong>Address 2:</strong> {customer.address2 || ""}
                        </p>
                        <p>
                            <strong>City:</strong> {customer.city || ""}
                        </p>
                        <p>
                            <strong>Post Code:</strong> {customer.postCode || ""}
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#333",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Edit Details
                        </button>
                    </>
                ) : (
                    <>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                        >
                            <input
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Surname"
                                value={formData.surname || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, surname: e.target.value })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Mobile"
                                value={formData.mobile || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, mobile: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Telephone"
                                value={formData.telephone || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, telephone: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Address 1"
                                value={formData.address1 || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, address1: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Address 2"
                                value={formData.address2 || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, address2: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={formData.city || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, city: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Post Code"
                                value={formData.postCode || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, postCode: e.target.value })
                                }
                            />
                            <div style={{ display: "flex", gap: "10px" }}>
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
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
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
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CustomerProfile;
