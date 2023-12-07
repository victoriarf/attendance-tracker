const API_URL = 'http://localhost:5000';

export default () => {
  return fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
}
