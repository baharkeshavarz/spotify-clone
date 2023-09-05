import mongoose from "mongoose";
import Stripe from 'stripe';

const ProductSchema = new mongoose.Schema({
    active: Boolean,
    name: String,
    description: String,
    image: String,
    //meradata: Stripe.Metadata,
}, {timestamps: true});


export default mongoose.models.Product || mongoose.model("Product", ProductSchema)