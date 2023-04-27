import { Navigate } from 'react-router-dom';
import userAPI from '../../../utils/user';

export default function RequireAdminRoute({ children }) {
  let isAdmin = false;
  try {
    isAdmin = userAPI.checkAdmin();
  } catch (error) {
    console.log(error.message);
  }

  return isAdmin
    ? children
    : Navigate({
        to: '/pralma/login',
        replace: true,
      });
}
