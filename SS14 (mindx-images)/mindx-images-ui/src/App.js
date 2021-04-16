import {
  BrowserRouter as Router, // named export trong JS
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import Home from './pages/Home/Home';

import { useState, useEffect, createContext } from 'react';
import client from './api';

import PublicRoute from './components/Route/PublicRoute';
import GuessRoute from './components/Route/GuessRoute';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Create from "./pages/Create/Create"

// Bộ UI components: React Bootstrap, Material UI, Antd design, Chakra UI

// Sử dụng context khi nào => rất nhiều  component có khả năng sử dụng lại biến này
// component nằm sâu bên trong, tránh props lần lượt từ cha đến con => con đến cháu
// user (auth), theme (sáng, tối)
// redux, mobx => một số thư viện quản lý state => thay thế context

export const AuthContext = createContext(); // named export

function App() {
  // switch case
  // case path = '/' => render component <div>Home</div>
  // case path = '/login' => render component <div>Login</div>
  const [user, setUser] = useState(null);
  // khác biệt ở đây để loading = true
  const [loading, setLoading] = useState(true);
  // gọi lên server lấy thông tin user
  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await client({
        url: '/api/auth/user',
        method: 'GET'
      });

      if (res.data.success) {
        setUser(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    console.log('run fetch user info');
    fetchUserInfo();
  }, []);

  // nếu chưa fetch user thì chúng ta ko nên render ở Router

  if (loading) return <div>Loading...</div>;
  // nếu để mặc định là false => hiển thị trang /create trước khi lấy xong dữ liệu

  // bọc context ở ngoài cùng để tất cả các component trong đó đều có thể sử dụng
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <PublicRoute path="/" exact>
            <Home />
          </PublicRoute>
          <GuessRoute path="/login">
            <Login />
          </GuessRoute>
          <GuessRoute path="/signup">
            <SignUp />
          </GuessRoute>
          <ProtectedRoute path="/create">
            <Create />
          </ProtectedRoute>
          <PublicRoute path="/posts/:id">
            <div>Detail post</div>
          </PublicRoute>
          <Route path="*">
            <div>404 page</div>
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;