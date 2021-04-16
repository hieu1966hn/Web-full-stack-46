// ai vào xem cũng được
import { Route } from 'react-router-dom';

function PublicRoute({ children, ...props }) {
  
  // Route path = '/' exact
  return (
    <Route {...props}>
      {children}
    </Route>
  )
}

export default PublicRoute;