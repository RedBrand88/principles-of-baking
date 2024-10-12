import './header.css';
import Button from "../Button/button";
import RoundLogo from '../../assets/roundLogo';

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="navContainer">
        <a href="/" className="logo">
          <RoundLogo height="38" width="38" />
        </a>
        <nav className="navLinks">
          <a href="/learn">Learn how to bake</a>
          <a href="/tab">Bread calculator</a>
          <a href="#">About me</a>
        </nav>
      </div>
      <Button>Logout</Button>
    </div>
  )
}

export default Header;
