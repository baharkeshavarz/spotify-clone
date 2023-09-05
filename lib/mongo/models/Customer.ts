import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    stripe_customer_id: String,
}, {timestamps: true});


export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)