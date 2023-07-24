import { AxiosResponse } from 'axios';
import { Auth, User } from '../interfaces/user';
import apiBack from './api';

export class UserService {
  static async getLogin(login: Auth): Promise<AxiosResponse> {
    const response = await apiBack.post(
      '/auth', login,
      {
        validateStatus: status => [200, 400, 500].includes(status),
      },
    );
    return response;
  }

  static async createUser(user: User): Promise<AxiosResponse> {
    const response = await apiBack.post(
      '/users', user,
      {
        validateStatus: status => [201, 400, 500].includes(status),
      },
    );
    return response;
  }
}