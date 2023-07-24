import { AxiosResponse } from 'axios';
import apiBack from './api';

export class CredentialsService {
  static async getCredentials(id: string): Promise<AxiosResponse<string[]>> {
    const response = await apiBack.get(
      `/credentials/${id}`,
      {
        validateStatus: status => [200, 400, 500].includes(status),
      },
    );
    return response;
  }
}