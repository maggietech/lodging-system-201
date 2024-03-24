// paymentService.js

// Function to process a payment
export async function processPayment(payment) {
    // Call the processPayment function from the canister
    return window.canister.payment.addPayment(payment.reservation_id, payment.amount);
}

// Function to update a payment
export async function updatePayment(payment) {
    // Call the updatePayment function from the canister
    return window.canister.payment.updatePayment(payment.id, payment.reservation_id, payment.amount);
}

// Function to get payment details
export async function getPaymentDetails(id) {
    try {
        // Call the getPaymentDetails function from the canister
        return await window.canister.payment.getPaymentDetails(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}
