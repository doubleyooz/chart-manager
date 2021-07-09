import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';

import { Request, Response, NextFunction } from 'express';
import { getMessage } from '../common/messages'
import User, { IUser } from '../models/user';


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

                return res.jsonOK(result, getMessage("user.valid.sign_up.sucess"), {token, refreshToken})              
                                              

            }).catch(err => {
                
                console.log(err)
                if (err.name === 'MongoError' && err.code === 11000) {
                    //next(new Error('There was a duplicate key error'));
                    return res.jsonBadRequest(null, "There was a duplicate key error", {err})              
                      
                
                } else {
                    return res.jsonBadRequest(null, null, {err})              
                      
                
                }       
                    
            });     
        
        } 
        else{
            return res.jsonBadRequest(null, getMessage("badRequest"), null)              
             
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
        return res.jsonOK(docs, `Page list retrieved successfully! Users found: ${docs.length}`, null)              
        
    },

    async delete(req: Request, res: Response){
    
        const { user_id: string } = req.query;
        console.log(user_id)

        User.findOne({ _id: user_id }).then(result =>  {
            User.deleteOne({ _id: user_id }, function (err: any) {
                if (err){
                    return res.jsonNotFound(null, "The specified user could not be deleted", err.message)              
                    
                } else {
                    return res.jsonOK(null, "The specified user was deleted", result)              
                     
                  }
                   
                // deleted at most one tank document
                });  
        }).catch(err => {
            return res.jsonNotFound(null, "The specified user could not be found", err.message)              
                      
        })

             
    },

    async auth(req: Request, res: Response){
        const { email, password }: IUser = req.body;      

        const user:any = await User.findOne({ email: email }).select('password')

        const match = user ? await bcrypt.compare(password, user.password) : null;
        
        if(!match){
            return res.jsonBadRequest(null, "Bad Request", null)
            
        } else{
            const token = jwt.generateJwt({id: user._id});
            const refreshToken = jwt.generateRefreshJwt({id: user._id});
           
            return res.jsonOK(user, getMessage("user.valid.sign_in.sucess"), {token, refreshToken})
            
        }

           
        
    }
}