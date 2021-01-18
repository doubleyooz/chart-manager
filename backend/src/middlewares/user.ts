import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup' 
import response from '../common/response';



const rules = {
    email:  yup.string().email().required(),
    password: yup.string()
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        'the password must contain at least 1 number, at least 1 lower case letter, at least 1 upper case and at least 1 special character.')
                .required(),
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
            password: rules.password,
        });

        yupObject.validate(req.body).then(() => next())
                 .catch((err: any) => {
                    return res.json(        
                        response.jsonBadRequest(null, response.getMessage("badRequest"), null)              
                    )  
                })

       
    },
   
}