import {jwtDecode} from 'jwt-decode'

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return true;

    const now = Date.now() / 1000;

    return decoded.exp < now;

  } catch (error) {
    console.log(error);
    return true;
  }
}