import AuthLayout from '../../components/Layout/AuthLayout';
import { Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import client from '../../api';
import { AuthContext } from '../../App';

function Login() {
  /*
    constructor() {
      this.state = { email: 'tuan@gmail.com', password: '' }
    }
    onHandleChange = (e) => this.setState({ email: e.target.value })
    onHandleChangPass = (e) => this.setState({ password: e.target.value })
  */
  const [email, setEmail] = useState('tuan@gmail.com');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  /*
    call useState => ket qua array gom 2 gia tri [a, b]
    gia tri a => state
    gia tri b => ham de thay doi state do
    destructor array
  */

  const onHandleChange = e => {
    setEmail(e.target.value)
  }

  const onHandleChangePass = e => {
    setPassword(e.target.value)
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    /*
      console.log(this.state.email, this.state.password)
    */
    console.log(email, password);
    
    // origin: http://localhost:3000
    // call server có origin http://localhost:8080
    // lỗi cors
    const res = await client({
      url: '/api/auth/login',
      method: 'POST',
      data: {
        email,
        password
      }, 
    })

    if (res.data.success) {
      const { user, token } = res.data.data;
      // ghi nhớ token (cookie)
      localStorage.setItem('token', token);
      // chuyển sang trang home
      // cách chuyển trang khi handle trong function
      setUser(user);
      history.push('/');
    }
  }

  // thẻ Link thì để sinh ra khi ấn click vào content của Link
  return (
    <AuthLayout>
      <div className="form-wrapper">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={onHandleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={onHandleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={onHandleChangePass}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
      <div className="navigate mt-4">
        Not have acc? <Link to="/signup">Signup</Link>
      </div>
    </AuthLayout>
  );
}

export default Login;