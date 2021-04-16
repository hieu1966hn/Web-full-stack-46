// khác vào xem được, user vào xem => chuyển sang trang home /
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';
import { useContext } from 'react';

function ProtectedRoute({ children, ...props }) {
  // Route path = '/' exact
  const { user } = useContext(AuthContext);

  return (
    <Route {...props}>
      {user ? children : <Redirect to='/login' />}
    </Route>
  )
}

export default ProtectedRoute;