
import { Request, Response, NextFunction } from 'express';

import { IUser } from '../models/user';
import response from '../common/response';


export = {
    valid_user(req: Request, res: Response, next: NextFunction){         
                       
        const { email, password }: IUser = req.body;      

        if(email && password){     
            
            let emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            let passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            
            
            if (email.match(emailTest) && password.match(passwordTest))                                                     
                next();                                                     
            
            else{

                return res.json(        
                    response.jsonBadRequest(null, "Password or email invalid.", null)              
                );    
            }             
        }  
        else
            return res.json(        
                response.jsonBadRequest(null, "Password or email is missing.", null)              
            );             

        
    }  
}