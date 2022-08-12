export enum Routs {
  garage = 'garage',
  winners = 'winners',
  help = 'help',
}

export enum ErrorMessages {
  noServer = 'Server not found! Please check that the server is running',
  noData = 'Data not received',

  noGetCars = 'Failed to get cars from server!',
  noAddCar = 'Failed to add car to server!',

  noCarsOnPage = 'No cars to run the race! Add cars before starting',
  noStartEngine = 'Failed to start car engine!',
  noStopEngine = 'Failed to stop car engine!',
  noStartDrive = 'Failed to switches engine to drive mode!',
  noCarsFinished = 'Oops... Not a single car finished',

  noGetWinners = 'Failed to get winners from server!',
}

export enum ResponseStatus {
  ok = 200,
  created = 201,
  badRequest = 400,
  notFound = 404,
  tooManyRequests = 429,
  internalServerError = 500,
}

export enum Endpoints {
  garage = 'garage',
  engine = 'engine',
  winners = 'winners',
}

export enum FetchMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE',
}

export enum SortingName {
  id = 'id',
  wins = 'wins',
  time = 'time',
}
export enum SortingOrder {
  asc = 'ASC',
  desc = 'DESC',
}
