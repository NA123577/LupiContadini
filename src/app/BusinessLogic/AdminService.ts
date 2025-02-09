// src/app/BusinessLogic/LoginService.ts
export const handleCleanDatabase = async () => {
      // Make an API call to delete rows in Giocatori and Sala
      const response = await fetch("/api/SupabaseFolder/AdminFunctions", {
        method: "DELETE", // We assume that you already have a DELETE route for cleaning up the database
      });
      if (!response.ok) {
        throw new Error("Failed to clean the database.");
      }
      const data = await response.json();
      return data.message || "Database cleaned successfully!";
  };