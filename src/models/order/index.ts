import mongoose from "mongoose";
import User from "../user";
import Product from "../product";


const OrderSchema=new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true
   },
   orderItems:[
    {
        qty:{type:Number,required:true},
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Product
        }

    }
   ],
   shippingAddress:{
    fullName:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,reqquired:true},
     postalCode:{type:String,required:true}

   },
   paymentMethod:{type:String,required:true},
   totalPrice: { type: Number, required: true },
   isPaid: { type: Boolean, required: true },
   paidAt: { type: Date, required: true },
   isProcessing: { type: Boolean, required: true },
   
},{timestamps:true});

const Order=mongoose.models.Order || mongoose.model('Order',OrderSchema)

export default Order