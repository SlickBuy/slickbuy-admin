// fetchService.js

const BASE_URL = 'http://localhost:3002';

const headers = {
  'Content-Type': 'application/json',
};

// Helper function to handle response
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return await response.text();
};

const fetchService = {
  get: (url) => {
    return fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: headers,
    }).then(handleResponse);
  },

  post: (url, body) => {
    return fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    }).then(handleResponse);
  },

  // You can add more methods like PUT, DELETE, etc., following the same pattern
};

export default fetchService;
