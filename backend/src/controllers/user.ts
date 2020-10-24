import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';

import { Request, Response, NextFunction } from 'express';



import User, { IUser } from '../models/user';
dotenv.config();

const valid_user = true;

module.exports = {
    async store(req: Request, res: Response){   
       
                       
        const { email, password }: IUser = req.body;
        

        if(!valid_user){               

            return res.status(404).json({         
                message: "User could not be created."               
            });
          
        }
        else{           

            const salt = `${process.env.SALT}`;

            await bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    const p1 = new User ({
                        email: email,
                        password: hash
                        
                    });

                    p1.save().then(result => {
                                    
                        res.status(201).json({
                            message: "Done upload!",
                            userAdded: {
                                user_id: result._id,
                                email: result.email,
                                password: result.password,
                                
                                
                            }
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
                });
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