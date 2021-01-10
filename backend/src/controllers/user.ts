import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';

import { Request, Response, NextFunction } from 'express';

import User, { IUser } from '../models/user';

import response from '../common/response';

import jwt from '../common/jwt';

dotenv.config();



export = {
    async store(req: Request, res: Response){   
                       
        const { email, password }: IUser = req.body;
    
        if(email && password){                       
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            const p1 = new User ({
                email: email,
                password: hash
                
            });

            p1.save().then(result => {

                const token = jwt.generateJwt({id: p1._id});
                const refreshToken = jwt.generateRefreshJwt({id: p1._id});

                res.json(        
                    response.jsonOK(result, "Account created", {token, refreshToken})              
                );                              

            }).catch(err => {
                
                console.log(err)
                if (err.name === 'MongoError' && err.code === 11000) {
                    //next(new Error('There was a duplicate key error'));
                    return res.json(        
                        response.jsonBadRequest(null, "There was a duplicate key error", {err})              
                    );  
                
                } else {
                    return res.json(        
                        response.jsonBadRequest(null, null, {err})              
                    );  
                
                }       
                    
            });     
        
        } 
        else{
            return res.json(        
                response.jsonBadRequest(null, "You did not give us what we want.", null)              
            ); 
        }                                                                     
    },

    async index(req: Request, res: Response){
        
        const { email } = req.query;
       
        let docs:any = [];

        if (email){
            (await User.find( {email: {$regex: email as string, $options: "i"} } )).forEach(function (doc){
                docs.push(doc)
            });
        }


        else{
            (await User.find()).forEach(function (doc){
                docs.push(doc)
            });     
        }
          
        
        

        console.log(docs)
        res.json(        
            response.jsonOK(docs, `Page list retrieved successfully! Users found: ${docs.length}`, null)              
        );
    },

    async delete(req: Request, res: Response){
    
        const { user_id } = req.query;

        User.findOne({_id: user_id}).then(result =>  {
            User.deleteOne({ id: user_id }, function (err: any) {
                if (err){
                    return res.json(        
                        response.jsonNotFound(null, "The specified user could not be deleted", err.message)              
                    )  
                } else {
                    return res.json(        
                        response.jsonOK(null, "The specified user was deleted", result)              
                    )  
                  }
                   
                // deleted at most one tank document
                });  
        }).catch(err => {
            return res.json(        
                response.jsonNotFound(null, "The specified user could not be found", err.message)              
            )             
        })

             
    },

    async auth(req: Request, res: Response){
        
    }
}