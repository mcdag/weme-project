import { MouseEvent, useState } from "react";
import { CredentialsService } from "../../services/credentialsService copy";
import { Avatar, IconButton } from "@mui/material";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./styles.scss"

function Credentials() {
  const [credentials, setCredentials] = useState<string[]>([]);
  const email = Cookies.get("email");

  const handleChangeCredentials = async () => {
    const email = Cookies.get("email");
    const response = await CredentialsService.getCredentials(email || "");
    if (response.status == 200) {
      setCredentials(response.data);
    }
  };

  const handleClickBack = (() => {
    window.location.replace(`${window.location.origin}/welcome`);
  })

  const handleLogout = (async () => {
    window.location.replace(`${window.location.origin}/welcome`);
    }
  )

  return (
    <div className="container">
      <Navbar email={"mcdag@cin.ufpe"} onClick={handleLogout}/>
      <div className="table">
        <div className="title">
          credenciais
        </div>
        <div>
          TABLEEEEE
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Credentials;