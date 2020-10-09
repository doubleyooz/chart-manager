import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './styles.css'

type Investment = {
    name: string;
    price: number;
    quantity: number;
    purchaseDate: Date;
  };


      
const schema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(2).max(10),
    price: yup.number().required("Price is a required field").typeError('you must specify a number'),
    quantity: yup.number().required("Quantity is a required field").typeError('you must specify a number'),
    purchaseDate: yup.date().required("Purchase Date is a required field").typeError('you must specify a date'),


});

     

const Management = () =>{
    const { register, handleSubmit, errors } = useForm<Investment>({
        mode: "onBlur",
        resolver: yupResolver(schema), 
    });

    const onSubmit = () => {
        console.log("Aqui")
    };
    
    return(       
        <div className="management-container">
            
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="title">
                    New Investement
                </div>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        ref={register}                       
                        
                    />
                    <span className={!!errors.name ? "error" : "no-error"} >{errors?.name?.message}</span>

                    
                </div>
                <div className="field">
                    <label htmlFor="price">Price</label>
                    <input                        
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        ref={register}
                    />
                     <span className={!!errors.price ? "error" : "no-error"} >{errors?.price?.message}</span>
                    
                </div>
                <div className="field">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        ref={register}
                    />
                     <span className={!!errors.quantity ? "error" : "no-error"} >{errors?.quantity?.message}</span>
                </div>

                <div className="field">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        ref={register}
                    />
                    <span className={!!errors.purchaseDate ? "error" : "no-error"} >{errors?.purchaseDate?.message}</span>
                </div>
                

                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )

}   


export default Management;