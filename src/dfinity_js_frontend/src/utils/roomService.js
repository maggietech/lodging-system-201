// Function to register a new room
export async function registerRoom(room) {
    // Call the registerRoom function from the canister
    return window.canister.house.createRoom(room);
}

// Function to update a room
export async function updateRoom(id, room) {
    // Call the updateRoom function from the canister
    return window.canister.house.updateRoom(id, room);
}

// Function to get all rooms
export async function getRooms() {
    try {
        // Call the getRooms function from the canister
        return await window.canister.house.getRooms();
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

// Function to get room details
export async function getRoom(id) {
    try {
        // Call the getRoomDetails function from the canister
        return await window.canister.house.getRoom(id);
    } catch (err) {
        // Handle errors
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}
