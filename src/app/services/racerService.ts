import {
  BASE,
  CARS_LIMIT,
  WINNERS_LIMIT,
  SORTING_NAME,
  SORTING_ORDER,
} from '../common/const';
import { Endpoints, ErrorMessages, FetchMethod, ResponseStatus } from '../common/enums';
import { MapEndpoints, DescribeCar, DescribeWinner, TWinner } from '../common/types';
import AppRequest from './appRequest';
import { errorHandler } from './errorHandler';

export class RacerService {
  private _endpoints: MapEndpoints;

  private _request: AppRequest;

  constructor() {
    this._endpoints = new Map([
      [Endpoints.garage, `${BASE}/${Endpoints.garage}`],
      [Endpoints.engine, `${BASE}/${Endpoints.engine}`],
      [Endpoints.winners, `${BASE}/${Endpoints.winners}`],
    ]);

    this._request = new AppRequest();
  }

  private async getRequest(url: string, config: RequestInit) {
    try {
      const res = await this._request.getRequest(url, config);

      if (!res) throw new Error(ErrorMessages.noServer);

      if (
        res.ok ||
        res.status === ResponseStatus.notFound ||
        res.status === ResponseStatus.tooManyRequests ||
        res.status === ResponseStatus.internalServerError
      )
        return res;

      throw new Error(`${ErrorMessages.noData} (${res.status}) ${res.statusText}`);
    } catch (error) {
      errorHandler(error);
    }
  }

  //* ---------- CARS ----------

  // Returns array of cars in a garage
  public getCars(page: number, limit: number = CARS_LIMIT) {
    const url = `${this._endpoints.get(Endpoints.garage)}?_page=${page}&_limit=${limit}`;
    const config = {
      method: FetchMethod.get,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Returns specified car (by id)
  public getCar(id: number) {
    const url = `${this._endpoints.get(Endpoints.garage)}/${id}`;
    const config = {
      method: FetchMethod.get,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Creates a new car in a garage (name: string, color: string)
  public createCar(body: DescribeCar) {
    const url = `${this._endpoints.get(Endpoints.garage)}`;
    const config = {
      method: FetchMethod.post,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Delete specified car from a garage (by id)
  public deleteCar(id: number) {
    const url = `${this._endpoints.get(Endpoints.garage)}/${id}`;
    const config = {
      method: FetchMethod.delete,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Updates attributes of specified car (by id) new param (name: string, color: string)
  public updateCar(id: number, body: DescribeCar) {
    const url = `${this._endpoints.get(Endpoints.garage)}/${id}`;
    const config = {
      method: FetchMethod.put,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  //* ---------- ENGINE ----------

  // Starts engine of specified car, and returns it's actual velocity and distance
  public startEngine(id: number) {
    const url = `${this._endpoints.get(Endpoints.engine)}?id=${id}&status=started`;
    const config = {
      method: FetchMethod.patch,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Starts engine of specified car
  public stopEngine(id: number) {
    const url = `${this._endpoints.get(Endpoints.engine)}?id=${id}&status=stopped`;
    const config = {
      method: FetchMethod.patch,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Switches engine of specified car to drive mode and finishes with success message or fails with 500 error.
  public switchDriveMode(id: number) {
    const url = `${this._endpoints.get(Endpoints.engine)}?id=${id}&status=drive`;
    const config = {
      method: FetchMethod.patch,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  //* ---------- WINNERS ----------

  // Returns array of all winners
  public getWinners(
    page: number,
    sort: string = SORTING_NAME,
    order: string = SORTING_ORDER,
    limit: number = WINNERS_LIMIT
  ) {
    const url =
      `${this._endpoints.get(Endpoints.winners)}` +
      `?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const config = {
      method: FetchMethod.get,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Returns specified winner (by id)
  public getWinner(id: number) {
    const url = `${this._endpoints.get(Endpoints.winners)}/${id}`;
    const config = {
      method: FetchMethod.get,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Creates a new records in a winners table
  public createWinner(body: TWinner) {
    const url = `${this._endpoints.get(Endpoints.winners)}`;
    const config = {
      method: FetchMethod.post,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Delete specified winner from a winners table (by id)
  public deleteWinner(id: number) {
    const url = `${this._endpoints.get(Endpoints.winners)}/${id}`;
    const config = {
      method: FetchMethod.delete,
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }

  // Updates attributes of specified winner (by id) new param (wins: number, time: number)
  public updateWinner(id: number, body: DescribeWinner) {
    const url = `${this._endpoints.get(Endpoints.winners)}/${id}`;
    const config = {
      method: FetchMethod.put,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // return this._request.getRequest(url, config);
    return this.getRequest(url, config);
  }
}
export default RacerService;
