// guestService.js

// Function to register a new guest
export async function registerGuest(guest) {
    // Call the registerGuest function from the canister
    return window.canister.house.createGuest(guest);
}

// Function to update a guests
export async function updateGuest(id, payload) {
    // Call the updateGuest function from the canister
    return window.canister.house.updateGuest(id, payload);
}

// Function to get all guests
export async function getAllGuests() {
    try {
        // Call the getAllGuests function from the canister
        return await window.canister.house.getGuests();
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

// Function to get guest details
export async function getGuestDetails(id) {
    try {
        // Call the getGuestDetails function from the canister
        return await window.canister.house.getGuest(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}
