import whiteLogo from "../../assets/white-logo.svg";
import './styles.scss';

function Footer() {
  return (
    <div className="footer-container">
      <img alt="logo" className="footer-logo" width="100" height="20" src={whiteLogo} />
    </div>
  );
};

export default Footer;