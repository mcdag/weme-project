import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CredentialsService, SendCredential } from '../../services/credentialsService copy';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import Cookies from 'js-cookie';

interface IProps {
  open: boolean;
  handleFunction: React.MouseEventHandler;
}

export default function CreateCredentialDialog({ open, handleFunction}: IProps) {
  const [type, setType] = React.useState<string>("email");
  const [title, setTitle] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [number, setNumber] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [cvv, setCvv] = React.useState<string>("");
  const [expirationDate, setExpirationDate] = React.useState<string>("");

  const userId = Cookies.get("id");
  let credential: SendCredential;

  const handleCreateCredential = async (event: React.MouseEvent<Element, MouseEvent>) => {
    if(type === "email") {
      credential = {
        userId: userId || "",
        type: type,
        title: title,
        credentialEmail: {
          email: email,
          url: url,
          password: password,
        }
      };
    } else if (type === "creditCard") {
      credential = {
        userId: userId || "",
        type: type,
        title: title,
        credentialCreditCard: {
          number: number,
          name: name,
          cvv: cvv,
          expirationDate: expirationDate,
          password: password
       }
      }
    }
    await CredentialsService.createCredential(credential);
    handleFunction(event);
  }

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeCvv = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(event.target.value);
  };

  const handleChangeExpirationDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(event.target.value);
  };

  return (
    <div>
      <Dialog sx={{width: "100vw"} }open={open} onClose={handleFunction}>
        <DialogTitle sx={{display: "flex", justifyContent: "center"}}>Cadastre uma nova credencial</DialogTitle>
        <DialogContent>
          <div>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Tipo</InputLabel>
                <Select
                  value={type}
                  label="Tipo"
                  onChange={handleChangeType}
                >
                <MenuItem value={"email"}>Email</MenuItem>
                <MenuItem value={"creditCard"}>Cartão de Crédito</MenuItem>
              </Select>
              <TextField
                sx={{ marginTop: "0px"}}
                label="Título"
                fullWidth
                variant="standard"
                onChange={handleChangeTitle}
              />
            </FormControl> 
          </div>
          <div>
            {
              type === "email" ?
              <div>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeEmail}
                />
                <TextField
                  label="URL"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeUrl}
                />
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={handleChangePassword}
                /> 
              </div>
              :
              <div>
                <TextField
                  label="Nº do Cartão"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeNumber}
                />
                <TextField
                  label="Nome"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeName}
                />
                <TextField
                  label="CVV"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeCvv}
                />
                <TextField
                  label="Data de Expiração"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeExpirationDate}
                />
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={handleChangePassword}
                /> 
              </div>
            }
          </div>
        </DialogContent>
        <DialogActions sx={{ width: "100%", display: 'flex', justifyContent: 'space-around'}}>
          <Button sx={{ width: "35%", height: "8%", marginBottom: "3%", backgroundColor: "#052E1C", color: "white"}} onClick={handleFunction}>Cancelar</Button>
          <Button sx={{ width: "35%", height: "8%", marginBottom: "3%", backgroundColor: "#052E1C", color: "white"}} onClick={handleCreateCredential}>Criar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}