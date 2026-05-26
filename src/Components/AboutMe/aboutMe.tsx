import "./aboutMe.css";
import SelfPortrait from "../../assets/SelfPortrait.jpg";
import GitHubIcon from "../../assets/github-light.svg";
import LinkedInIcon from "../../assets/linkedin.svg";
import { SOCIAL_LINKS } from "../../Constants/socialLinks";
import Button from "../Button/button";

const AboutMe = () => {
  return (
    <div className="aboutMeContainer">

      <div className="heroZone">
        <img className="heroAvatar" src={SelfPortrait} alt="Brandon Bashein" />
        <h1 className="heroName">Brandon Bashein</h1>
        <p className="heroRole">Senior Frontend Developer</p>
        <div className="heroPills">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="socialPill"
          >
            <img src={GitHubIcon} alt="" aria-hidden="true" />
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="socialPill"
          >
            <img src={LinkedInIcon} alt="" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="contentZone">

        <div className="contentPanel">
          <div className="sectionLabel">About the site</div>
          {/*
            Original:
            First and foremost this website is a bread recipe scaler.
            Want to try a new bread recipe but don't want to make 20
            rolls? Enter your recipe and then enter the amount of dough
            you need and voilà! The new measurements for the recipe
            get printed to new inputs. This will reliably scale up or
            down any bread recipe you have.
          */}
          <p>
            A bread recipe scaler built from a personal itch. Enter any recipe,
            set your target dough weight, and get precise scaled measurements
            instantly — reliable for any bread recipe, sourdough-aware or not.
          </p>
          <a href="/static/Brandon_Bashein_CV.pdf" download>
            <Button>Download CV</Button>
          </a>
        </div>

        <div className="contentPanel">
          <div className="sectionLabel">Baking &amp; background</div>
          {/*
            Original (baking):
            I learned to bake bread in 2020 and I've been baking ever
            since. I learned to scale recipes by hand but then I thought
            to myself, "Self. You're a web dev why don't you make a web
            app that does this for you?" So here it is.
          */}
          <p>
            I started baking bread in 2020 and never stopped. The recipe scaler
            was born when I realized I was a web developer still doing the math
            by hand.
          </p>
          <div className="panelDivider" />
          {/*
            Original (dev background):
            I also enjoy making software. Most of my experience has been on the web
            but I've done a little bit of everything. I started out as a C# dev as
            an intern and my first real job was a Java shop but after that I noticed
            a trend in the company I was working at where the devs on my team were
            regularly not interested in doing the frontend work so I took it upon
            myself to own the frontend on that team and I've stayed on the frontend
            ever since. My expertise is in JavaScript, HTML, and CSS. When it comes
            to JavaScript frameworks I've only used React but I would consider myself
            very knowledgeable about frontend code regardless of framework. The web
            did exist before the frameworks after all. I'm confident I can work in
            any JavaScript framework there is. I'm passionate about accessibility —
            I really enjoy building web pages that can be traversed with the keyboard
            because that is how I prefer to surf the web myself, no mouse necessary.
            I also enjoy thinking about how to make the user experience more enjoyable
            and intuitive and less challenging and frustrating. If you want to know
            specifics about my work history feel free to download my CV! Hope you
            enjoy the site.
          */}
          <p>
            Senior Frontend Developer. My expertise is in JavaScript, HTML, and
            CSS — framework-agnostic in principle, React in practice. I'm
            passionate about accessibility and building keyboard-navigable UIs;
            I browse without a mouse myself.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutMe;
