const API_URL = 'http://localhost:5000'; // TODO

export function getUserClasses(userId) {
  console.log('Fetching for userId: ', userId);

  return fetch(`${API_URL}/classes/${userId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
}
