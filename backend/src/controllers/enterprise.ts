import * as mongoose from 'mongoose';
import { isValid, isWithinInterval, parseISO } from 'date-fns'

import { Request, Response, NextFunction } from 'express';

import Enterprise, { IEnterprise } from '../models/enterprise';


const valid_user = true;
export = {
    async store(req: Request, res: Response){   
        
        
       
                       
        const { initials, name, price, branch, volume }: IEnterprise = req.body;
        

        if(!valid_user){               

            return res.status(404).json({         
                message: "User cannot be found."               
            });
          
        }
        else{           
            const p1 = new Enterprise ({
                initials: initials,
                name: name,
                price: price,
                branch: branch,
                volume: volume,
                
            });

            p1.save().then(result => {
                                    
                res.status(201).json({
                    message: "Done upload!",
                    added: true,
                    EnterpriseAdded: {
                        Enterprise_id: result._id,
                        initials: result.initials,
                        name: result.name,
                        price: result.price,
                        volume: result.volume,
                        branch: result.branch,
                        active: result.isActive,
                        
                    }
                })              
            
            }).catch(err => {
                
                console.log(err)
                if (err.name === 'MongoError' && err.code === 11000) {
                    //next(new Error('There was a duplicate key error'));
                    res.status(500).json({
                        error: err,
                        message: 'There was a duplicate key error',
                        added: false,
                    });
                    } else {
                    res.status(500).json({
                        error: err,
                        added: false,
                    });
                    }
                
                    
            });                      
        

            
            


        }       
                            
    },

    async index(req: Request, res: Response){
        
        const { name, initials, branch } = req.query;
        
       
        let docs:any = [];

        if (name){
            (await Enterprise.find( {name: {$regex: name as string, $options: "i"} } )).forEach(function (doc){
                docs.push(doc)
            });
        }

        else if (initials){
            (await Enterprise.find( {initials: {$regex: initials as string, $options: "i"} } )).forEach(function (doc){
                docs.push(doc)
            });
        }

        else if (branch){
            (await Enterprise.find( {branch: {$regex: branch as string, $options: "i"} } )).forEach(function (doc){
                docs.push(doc)
            });
        }


        else{
            (await Enterprise.find()).forEach(function (doc){
                docs.push(doc)
            });     
        }
          
        
        

        console.log(docs)
        res.status(200).json({
            message: "Page list retrieved successfully!",
            enterprises: docs
            
        });   
    },

    async delete(req: Request, res: Response){
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