// import { errorHandler } from './errorHandler';

export class AppRequest {
  public async getRequest(url: string, config: RequestInit) {
    try {
      const response = await fetch(url, config);

      const status = response.ok;

      if (!status)
        return {
          status: response.status,
          statusText: response.statusText,
        };

      const headers = response.headers;
      const contentType = headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not a JSON!');
      }

      const res = await response.json();
      return {
        ok: response.ok,
        status: response.status,
        data: res,
        headers: headers,
      };
    } catch (error) {
      // errorHandler(error);
    }
  }
}

export default AppRequest;
