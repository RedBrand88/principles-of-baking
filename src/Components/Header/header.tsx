import './header.css';
import Button from "../Button/button";
import RoundLogo from '../../assets/roundLogo';
import { useAuth } from '../../Context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

type HeaderProps = {
  openLogin: () => void;
}

const Header = ({openLogin}: HeaderProps) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  }

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
      <Button onClick={user ? handleLogout : openLogin}>
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  )
}

export default Header;
