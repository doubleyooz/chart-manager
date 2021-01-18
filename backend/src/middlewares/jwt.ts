import jwt from '../common/jwt';
import response from '../common/response';
import { Request, Response, NextFunction } from 'express';

export = {
    checkJwt (req: Request, res: Response, next: NextFunction){
        let token = req.headers['authorization'];
        token = token ? token.slice(7, token.length) : undefined;
        if(!token){      
            return res.json(     
                response.jsonUnauthorized(null, response.getMessage("badRequest"), null)                              
            )  
        }

        try {
            const decoded = jwt.verifyJwt(token);

            req.user_id = decoded.id;

            next();
        } catch(error){       
            return res.json(     
                response.jsonUnauthorized(null, response.getMessage("badRequest"), null)                              
            )  
        }
    },
} 