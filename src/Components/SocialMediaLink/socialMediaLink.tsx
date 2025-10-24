import GitHubIcon from "../../assets/github-light.svg";
import LinkedInIcon from "../../assets/linkedin.svg";
import "./socialMediaLink.css";

type SocialMediaLinkProps = {
  href: string;
  style?: React.CSSProperties;
};

const SocialMediaLink = ({href, style}: SocialMediaLinkProps) => {
  let icon;

  switch (true) {
    case href.includes("github"):
      icon = GitHubIcon;
      break;
    case href.includes("linkedin"):
      icon = LinkedInIcon;
      break;
    default:
      return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="socialMediaLink"
      style={style}
    >
      <img src={icon} alt={href} />
    </a>
  );
};

export default SocialMediaLink;
