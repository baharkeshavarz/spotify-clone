import mongoose from "mongoose";
import Product from "./Product";
import Stripe from "stripe";

const PriceSchema = new mongoose.Schema({
    product_id: String,
    active: Boolean,
    description: String,
    unit_amount: Number,
    currency: String,
    type: String,
    interval: String,
    interval_count: Number,
    trial_period_days: Number,
 //   metadata: Stripe.Metadata,
    products: Product,
}, {timestamps: true});


export default mongoose.models.Price || mongoose.model("Price", PriceSchema)