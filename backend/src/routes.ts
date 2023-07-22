import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { CredentialController } from "./controllers/CredentialController";

const routes = Router();

routes.post("/user", new UserController().createUser);
routes.get("/login", new UserController().getUserLogin);
routes.post("/credentials", new CredentialController().createCredential);
routes.get("/credentials", new CredentialController().getCredentials);
routes.put("/credentials/:id", new CredentialController().updateCredential);
routes.delete("/credentials/:id", new CredentialController().deleteCredential);

export { routes };