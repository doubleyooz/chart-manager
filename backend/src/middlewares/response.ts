import { Request, Response, NextFunction } from 'express';

const TYPE_JSON = 'application/json';
const STATUS_CODE_OK: number = 200;
const STATUS_CODE_BAD_REQUEST: number = 400;
const STATUS_CODE_UNAUTHORIZED: number = 401;
const STATUS_CODE_NOT_FOUND: number = 404;
const STATUS_CODE_SERVER_ERROR: number = 500;

const jsonOK = function(this: Response, data: any, message: string | null, metadata: any) {        
  const status = STATUS_CODE_OK
  data = (data) ? data : null;
  message = (message) ? message : 'Successful request.';
  metadata = (metadata) ? metadata : {};  

  this.status(status);
  this.type(TYPE_JSON);

  return this.json({ message, data, metadata, status: status })  
}

const jsonBadRequest = function (this: Response, data: any, message: string | null,  metadata: any){
  const status = STATUS_CODE_BAD_REQUEST
  data = (data) ? data : null;
  message = (message) ? message : 'Bad request.';
  metadata = (metadata) ? metadata : {};
  
  this.status(status);
  this.type(TYPE_JSON);
  return this.json({ message, data, metadata, status: status })
}

const jsonUnauthorized = function(this: Response, data: any, message: string | null,  metadata: any){
  const status = STATUS_CODE_UNAUTHORIZED
  data = (data) ? data : null;
  message = (message) ? message : 'Unauthorized request.';
  metadata = (metadata) ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);
  return this.json({ message, data, metadata, status: status })
}

const jsonNotFound = function (this: Response, data: any, message: string | null,  metadata: any){
  const status = STATUS_CODE_NOT_FOUND
  data = (data) ? data : null;
  message = (message) ? message : 'Not Found.';
  metadata = (metadata) ? metadata : {};

  this.status(status);
  this.type(TYPE_JSON);
  return this.json({ message, data, metadata, status: status })
}


const jsonServerError = function (this: Response, data: any, message: string | null,  metadata: any){
  const status = STATUS_CODE_SERVER_ERROR
  data = (data) ? data : null;
  message = (message) ? message : "It's not you, it's us. Server Error";
  metadata = (metadata) ? metadata : {};
  
  this.status(status);
  this.type(TYPE_JSON);
  return this.json({ message, data, metadata, status: status })
}  


export const response = (req: Request, res: Response, next: NextFunction) => {
  res.jsonOK = jsonOK;
  res.jsonBadRequest = jsonBadRequest;
  res.jsonUnauthorized = jsonUnauthorized;
  res.jsonNotFound = jsonNotFound;
  res.jsonServerError = jsonServerError;

  next();
};