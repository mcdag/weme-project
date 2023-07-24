import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { CredentialController } from "./controllers/CredentialController";

const routes = Router();

routes.post("/users", new UserController().createUser);
routes.get("/users", new UserController().getUserLogin);
routes.post("/credentials", new CredentialController().createCredential);
routes.get("/credentials/:id", new CredentialController().getCredentials);
routes.put("/credentials/:id", new CredentialController().updateCredential);
routes.delete("/credentials/:id", new CredentialController().deleteCredential);

export { routes };