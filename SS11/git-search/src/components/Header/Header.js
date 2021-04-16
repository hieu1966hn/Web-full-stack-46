import logo from '../../images/giphy-logo.svg';
import './header.style.css';

function Header(props) {
  const { label} = props;
  return (
    <div className="Header">
      <img src={logo} alt="logo" />
      <h1>{label}</h1>
    </div>
  );
}

export default Header;