import Button from "../Button/button";
import "./aboutMe.css";
import SelfPortrait from "../../assets/SelfPortrait.jpg"

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
          <a
            href="/static/Brandon_Bashein_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>
        <img className="avatar" src={SelfPortrait} />
      </div>
    </div>
  );
};

export default AboutMe;
