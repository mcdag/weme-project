import { Alert, Checkbox, FormControlLabel, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Auth } from "../../interfaces/user";
import { UserService } from "../../services/userService";
import Button from "../../components/Button";
import Cookies from "js-cookie";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ImageContainer from "../../components/ImageContainer";
import TitleAnsSubtitle from "../../components/TitleAndSubtitle";
import "./styles.scss"

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickBack = (() => {
    window.history.back();
  })

  const handleClickLogin = (async () => {
    const login: Auth = {
      email: email,
      password: password,
    }
    const response = await UserService.getLogin(login);
    if (response.status !== 200) {
      setError(true)
    } else {
      window.location.replace(`${window.location.origin}/credentials`);
      Cookies.set("email", response.data.email);
      Cookies.set("password", response.data.password);
    }
  })

  return (
    <div className="container">
      <ImageContainer/>
      <div className="login-container">
        <div className="arrow-button">
          <IconButton aria-label="back" size="medium" onClick={handleClickBack}>
            <ArrowBackIosIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="login-box">
          <TitleAnsSubtitle title="Faça login!" subtitle1="Bem-vindo de volta," subtitle2="sentimos sua falta!" />
          <div className="invalid-auth">
            {
              error ?
              <Alert sx={{width: "100%", justifyContent: "center"}} severity="error">Email ou senha inválidos!</Alert> :
              <></>
            }
          </div>
          <div className="text-fields">
            <TextField sx={{marginBottom: "5%"}} className="text-field" label="Email" variant="outlined" onChange={handleChangeEmail} />
            <TextField type="password" className="text-field" label="Senha" variant="outlined" onChange={handleChangePassword} />
            <FormControlLabel control=
              {
                <Checkbox sx={{
                  color: "#052E1C",
                  '&.Mui-checked': {
                    color: "#052E1C",
                  },
                }}
                defaultChecked 
                />
              } 
              label="Lembrar-me" />
          </div>
          <div className="button-login">
            <Button type="submit" onClick={handleClickLogin} text="Entrar"/>
          </div>
          <div className='registration-text'>
            <p className='button-text'>Não tem uma conta?</p>
            <a href={`${window.location.origin}/auth/register`}>
              <button className='button'>
                Registre-se agora!
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;