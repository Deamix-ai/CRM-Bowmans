const validateEnquiry = (data) => {
    // Required fields (excluding createdAt since it's auto-added)
    const requiredFields = ["firstName", "surname"];

    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === "") {
            return `${field} is required.`;
        }
    }

    // Validate email format
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
        return "Invalid email format.";
    }

    // Validate phone numbers (only digits allowed)
    if (data.mobile && !/^\d+$/.test(data.mobile)) {
        return "Mobile number must contain only digits.";
    }

    if (data.mobile2 && !/^\d+$/.test(data.mobile2)) {
        return "Secondary mobile number must contain only digits.";
    }

    if (data.telephone && !/^\d+$/.test(data.telephone)) {
        return "Telephone number must contain only digits.";
    }

    // If all checks pass, return null (no errors)
    return null;
};

export { validateEnquiry };
