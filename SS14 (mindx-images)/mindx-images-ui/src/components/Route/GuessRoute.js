// khách vào xem được, user vào xem => chuyển sang trang home /
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';
import { useContext } from 'react';

function GuessRoute({ children, ...props }) {
  // Route path = '/' exact
  const { user } = useContext(AuthContext);
  return (
    <Route {...props}>
      {user ? <Redirect to='/' /> : children}
    </Route>
  )
}

export default GuessRoute;