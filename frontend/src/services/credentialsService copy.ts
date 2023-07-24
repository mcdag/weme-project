import { AxiosResponse } from 'axios';
import apiBack from './api';
export interface GetCredential {
	id: string,
	userId: string,
	type: string,
	title: string,
	emailId: string | null,
	creditCardId: string | null,
	user: {
		id: string,
		name: string,
		email: string,
		password: string,
		createdAt: string;
	},
	email?: {
		id: string,
		email: string
		url: string,
		password: string
	} | null,
	creditCard?: {
    number: string,
    name: string,
    cvv: string,
    expirationDate: string,
    password: string,
  } | null,
	createdAt: string
}

export interface SendCredential {
	userId: string,
	type: string,
	title: string,
	credentialEmail?: {
		email: string,
		url: string
		password: string,
	}
	credentialCreditCard?: {
		number: string,
		name: string
		cvv: string,
		expirationDate: string,
		password: string;
	}
}
export class CredentialsService {
  static async getCredentials(id: string): Promise<AxiosResponse<GetCredential[]>> {
    const response = await apiBack.get(
      `/credentials/${id}`,
      {
        validateStatus: status => [200, 400, 500].includes(status),
      },
    );
    return response;
  }

	static async createCredential(data : SendCredential ): Promise<AxiosResponse<GetCredential[]>> {
    const response = await apiBack.post(
      '/credentials', data, 
      {
        validateStatus: status => [200, 400, 500].includes(status),
      },
    );
    return response;
  }

	static async deleteCredential(id: string): Promise<AxiosResponse<string>> {
    const response = await apiBack.delete(
      `/credentials/${id}`,
      {
        validateStatus: status => [200, 400, 500].includes(status),
      },
    );
    return response;
  }

	static async editCredential(id: string, credential: SendCredential): Promise<AxiosResponse<string>> {
    const response = await apiBack.put(
      `/credentials/${id}`, credential,
      {
        validateStatus: status => [200, 400, 500].includes(status),
      },
    );
    return response;
  }
}