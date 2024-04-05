import { Principal } from "@dfinity/principal";

  // Function to register a new room
  export async function registerHouse(house) {
      // Call the registerRoom function from the canister
      return window.canister.house.addHouse(house);
    } 

    export async function updateHouse(house) {
      return window.canister.house.updateHouse(house);
    }
  // Function to get room details
  export async function getHouse(id) {
    try {
      // Call the getRoomDetails function from the canister
      return await window.canister.house.getHouse(id);
    } catch (err) {
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
          }
          return [];
    }
  }