const STATUS_CODE_OK: number = 200;
const STATUS_CODE_BAD_REQUEST: number = 400;
const STATUS_CODE_UNAUTHORIZED: number = 401;
const STATUS_CODE_NOT_FOUND: number = 404;
const STATUS_CODE_SERVER_ERROR: number = 500;


export = {
  jsonOK(data: any, message: string, metadata: any) {        
    data = (data) ? data : null;
    message = (message) ? message : 'Successful request.';
    metadata = (metadata) ? metadata : {};  

    return ({ message, data, metadata, status: STATUS_CODE_OK })  
  },

  jsonBadRequest(data: any, message: string,  metadata: any){
      data = (data) ? data : null;
      message = (message) ? message : 'Bad request.';
      metadata = (metadata) ? metadata : {};
      
      return ({ message, data, metadata, status: STATUS_CODE_BAD_REQUEST })
  }  
}