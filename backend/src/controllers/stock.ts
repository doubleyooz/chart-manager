import * as mongoose from 'mongoose';
import { isValid, isWithinInterval, parseISO } from 'date-fns'

import { Request, Response, NextFunction } from 'express';

import Stock, { IStock } from '../models/stock';

import response from '../common/response';


const valid_user = true;

export = {
    async store(req: Request, res: Response){   
        
        
        
        const name: string = req.body.name;
        const price: number = req.body.price;
        const quantity: number = req.body.quantity;
        const purchaseDate: string = req.body.purchaseDate;        
        const enterprise_id : string = req.body.enterprise_id;

        console.log(purchaseDate)
        
        if(!valid_user){             

            return res.json(        
                response.jsonNotFound(null, "User cannot be found.", null)              
            );
          
        }
        else{              

            if (isValid(parseISO(purchaseDate))){                
                if(isWithinInterval(new Date(purchaseDate), {
                    start: new Date(2020, 3, 1),
                    end: new Date(2020, 10, 1)
                    })){
                        
                    const p1 = new Stock ({
                        name: name,
                        price: price,
                        quantity: quantity,
                        purchaseDate: new Date(purchaseDate),
                        enterprise_id: enterprise_id,
                    });
    
                    p1.save().then(result => {
                                        
                        res.json(        
                            response.jsonOK(result, "Stock saved!", null)              
                        );
    
                    
                    }).catch(err => {
                    
                        console.log(err)
                        res.json(        
                            response.jsonServerError(null , null, {err})            
                        );
                    });            


                } else {

                    res.json(
                        response.jsonBadRequest(null, "Date out range", null)
                    );
                    
                    }
                


            } else{
                res.json(
                    response.jsonBadRequest(null, "Invalid Date Format (YYYY-MM-DD only)", null)
                );
                
                
            }             
        }                
    },

    async index(req: Request, res: Response){
        
        const { user_id } = req.body;

       
        let docs: any = [];

        (await Stock.find( {user_id: user_id } )).forEach(function (doc){
            docs.push(doc)
        });

       

        res.json(        
            response.jsonOK(docs, "Stocks list retrieved successfully!", null)              
        );
            
            
    },

    async delete(req: Request, res: Response){
    /*
        const { asset_id, chapter_id } = req.query;

        const chapters = await Chapter.deleteMany( { asset_id: asset_id, _id: chapter_id });

        

        if (chapters.n === 0 ){
            return res.json({ removed: false, chapters: chapters });
        } else{
            return res.json({ removed: true, chapters: chapters });
        }
    */
        
    }
}