import * as mongoose from 'mongoose';
import { isValid, isWithinInterval, parseISO } from 'date-fns'

import { Request, Response, NextFunction } from 'express';

import Asset, { IAsset } from '../models/asset';


const valid_user = true;

module.exports = {
    async store(req: Request, res: Response){   
        
        
        type Input = {
            name: string;
            price: number;
            quantity: number;
            purchaseDate: string;
            addedAt: Date;
            
          }
                       
        const { name, price, quantity, purchaseDate }: Input = req.body;
        

        if(!valid_user){               

            return res.status(404).json({         
                message: "User cannot be found."               
            });
          
        }
             else{
               
                console.log(parseISO(purchaseDate))

                if (isValid(parseISO(purchaseDate))){


                    console.log(new Date(2020, 3, 20));
                    console.log(new Date(2020, 10, 20));
                    console.log(new Date(purchaseDate));

                    if(isWithinInterval(new Date(purchaseDate), {
                        start: new Date(2020, 3, 1),
                        end: new Date(2020, 10, 1)
                      })){
                        res.status(201).json({
                            message: "TRUE!",
                            
                        })      
                    } else {
                        res.status(201).json({
                            message: "FALSE!",
                            
                        })   
                      }/*

                    console.log(purchaseDate)
                    console.log(typeof(purchaseDate))    
                    const p1 = new Asset ({
                        name: name,
                        price: price,
                        quantity: quantity,
                        purchaseDate: new Date(purchaseDate),
                    });
    
                    p1.save().then(result => {
                                           
                        res.status(201).json({
                            message: "Done upload!",
                            AssetAdded: {
                                asset_id: result._id,
                                name: result.name,
                                price: result.price,
                                quantity: result.quantity,
                                purchaseDate: result.purchaseDate,
                                addedAt: result.addedAt
                            }
                        })              
                    
                    }).catch(err => {
                       
                        console.log(err),
                            res.status(500).json({
                                error: err
                            });
                    });            


                } else{
                    res.status(422).json({
                        error: "Invalid Date Format (YYYY-MM-DD only)"
                    });
                    */   
                }             
            }                
    },

    async index(req, res){
        
        const { asset_id } = req.body;

        Asset.findById(asset_id, function(err, asset){
            res.status(200).json({
                message:"Assets retrieved successfully!",
                assets: asset
            })
        });       
    },

    async delete(req, res){
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