import { API_PATH_PROD } from '../../config/api';
import { UserLite, User } from '../users/types/user.types';

export const createUser = async (user: User) => {
  const response = await fetch(`${API_PATH_PROD}auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export const loginUser = async (user: UserLite) => {
    const response = await fetch(`${API_PATH_PROD}auth/login/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export const logoutUser = async () => {
    localStorage.removeItem('access_token')
    //refresh page
    window.location.reload()
}