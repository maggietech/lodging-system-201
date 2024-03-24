// guestService.js

// Function to register a new guest
export async function registerGuest(guest) {
    // Call the registerGuest function from the canister
    return window.canister.guest.addGuest(guest.id, guest.name);
}

// Function to update a guest
export async function updateGuest(guest) {
    // Call the updateGuest function from the canister
    return window.canister.guest.updateGuest(guest.id, guest.name);
}

// Function to get guest details
export async function getGuestDetails(id) {
    try {
        // Call the getGuestDetails function from the canister
        return await window.canister.guest.getGuestDetails(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}
