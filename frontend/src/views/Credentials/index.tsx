/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CredentialsService } from "../../services/credentialsService copy";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CredentialsTable , {CredentialType} from "../../components/CredentialsTable";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./styles.scss"
import CreateCredentialDialog from "../../components/CreateCredentialDialog copy";

function Credentials() {
  const [createCredentialDialog, setCreateCredentialDialog] = useState(false);
  const [credentials, setCredentials] = useState<CredentialType[]>([]);
  const id = Cookies.get("id");
  const email = Cookies.get("email");

  async function get() {
    const response = await CredentialsService.getCredentials(id || "");
    if (response.status === 200) {
      const data: CredentialType[] = response.data.map(val => { return {
        id: val.id,
        createdAt: (new Date(val.createdAt)).toLocaleDateString('pt-Br'),
        type: val.type === "email" ? "Email" : "Cartão",
        title: val.title,
        email: val.email ?  val.email.email : "-" ,
        url: val.email ?  val.email.url : "-",
        number: val.creditCard ?  val.creditCard.number : "-",
        name: val.creditCard ?  val.creditCard.name : "-",
        cvv: val.creditCard ?  val.creditCard.cvv : "-",
        expirationDate: val.creditCard ?  val.creditCard.expirationDate : "-",
        password: val.email ?  val.email.password : val.creditCard ? val.creditCard.password : "-",
      }});

      setCredentials(data);
    }
  };

  const handleLogout = async () => {
    window.location.replace(`${window.location.origin}/`);
    Cookies.remove("id");
  }

  const handleClickOpenCreateCredentialDialog = () => {
    setCreateCredentialDialog(!createCredentialDialog);
  };


  useEffect(() => {
    get();
  }, [get]);

  return (
    <div className="credentials-container">
      <Navbar email={email || "fulano@gmail.com"} onClick={handleLogout}/>
      <div className="table-container">
        <div className="title">
          <p> Credenciais </p>
        </div>
        {createCredentialDialog && (
          <CreateCredentialDialog open={createCredentialDialog} handleFunction={handleClickOpenCreateCredentialDialog} />
        )}
        <div className="add-icon">
          <IconButton aria-label="create-credential" size="large" onClick={handleClickOpenCreateCredentialDialog}>
            <AddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className="table">
          < CredentialsTable rows={credentials} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Credentials;