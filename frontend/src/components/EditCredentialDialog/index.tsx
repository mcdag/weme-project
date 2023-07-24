import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';
import { CredentialType } from '../CredentialsTable';
import { CredentialsService, SendCredential } from '../../services/credentialsService copy';

interface IProps {
  credential: CredentialType | undefined;
  open: boolean;
  handleFunction: React.MouseEventHandler;
}
export default function EditCredentialDialog({ credential, open, handleFunction}: IProps) {
  console.log("aaaaaa", credential)
  const [title, setTitle] = React.useState<string>(credential?.title || "");
  const [email, setEmail] = React.useState<string>(credential?.email || "");
  const [url, setUrl] = React.useState<string>(credential?.url || "");
  const [password, setPassword] = React.useState<string>(credential?.password || "");
  const [number, setNumber] = React.useState<string>(credential?.number || "");
  const [name, setName] = React.useState<string>(credential?.name || "");
  const [cvv, setCvv] = React.useState<string>(credential?.cvv || "");
  const [expirationDate, setExpirationDate] = React.useState<string>(credential?.expirationDate || "");

  const userId = Cookies.get("id");
  let updatedCredential: SendCredential;

  const handleEditCredential = async (event: React.MouseEvent<Element, MouseEvent>) => {
    if(credential?.type === "Email") {
      updatedCredential = {
        userId: userId || "",
        type: credential?.type,
        title: title,
        credentialEmail: {
          email: email,
          url: url,
          password: password,
        }
      };
    } else {
      updatedCredential = {
        userId: userId || "",
        type: credential?.type || "",
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
    await CredentialsService.editCredential(credential?.id || "", updatedCredential)
    handleFunction(event);
  }

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
        <DialogTitle sx={{display: "flex", justifyContent: "center"}}>Edite uma credencial</DialogTitle>
        <DialogContent>
            <TextField
              sx={{ marginTop: "0px"}}
              label="Título"
              fullWidth
              variant="standard"
              defaultValue={title}
              onChange={handleChangeTitle}
              />
              <div>
            {
              credential?.type === "Email" ?
              <div>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  defaultValue={email}
                  onChange={handleChangeEmail}
                />
                <TextField
                  label="URL"
                  fullWidth
                  variant="standard"
                  defaultValue={url}
                  onChange={handleChangeUrl}
                />
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  variant="standard"
                  defaultValue={password}
                  onChange={handleChangePassword}
                /> 
              </div>
              :
              <div>
                <TextField
                  label="Nº do Cartão"
                  fullWidth
                  variant="standard"
                  defaultValue={number}
                  onChange={handleChangeNumber}
                />
                <TextField
                  label="Nome"
                  fullWidth
                  variant="standard"
                  onChange={handleChangeName}
                  defaultValue={name}
                />
                <TextField
                  label="CVV"
                  fullWidth
                  variant="standard"
                  defaultValue={cvv}
                  onChange={handleChangeCvv}
                />
                <TextField
                  label="Data de Expiração"
                  fullWidth
                  variant="standard"
                  defaultValue={expirationDate}
                  onChange={handleChangeExpirationDate}
                />
                <TextField
                  label="Senha"
                  type="password"
                  fullWidth
                  variant="standard"
                  defaultValue={password}
                  onChange={handleChangePassword}
                /> 
              </div>
            }
          </div>
        </DialogContent>
        <DialogActions sx={{ width: "100%", display: 'flex', justifyContent: 'space-around'}}>
          <Button className="buttons" sx={{ width: "35%", height: "8%", marginBottom: "3%", backgroundColor: "#052E1C", color: "white"}} onClick={handleFunction}>Cancelar</Button>
          <Button className="buttons" sx={{ width: "35%", height: "8%", marginBottom: "3%", backgroundColor: "#052E1C", color: "white"}} onClick={handleEditCredential}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}