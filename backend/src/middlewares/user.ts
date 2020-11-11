
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup' 
//import { yupResolver } from '@hookform/resolvers/yup';

import { IUser } from '../models/user';
import response from '../common/response';


export = {
    async valid_user(req: Request, res: Response, next: NextFunction){         
                       
        const { email, password }: IUser = req.body;           
        const yupObject = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string()
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        'the password must contain at least 1 number, at least 1 lower case letter, at least 1 upper case and at least 1 special character.')
                .required(),
        });


        try{
            const validatedBody = await yupObject.validate({email, password})           
            req.body = validatedBody;
            
            next();
        }catch(err: any){
            
            return res.json(        
                response.jsonBadRequest(null, "You didn't give us what we want!", err.message)              
            );   
        }     
    }  
}