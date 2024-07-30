import { Outlet } from 'react-router-dom';
import Unauthorise from './Unauthorise';

export default function ProtectedRoute() {
  const authValue = window.localStorage.getItem('token');
  return authValue ? <Outlet/> : <Unauthorise />;
}