
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup' 
//import { yupResolver } from '@hookform/resolvers/yup';

import { IEnterprise } from '../models/enterprise';
import response from '../common/response';


export = {
    async valid_store_enterprise(req: Request, res: Response, next: NextFunction){         
                       
        const yupObject = yup.object().shape({
            initials: yup.string().strict(true)
                         .min(3, 'The Initials are very short - they must be at least 3 characters long.')
                         .max(8, 'The Initials are too long - should be 8 chars maximun.').required(),
            name: yup.string().strict(true) 
                     .min(3, 'The Name is very short - it must be at least 3 characters long.')
                     .max(16, 'The Name is very long - it must have a maximum of 16 characters.').required(),
            branch: yup.string().strict(true)            
                     .min(3, 'The Branch is very short - it must be at least 3 characters long.')
                     .max(16, 'The Branch is very long - it must have a maximum of 16 characters.').required(),
            price: yup.number().moreThan(0).required()
           
           
        });

        yupObject.validate(req.body).then(() => next())
                 .catch((err: any) => {
                    return res.json(        
                        response.jsonBadRequest(null, "You didn't give us what we want!", err.errors)              
                    )  
                })

       
    }  
}