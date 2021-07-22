import jwt from '../common/jwt';
import { getMessage } from '../common/messages'

import { Request, Response, NextFunction } from 'express';

export = {
    checkJwt (req: Request, res: Response, next: NextFunction){
        let token = req.headers['authorization'];
        token = token ? token.slice(7, token.length) : undefined;
        if(!token){      
            return res.jsonUnauthorized(null, getMessage("badRequest"), null)                              
            
        }

        try {
            const decoded = jwt.verifyJwt(token, 1);

            req.user_id = decoded.id;

            next();
        } catch(error){       
            return res.jsonUnauthorized(null, getMessage("badRequest"), null)                              
            
        }
    },
} 