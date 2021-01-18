import * as messages from './message.json';

const STATUS_CODE_OK: number = 200;
const STATUS_CODE_BAD_REQUEST: number = 400;
const STATUS_CODE_UNAUTHORIZED: number = 401;
const STATUS_CODE_NOT_FOUND: number = 404;
const STATUS_CODE_SERVER_ERROR: number = 500;




export = {
  getMessage(key: string) {
    return messages[key] || null;
  },
  
  jsonOK(data: any, message: string | null, metadata: any) {        
    data = (data) ? data : null;
    message = (message) ? message : 'Successful request.';
    metadata = (metadata) ? metadata : {};  

    return ({ message, data, metadata, status: STATUS_CODE_OK })  
  },

  jsonBadRequest(data: any, message: string | null,  metadata: any){
      data = (data) ? data : null;
      message = (message) ? message : 'Bad request.';
      metadata = (metadata) ? metadata : {};
      
      return ({ message, data, metadata, status: STATUS_CODE_BAD_REQUEST })
  },

  jsonUnauthorized(data: any, message: string | null,  metadata: any){
    data = (data) ? data : null;
    message = (message) ? message : 'Unauthorized request.';
    metadata = (metadata) ? metadata : {};
    
    return ({ message, data, metadata, status: STATUS_CODE_UNAUTHORIZED })
  },

  jsonNotFound(data: any, message: string | null,  metadata: any){
    data = (data) ? data : null;
    message = (message) ? message : 'Not Found.';
    metadata = (metadata) ? metadata : {};
    
    return ({ message, data, metadata, status: STATUS_CODE_NOT_FOUND })
  },    


  jsonServerError(data: any, message: string | null,  metadata: any){
    data = (data) ? data : null;
    message = (message) ? message : "It's not you, it's us. Server Error";
    metadata = (metadata) ? metadata : {};
    
    return ({ message, data, metadata, status: STATUS_CODE_SERVER_ERROR })
  }  
}