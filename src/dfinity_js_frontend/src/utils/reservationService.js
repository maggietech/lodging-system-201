// reservationService.js

// Function to create a reservation
export async function createReservation(reservation) {
    // Call the createReservation function from the canister
    return window.canister.house.addReservation(reservation.room_id, reservation.guest_id, reservation.check_in_date, reservation.check_out_date);
}

// Function to update a reservation
export async function updateReservation(reservation) {
    // Call the updateReservation function from the canister
    return window.canister.house.updateReservation(reservation.id, reservation.room_id, reservation.guest_id, reservation.check_in_date, reservation.check_out_date);
}

// Function to get reservation details
export async function getReservation(id) {
    try {
        // Call the getReservationDetails function from the canister
        return await window.canister.house.getReservation(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}
