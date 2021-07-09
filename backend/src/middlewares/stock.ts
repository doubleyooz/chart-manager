
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup' 
//import { yupResolver } from '@hookform/resolvers/yup';

import { getMessage } from '../common/messages'

export = {
    async valid_store(req: Request, res: Response, next: NextFunction){         
                       
        const yupObject = yup.object().shape({
            name: yup.string().strict(true)
                         .min(3, 'The Name is very short - they must be at least 3 characters long.')
                         .max(16, 'The Name is too long - should be 8 chars maximun.').required(),
          
            price: yup.number().moreThan(0).required(),
            quantity: yup.number().moreThan(0).required(),
            purchaseDate: yup.string().strict(true).required(),
            enterprise_id: yup.string().strict(true).required()
           
           
        });

        yupObject.validate(req.body).then(() => next())
                 .catch((err: any) => {
                    return res.jsonBadRequest(null, getMessage("badRequest"), err.errors)              
                    
                })

       
    }  
}