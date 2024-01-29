export function getUserClasses(userId: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/classes/${userId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
}
