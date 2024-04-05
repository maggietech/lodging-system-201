// reservationService.js

// Function to create a reservation
export async function createReservation(reservation) {
    // Call the createReservation function from the canister
    return window.canister.house.createReservation(reservation);
}

// Function to update a reservation
export async function updateReservation(id, reservation) {
    // Call the updateReservation function from the canister
    return window.canister.house.updateReservation(id , reservation);
}

// Function to get all reservations
export async function getReservations() {
    try {
        // Call the getReservations function from the canister
        return await window.canister.house.getReservations();
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

// getReservationsByHouseId
export async function getReservationsByHouseId(id) {
    try {
        // Call the getReservationsByHouseId function from the canister
        return await window.canister.house.getReservationsByHouseId(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

// getReservationsByGuestId
export async function getReservationsByGuestId(id) {
    try {
        // Call the getReservationsByGuestId function from the canister
        return await window.canister.house.getReservationsByGuestId(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

// getReservationsByRoomId
export async function getReservationsByRoomId(id) {
    try {
        // Call the getReservationsByRoomId function from the canister
        return await window.canister.house.getReservationsByRoomId(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

// getReservationsByHouseIdAndCheckInDate
export async function getReservationsByHouseIdAndCheckInDate(id, checkInDate) {
    try {
        // Call the getReservationsByHouseIdAndCheckInDate function from the canister
        return await window.canister.house.getReservationsByHouseIdAndCheckInDate(id, checkInDate);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

// getReservationsByHouseIdAndCheckOutDate
export async function getReservationsByHouseIdAndCheckOutDate(id, checkOutDate) {
    try {
        // Call the getReservationsByHouseIdAndCheckOutDate function from the canister
        return await window.canister.house.getReservationsByHouseIdAndCheckOutDate(id, checkOutDate);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
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
