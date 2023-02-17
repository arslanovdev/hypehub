import { useAccountStore } from "@/stores";
import { CONFIG } from "@/config.js";

// Initialize the fetch methods
export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

// Create the request function
function request(method) {
  return async (url, params = null) => {
    // Initialize request options
    const requestOptions = {
      method,
      headers: {
        ...authHeader(url),
        Accept: "application/json"
      }
    };

    // Add request body or URL parameters, depending on method
    if (params && method === "GET") {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    } else if (params) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(params);
    }

    // Send request and handle response
    const response = await fetch(url, requestOptions);
    return await handleResponse(response);
  };
}

// Get the auth header for the request
function authHeader(url) {
  const { token } = useAccountStore();
  const isLoggedIn = !!token;
  const isApiUrl = url.startsWith(CONFIG.API_HOST);

  const authHeader = {};
  if (isLoggedIn && isApiUrl) {
    authHeader.Authorization = `Bearer ${token}`;
  }

  return authHeader;
}

// Handle the response from the server
async function handleResponse(response) {
  const { user, logout } = useAccountStore();
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    if ([401, 403].includes(response.status) && user) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout();
    }

    // get error message from body or default to response status
    const error = (data && data.message) || response.status;
    return Promise.reject(error);
  }

  return data;
}
