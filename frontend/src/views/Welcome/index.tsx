import ImageContainer from "../../components/ImageContainer";
import Button from "../../components/Button";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import "./styles.scss";

function Welcome() {
  const handleClickLogin = async () => {
    window.location.replace(`${window.location.origin}/auth/login`);
  };

  const handleClickRegister = async () => {
    window.location.replace(`${window.location.origin}/auth/register`);
  };

  return (
    <div className="container">
      <ImageContainer/>
      <div className="welcome-container">
        <div className="welcome-box">
        <TitleAndSubtitle title="Bem vindo!" subtitle1="Utilize o Credencials by Weme para" subtitle2="salvar suas credenciais" />
          <div className="login-register-container">
            <div className="button-container">
                <div className="title-button">
                  <p className="title">
                    Já possui uma conta?
                  </p>
                  <p className="bold">
                    Faça login!
                  </p>
                </div>
                <div className="button">
                  <Button type="submit" onClick={handleClickLogin} text="Entrar"/>
                </div>
              </div>
              <div className="button-container">
                <div className="title-button">
                  <p className="title">
                    Ainda não possui conta?
                  </p>
                  <p className="bold">
                    Registre-se!
                  </p>
                </div>
                <div className="button-login">
                  <Button type="submit" onClick={handleClickRegister} text="Registrar"/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
