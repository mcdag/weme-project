import Logo from "../../assets/logo.svg";
import World from "../../assets/world.svg";
import './styles.scss';

function ImageContainer() {
  return (
    <div className="image-container">
      <img src={Logo} alt="Logo em texto"/>
      <img src={World} alt="Planeta em cores verdes" />
    </div>
  );
};

export default ImageContainer;