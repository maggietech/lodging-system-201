// Function to register a new room
export async function registerRoom(room) {
    // Call the registerRoom function from the canister
    return window.canister.house.addRoom(room.house_id, room.room_number, room.is_booked, room.price);
}

// Function to update a room
export async function updateRoom(room) {
    // Call the updateRoom function from the canister
    return window.canister.house.updateRoom(room);
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
