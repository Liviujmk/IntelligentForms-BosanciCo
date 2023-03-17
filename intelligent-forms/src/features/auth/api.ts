import { API_PATH_PROD } from '../../config/api';
import { UserLite, User } from '../users/types/user.types';
import Cookies from 'js-cookie';

/* export const createUser = async (user: User) => {
  const response = await fetch(`${API_PATH_PROD}auth/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return response.json();
} */

export const createUser = async (user: User) => {
  await fetch(`${API_PATH_PROD}auth/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  .then((response: any) => {
      if (!response.ok) {
        console.log(response);
        throw new Error(response.status);
      }
      return response.status;
    })
    .catch((err) => {
      throw new Error(`Server error: ${err.message}`)
    });; 
}

export const loginUser = async (user: UserLite) => {
  const response = await fetch(`${API_PATH_PROD}auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });
  return response.json();
}

export const logoutUser = async () => {
  localStorage.removeItem("access_token")
  Cookies.remove("access_token")
  window.location.reload()
}