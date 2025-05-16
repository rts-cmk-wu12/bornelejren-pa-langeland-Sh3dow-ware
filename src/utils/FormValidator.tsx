function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^\d{6,15}$/;
    return phoneNumberRegex.test(phoneNumber);
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
}

export {validatePhoneNumber, validateEmail};