import * as mongoose from 'mongoose';
import { isValid, isWithinInterval, parseISO } from 'date-fns'

import { Request, Response, NextFunction } from 'express';

import Enterprise, { IEnterprise } from '../models/enterprise';

import response from '../common/response';

const valid_user = true;
export = {
    async store(req: Request, res: Response){   
        
        
       
                       
        const { initials, name, price, branch }: IEnterprise = req.body;
        

        if(!valid_user){              

            return res.json(        
                response.jsonNotFound(null, "User cannot be found.", null)              
            );          
        }
        else{           
            const p1 = new Enterprise ({
                initials: initials,
                name: name,
                price: price,
                branch: branch,                
                
            });

            p1.save().then(result => {

                return res.json(        
                    response.jsonOK(result, "Upload done!", null)              
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
        return res.json(        
            response.jsonOK(docs, "Page list retrieved successfully!", null)              
        );        
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