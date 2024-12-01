import { db } from "../firebase"; // Firestore instance
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const fetchEnquiries = async () => {
    try {
        // Query Firestore to fetch all enquiries, ordered by creation date
        const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        // Map the results to an array of enquiry objects
        const enquiries = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return enquiries; // Return the list of enquiries
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        throw new Error("Failed to fetch enquiries."); // Handle errors gracefully
    }
};
