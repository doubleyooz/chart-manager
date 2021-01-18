import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup' 
import response from '../common/response';



const rules = {
    email:  yup.string().email().required(),
    password: yup.string()
                .min(8, response.getMessage("user.invalid.password.short"))
                .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        response.getMessage("user.invalid.password.weak"))
                .required(),
    sign_in_password: yup.string()
                .min(8, response.getMessage("user.invalid.password.short"))
                .required()
}

export = {
    async valid_sign_up(req: Request, res: Response, next: NextFunction){       
                       
               
        const yupObject = yup.object().shape({
            email: rules.email,
            password: rules.password,
        });

        yupObject.validate(req.body).then(() => next())
                 .catch((err: any) => {
                    return res.json(        
                        response.jsonBadRequest(null, response.getMessage("badRequest"), err.errors)              
                    )  
                })

       
    },
    
    async valid_sign_in(req: Request, res: Response, next: NextFunction){    
                       
               
        const yupObject = yup.object().shape({
            email: rules.email,
            password: rules.sign_in_password,
        });

        yupObject.validate(req.body).then(() => next())
                 .catch((err: any) => {
                    return res.json(        
                        response.jsonBadRequest(null, response.getMessage("badRequest"), err.errors)              
                    )  
                })

       
    },
   
}