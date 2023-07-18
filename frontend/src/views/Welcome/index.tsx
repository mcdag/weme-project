import React from "react";
import Logo from "../../assets/logo.svg";
import World from "../../assets/world.svg";
import "./styles.scss";
import Button from "../../components/Button";

function Welcome() {
  const handleClickLogin = async () => {
    window.location.replace(`${window.location.origin}/auth/login`);
  };

  const handleClickRegister = async () => {
    window.location.replace(`${window.location.origin}/auth/register`);
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src={Logo} alt="Logo em texto"/>
        <img src={World} alt="Planeta em cores verdes" />
      </div>
      <div className="welcome-container">
        <div className="welcome-box">
          <div className="title-subtitle">
            <p className="title">
              Bem-vindo!
              <p className="subtitle"> 
                Utilize o Credencials by Weme para
                <p className="subtitle-2"> 
                  para salvar suas credenciais!
                </p>
              </p>
            </p>
          </div>
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
                  <Button type="submit" onClick={handleClickRegister} text="Entrar"/>
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
