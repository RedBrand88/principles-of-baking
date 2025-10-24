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
          <p>
            First and foremost this website is a bread recipe scaler. 
            Want to try a new bread recipe but don't want to make 20 
            rolls? Enter your recipe and then enter the amount of dough 
            you need and voilà! The new measurements for the recipe 
            get printed to new inputs. This will reliably scale up or 
            down any bread recipe you have.
          </p>
          <p>
            I learned to bake bread in 2020 and I've been baking ever 
            since. I learned to scale recipes by hand but then I thought 
            to myself, "Self. You're a web dev why don't you make a web 
            app that does this for you?" So here it is. I also enjoy 
            making software. Most of my experience has been on the web 
            but I've done a little bit of everything. I started out as a 
            C# dev as an intern and my first real job was a Java shop but 
            after that I noticed a trend in the company I was working at 
            where the devs on my team were regularly not interested in 
            doing the frontend work so I took it upon myself to own the 
            frontend on that team and I've stayed on the frontend ever since.
          </p>
          <p>
            My expertise is in JavaScript, HTML, and CSS. When it comes 
            to JavaScript frameworks I've only used React but I would 
            consider myself very knowledgeable about frontend code regardless 
            of framework. The web did exist before the frameworks after all. 
            I'm confident I can work in any JavaScript framework there is. 
            I'm passionate about accessibility — I really enjoy building 
            web pages that can be traversed with the keyboard because that 
            is how I prefer to surf the web myself, no mouse necessary. 
            I also enjoy thinking about how to make the user experience 
            more enjoyable and intuitive and less challenging and frustrating. 
            If you want to know specifics about my work history feel free 
            to download my CV! Hope you enjoy the site. It’s in a rough 
            state now but I have a roadmap to add several features that 
            will make it easier to use and be more aligned with my skills.
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
