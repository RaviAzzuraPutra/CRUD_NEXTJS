import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    proce: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);