import { Principal } from "@dfinity/principal";

  // Function to register a new room
  export async function registerHouse(house) {
      // Call the registerRoom function from the canister
      return window.canister.house.createHouse(house);
    } 

    export async function updateHouse(id,house) {
      return window.canister.house.updateHouse(id,house);
    }

  // getHouses
  export async function getHouses() {
    try {
      // Call the getRooms function from the canister
      return await window.canister.house.getHouses();
    } catch (err) {
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
          }
          return [];
    }
  }
  // searchHouse
  export async function searchHouse(search) {
    try {
      // Call the getRooms function from the canister
      return await window.canister.house.searchHouse(search);
    } catch (err) {
        if (err.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
          }
          return [];
    }
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