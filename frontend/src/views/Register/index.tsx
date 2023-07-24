import { Alert, Checkbox, FormControlLabel, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { User } from "../../interfaces/user";
import { UserService } from "../../services/userService";
import Button from "../../components/Button";
import Cookies from "js-cookie";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ImageContainer from "../../components/ImageContainer";
import TitleAnsSubtitle from "../../components/TitleAndSubtitle";
import "./styles.scss"

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorDescription, setPasswordErrorDescription] = useState<string>("");

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(emailError) {
      setEmailError(false);
    }
    setEmail(event.target.value);
  };

  const isPasswordValid = (password: string) => {
    let chr = 6 - password.length;
    const numbers = "0123456789", lowerCase = "abcdefghijklmnopqrstuvwxyz", upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", specialCharacters = "!@#$%^&*()-+";
    let hasNumbers = false, hasLowerCase = false, hasUpperCase = false, hasSpecialCharacters = false;

    if(chr > 0){
      setPasswordError(true);
      setPasswordErrorDescription(`Falta(m) no mínimo ${chr} caracter(es) para uma senha forte!`)
    } else {
      for(let i=0; i<password.length; i++){
        let char = password[i];
        if(numbers.includes(char)){
          hasNumbers = true;
        } else if(lowerCase.includes(char)) {
          hasLowerCase = true;
        } else if(upperCase.includes(char)){
          hasUpperCase = true;
        } else if(specialCharacters.includes(char)){
          hasSpecialCharacters = true;
        }
      }
      if(!hasNumbers){
        setPasswordError(true);
        setPasswordErrorDescription("Adicione um número para uma senha forte!")
      } else if(!hasLowerCase){
        setPasswordError(true);
        setPasswordErrorDescription("Adicione uma letra em minúsculo para uma senha forte!")
      } else if(!hasUpperCase) {
        setPasswordError(true);
        setPasswordErrorDescription("Adicione uma letra em maiúsculo para uma senha forte!")
      } else if(!hasSpecialCharacters){
        setPasswordError(true);
        setPasswordErrorDescription("Adicione um caracter especial para uma senha forte!")
      } else {
        setPasswordError(false);
      }
    }
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    isPasswordValid(event.target.value);
  };

  const handleClickBack = (() => {
    window.history.back();
  })

  const handleClickRegister = (async () => {
    const user: User = {
      name: name,
      email: email,
      password: password,
    }
    const response = await UserService.createUser(user);
    if (response.status !== 201) {
      setEmailError(true)
    } else {
      window.location.replace(`${window.location.origin}/auth/login`);
      Cookies.set("id", response.data.id);
      Cookies.set("name", response.data.name);
      Cookies.set("email", response.data.email);
      Cookies.set("password", response.data.password);
    }

  })

  return (
    <div className="container">
      <ImageContainer/>
      <div className="register-container">
        <div className="arrow-button">
          <IconButton aria-label="back" size="medium" onClick={handleClickBack}>
            <ArrowBackIosIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="register-box">
          <TitleAnsSubtitle title="Faça um cadastro!" subtitle1="Bem-vindo," subtitle2="aproveite a jornada!" />
          <div className="text-fields">
            <div>
              {
                emailError ?
                <Alert sx={{ justifyContent: "center"}} severity="error">Email já cadastrado!</Alert> :
                <></>
              }
            </div>
            <TextField sx={{marginBottom: "5%", marginTop: "5%"}} className="text-field" label="Nome" variant="outlined" onChange={handleChangeName} />
            <TextField sx={{marginBottom: "5%"}} className="text-field" label="Email" variant="outlined" onChange={handleChangeEmail} />
            <TextField type="password" className="text-field" label="Senha" variant="outlined" onChange={handleChangePassword} />
            <div className="invalid-auth">
              {
                passwordError ?
                <Alert sx={{justifyContent: "center"}} severity="error">{passwordErrorDescription}</Alert> :
                <></>
              }
          </div>
          </div>
          <div className="button-register">
            <Button type="button" disabled={passwordError} onClick={handleClickRegister} text="Cadastrar"/>
          </div>
          <div className='registration-text'>
            <p className='button-text'>Já tem uma conta?</p>
            <a href={`${window.location.origin}/auth/login`}>
              <button className='button'>
                Faça login!
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;