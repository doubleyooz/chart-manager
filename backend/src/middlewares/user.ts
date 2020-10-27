
import { Request, Response, NextFunction } from 'express';

import { IUser } from '../models/user';
import response from '../common/response';


export = {
    valid_user(req: Request, res: Response, next: NextFunction){         
                       
        const { email, password }: IUser = req.body;      
     

        if(!email){
            return res.json(        
                response.jsonBadRequest(null, "Email is missing.", null)              
            );   

        }
        
        if(!password){
            return res.json(        
                response.jsonBadRequest(null, "Password is missing.", null)              
            );   
        }           

        let emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        let passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
              
        
        if (email.match(emailTest)){
            if (password.match(passwordTest))                                                     
                next();
                
            else {
                return res.json(        
                    response.jsonBadRequest(null, "Invalid password.", null)              
                );   
            }
        }         
                                                        
        else{
            return res.json(        
                response.jsonBadRequest(null, "Invalid email.", null)              
            );    
        
        }                   
    }  
}