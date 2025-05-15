import logo from '../assets/bread_logo.png';

type LogoProps = {
  height: string;
  width: string;
};

const RoundLogo = ({ height, width }: LogoProps) => {
  return (
    <img
      src={logo}
      alt="Bread Machine Logo"
      width={width}
      height={height}
    />
  );
};

export default RoundLogo;
