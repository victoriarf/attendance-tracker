const API_URL = 'http://localhost:5000'; // TODO

export function getUsers () {
  return fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
}
