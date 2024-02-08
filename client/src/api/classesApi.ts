import { UserClass } from '../interfaces/class.interface';

export function getUserClasses(userId: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/classes/${userId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
}

export function updateUserClass(classId: string, classData: Partial<UserClass>) {
  return fetch(`${import.meta.env.VITE_API_URL}/classes/${classId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(classData),
  }).then(response => response.json());
}
