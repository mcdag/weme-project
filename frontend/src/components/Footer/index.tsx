import whiteLogo from "../../assets/white-logo.svg";
import './styles.scss';

function Footer() {
  return (
    <div className="footer-container">
      <img alt="logo" className="footer-logo" src={whiteLogo} />
    </div>
  );
};

export default Footer;