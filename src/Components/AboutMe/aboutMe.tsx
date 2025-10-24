import Button from "../Button/button";
import "./aboutMe.css";
import SelfPortrait from "../../assets/SelfPortrait.jpg"
import { SOCIAL_LINKS } from "../../Constants/socialLinks";
import SocialMediaLink from "../SocialMediaLink/socialMediaLink";

type AboutMeProps = {
  //add props here
};
const AboutMe = ({ }: AboutMeProps) => {
  return (
    <div className="aboutMeContainer">
      <div className="upperContainer">
        <div className="experience">
          <h1>
            Experience
          </h1>
          <p>
            Senior Frontend Web Developer
          </p>
          <a
            href="/static/Brandon_Bashein_CV.pdf"
            download
          >
            <Button>
              Download CV
            </Button>
          </a>
        </div>
        <div className="avatarContainer">
          <img className="avatar" src={SelfPortrait} />
          <SocialMediaLink 
            href={SOCIAL_LINKS.github} 
            style={{ top: "90%", left: "10%" }}
          />
          <SocialMediaLink 
            href={SOCIAL_LINKS.linkedin} 
            style={{ top: "90%", left: "25%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
