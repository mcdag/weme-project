import { AxiosResponse } from 'axios';
import apiBack from './api';

export class CredentialsService {
  static async getCredentials(email: string): Promise<AxiosResponse<string[]>> {
    const response = await apiBack.get(
      `/credentials/?email${email}`,
      {
        validateStatus: status => [200, 400, 500].includes(status),
      },
    );
    return response;
  }
}