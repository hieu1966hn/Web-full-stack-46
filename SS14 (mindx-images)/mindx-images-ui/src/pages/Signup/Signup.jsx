import AuthLayout from '../../components/Layout/AuthLayout';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api';

function SignUp() {
  const [email, setEmail] = useState('tuan@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatched, setIsMatched] = useState(true) 

  const onHandleChange = e => {
    setEmail(e.target.value)
  }

  const onHandleChangePass = e => {
    setPassword(e.target.value)
  }

  const onHandleChangeConfirmPass = e => {
    const confirmPassword = e.target.value;

    setConfirmPassword(confirmPassword)
    // xử lý so sánh
    // const isMatched = password === confirmPassword
    const isMatched = password === confirmPassword;
    setIsMatched(isMatched)
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();   
  
    try {
      // NOTE: axios mặc định là status server trả về 2xx => throw err;
      // fetch ko cơ chế trên đâu, check response.ok
      const res = await client({
        url: '/api/auth/signup',
        method: 'POST',
        data: {
          email,
          password
        }, 
      })
  
      if (res.data.success) {
        return alert('Signup success');
      }
      return alert(res.data.message || 'Something went wrong')
    } catch (err) {
      return alert(err.message || 'Something went wrong')
    }
  }

  return (
    <AuthLayout>
      <div className="form-wrapper">
        <h2 className="text-center">Sign Up</h2>
        <Form onSubmit={onHandleSubmit} noValidate>
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
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword}
              onChange={onHandleChangeConfirmPass}
            />
            {!isMatched
              && <span style={{color: 'red'}}>Password and confirm password not matched</span>
            }
          </Form.Group>
          <Button 
            className="mt-3" 
            variant="primary" 
            type="submit" 
            block 
            disabled={!isMatched}
          >
            Submit
          </Button>
        </Form>
      </div>
      <div className="navigate mt-4">
        Have acc? <Link to="/login">Login</Link>
      </div>
    </AuthLayout>
  );
}

export default SignUp;