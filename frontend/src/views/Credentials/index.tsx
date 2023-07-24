/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { CredentialsService } from "../../services/credentialsService copy";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CredentialsTable, { CredentialType } from "../../components/CredentialsTable";
import "./styles.scss"

function Credentials() {
  const [credentials, setCredentials] = useState<string[]>([]);
  const email = Cookies.get("email");

  const a : CredentialType[] = [
    { id: "1", createdAt: "99/03", type: 'Hello', title: 'World', email: "maria@cin.ufpe.br", url:"kakskaka", number:"9393923", name: "mcdag", cvv:"15/07", expirationDate: "82/09", password: "9394u2u" },
    { id: "2", createdAt: "99/03", type: 'DataGridPro', title: 'is Awesome', email: "maria@cin.ufpe.br", url:"kakskaka", number:"9393923", name: "mcdag", cvv:"15/07", expirationDate: "82/09", password: "9394u2u" },
    { id: "3", createdAt: "99/03", type: 'MUI', title: 'is Amazing', email: "maria@cin.ufpe.br", url:"kakskaka", number:"9393923", name: "mcdag", cvv:"15/07", expirationDate: "82/09", password: "9394u2u" },
  ];

  const handleChangeCredentials = async () => {
    const email = Cookies.get("email");
    const response = await CredentialsService.getCredentials(email || "");
    if (response.status === 200) {
      setCredentials(response.data);
    }
  };

  const handleLogout = (async () => {
    window.location.replace(`${window.location.origin}/welcome`);
    }
  )

  return (
    <div className="credentials-container">
      <Navbar email={"mcdag@cin.ufpe"} onClick={handleLogout}/>
      <div className="table-container">
        <div className="title">
          <p> Credenciais </p>
        </div>
        <div className="table">
          < CredentialsTable rows={a} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Credentials;