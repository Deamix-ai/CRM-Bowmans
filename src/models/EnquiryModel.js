const EnquiryModel = {
    firstName: "", // First name of the client
    surname: "", // Last name of the client
    email: "", // Email address
    mobile: "", // Primary mobile number
    mobile2: "", // Secondary mobile number
    telephone: "", // Landline or alternative number
    address1: "", // Address line 1
    address2: "", // Address line 2
    city: "", // City
    county: "", // County
    postCode: "", // Postal code
    enquiryType: "", // Type of enquiry (e.g., walk-in, online)
    requirements: "", // Client's requirements or notes
    status: "New", // Status of the enquiry (default: "New")
    location: "", // Location for the enquiry/project
    createdAt: null, // Date when the enquiry was created
};

export default EnquiryModel;
