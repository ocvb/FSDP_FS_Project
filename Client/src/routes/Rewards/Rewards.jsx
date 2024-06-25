import { colors } from "@mui/material";
import { useNavigate } from "react-router-dom";

import headerImage from "@/assets/Rewards/rewards-header.jpg";

import style from "./css/Rewards.module.css";

// Components
import CustomButton from "@/components/Button/CustomButton.module";
import Footer from "@/components/Footer/Footer.module";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={style.header}>
      <img src={headerImage} className={style.headerImage} alt="Header" />
      <div className={style.headerText}>
        <h1>Rewards</h1>
        <p>Create an account to earn points and claim exciting rewards!</p>
        <CustomButton
          text="Sign Up Now"
          onClick={() => navigate("/account")}
          sx={{
            display: "inline-flex",
            borderRadius: "50px",
            width: "fit-content",
            boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
            padding: "0.4rem 2rem",
            color: "black",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: colors.grey[300],
            },
          }}
        />
      </div>
    </header>
  );
};

const Partners = () => (
  <div className={style.partners}>
    <h2>Partnered with</h2>
    <div className={style.partnersLogos}>
      <img src="https://via.placeholder.com/150" alt="Partner 1" />
      <img src="https://via.placeholder.com/150" alt="Partner 2" />
      <img src="https://via.placeholder.com/150" alt="Partner 3" />
      <img src="https://via.placeholder.com/150" alt="Partner 4" />
      <img src="https://via.placeholder.com/150" alt="Partner 5" />
    </div>
  </div>
);

const Steps = () => (
  <div className={style.howItWorks}>
    <h2>How it works</h2>
    <div className={style.steps}>
      <div className={style.step}>
        <h3>1</h3>
        <p>Earn points by participating/volunteering at events</p>
      </div>
      <div className={style.step}>
        <h3>2</h3>
        <p>Collect sufficient points and redeem rewards of your choice</p>
      </div>
      <div className={style.step}>
        <h3>3</h3>
        <p>Use your rewards!</p>
      </div>
    </div>
  </div>
);

export default function Rewards() {
  return (
    <>
      <div>
        <Header />
        <Partners />
        <Steps />
      </div>
      <Footer />
    </>
  );
}
