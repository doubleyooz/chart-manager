import * as mongoose from 'mongoose';
import { isValid, isWithinInterval, parseISO } from 'date-fns'

import { Request, Response, NextFunction } from 'express';

import Asset, { IAsset } from '../models/asset';


const valid_user = true;

export = {
    async store(req: Request, res: Response){   
        
        
        const name: string = req.body.name;
        const price: number = req.body.price;
        const quantity: number = req.body.quantity;
        const user_id: string = req.body.user_id;
        const purchaseDate: string = req.body.purchaseDate;        
       
        console.log(purchaseDate)
        
        if(!valid_user){             

            return res.status(404).json({         
                message: "User cannot be found."               
            });
          
        }
             else{              

                if (isValid(parseISO(purchaseDate))){

                   
                    if(isWithinInterval(new Date(purchaseDate), {
                        start: new Date(2020, 3, 1),
                        end: new Date(2020, 10, 1)
                      })){

                            
                        const p1 = new Asset ({
                            name: name,
                            price: price,
                            quantity: quantity,
                            user_id: user_id,
                            purchaseDate: new Date(purchaseDate),
                        });
        
                        p1.save().then(result => {
                                            
                            res.status(201).json({
                                message: "Done upload!",
                                AssetAdded: result
                                    
                                    
                                
                            })             
                        
                        }).catch(err => {
                        
                            console.log(err),
                                res.status(500).json({
                                    error: err
                                });
                        });            


                    } else {
                        res.status(201).json({
                            message: "FALSE!",
                            
                        })   
                      }
                   


                } else{
                    res.status(422).json({
                        error: "Invalid Date Format (YYYY-MM-DD only)"
                    });
                    
                }             
            }                
    },

    async index(req: Request, res: Response){
        
        const { asset_id } = req.body;

        Asset.findById(asset_id, function(err, asset){
            res.status(200).json({
                message:"Assets retrieved successfully!",
                assets: asset
            })
        });       
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