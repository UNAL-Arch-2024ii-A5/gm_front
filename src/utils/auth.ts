export const decodeToken = (token: string) => {
    try {
      const base64Url = token.split(".")[1]; // Extraemos la parte del payload
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64)); // Decodificamos y parseamos el JSON
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return null;
    }
  };
  