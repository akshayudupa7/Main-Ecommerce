import mongoose, { Schema } from "mongoose";
import Product from "../product";
import User from "../user";
const cartSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
