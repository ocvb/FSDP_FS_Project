import CustomButton from "@/components/Button/CustomButton.module";
import Footer from "@/components/Footer/Footer.module";

const Header = () => (
  <header className="header">
    <img
      src="fsdp/Client/src/assets/Rewards/rewards-header.jpg"
      className="header-image"
    />
    <div className="header-text">
      <h1>Rewards</h1>
      <p>Create an account to earn points and claim exciting rewards!</p>
      <CustomButton className="sign-up-button" text="Sign Up" link="/account" />
    </div>
  </header>
);

const Partners = () => (
  <div className="partners">
    <h2>Partnered with</h2>
    <div className="partners-logos">
      <img src="" alt="" />
      <img src="" alt="" />
      <img src="" alt="" />
      <img src="" alt="" />
      <img src="" alt="" />
    </div>
  </div>
);

const Steps = () => (
  <div className="how-it-works">
    <h2>How it works</h2>
    <div className="steps">
      <div className="step">
        <h3>1</h3>
        <p>Earn points by participating/volunteering at events</p>
      </div>
      <div className="step">
        <h3>2</h3>
        <p>Collect sufficient points and redeem rewards of your choice</p>
      </div>
      <div className="step">
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
