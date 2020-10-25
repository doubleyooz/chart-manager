import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';

import { Request, Response, NextFunction } from 'express';



import User, { IUser } from '../models/user';
dotenv.config();



module.exports = {
    async store(req: Request, res: Response){   
       
                       
        const { email, password }: IUser = req.body;
        

        const valid_user = () => {
            if(email && password){     
                
                let emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                let passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                
                   
                if (email.match(emailTest) && password.match(passwordTest))                                                     
                    return true;                                                     
                
                else
                    return false;                   
            }  
            else
                return false;           
        };
            

        if(!valid_user()){               

            return res.status(404).json({         
                message: "User could not be created."               
            });
          
        }
        else{                     
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            const p1 = new User ({
                email: email,
                password: hash
                
            });

            p1.save().then(result => {
                            
                res.status(201).json({
                    message: "Done upload!",
                    userAdded: result                      
                    
            
                })              
            
            }).catch(err => {
                
                console.log(err)
                if (err.name === 'MongoError' && err.code === 11000) {
                    //next(new Error('There was a duplicate key error'));
                    res.status(500).json({
                        error: err,
                        message: 'There was a duplicate key error',
                        
                    });
                    } else {
                    res.status(500).json({
                        error: err,
                        
                    });
                }                        
                    
            });                     

        }                                   
    },

    async index(req, res){
        
        const { email } = req.query;
       
        let docs = [];

        if (email){
            (await User.find( {email: {$regex: email, $options: "i"} } )).forEach(function (doc){
                docs.push(doc)
            });
        }


        else{
            (await User.find()).forEach(function (doc){
                docs.push(doc)
            });     
        }
          
        
        

        console.log(docs)
        res.status(200).json({
            message: "Page list retrieved successfully!",
            users: docs
            
        });   
    },

    async delete(req, res){
    /*
        const { Enterprise_id, chapter_id } = req.query;

        const chapters = await Chapter.deleteMany( { asset_id: asset_id, _id: chapter_id });

        

        if (chapters.n === 0 ){
            return res.json({ removed: false, chapters: chapters });
        } else{
            return res.json({ removed: true, chapters: chapters });
        }
    */
        
    }
}