import './header.css';
import Button from "../Button/button";
import RoundLogo from '../../assets/roundLogo';
import { useAuth } from '../../Context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDrawer } from '../../Context/DrawerContext';

type HeaderProps = {
  openLogin: () => void;
}

const Header = ({ openLogin }: HeaderProps) => {
  const { user } = useAuth();
  const { openDrawer, closeDrawer } = useDrawer();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  }

  return (
    <header className="headerContainer">
      <div className="navContainer">
        <div className="logoAndNav">
          <a href="/" className="logo">
            <RoundLogo height="75" width="75" />
          </a>
          <nav className="navLinks">
            <a href="/learn">Learn how to bake</a>
            <a href="/tab">Bread calculator</a>
            <a href="about-me">About me</a>
          </nav>
        </div>
        <Button
          className="loginButton"
          style={{ justifySelf: "flex-end" }}
          onClick={() => {
            closeDrawer();
            user ? handleLogout() : openLogin();
          }}
        >
          {user ? "Logout" : "Login"}
        </Button>
        <button
          className="hamburgerButton"
          onClick={openDrawer}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  )
}

export default Header;
