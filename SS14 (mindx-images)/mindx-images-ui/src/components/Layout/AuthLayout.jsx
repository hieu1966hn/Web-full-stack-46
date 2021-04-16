import './authLayout.css';

export default function AuthLayout(props) {
  return (
    <div className="auth-layout">
      {props.children}
    </div>
  )
}