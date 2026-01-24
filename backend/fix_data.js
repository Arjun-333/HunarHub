const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Entrepreneur = require('./models/Entrepreneur');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const fixData = async () => {
    try {
        await connectDB();
        console.log('--- STARTING MIGRATION ---');

        const products = await Product.find({});
        for (const product of products) {
            // Check if the current entrepreneur ID is actually a User ID
            const isUser = await User.findById(product.entrepreneur);
            
            if (isUser) {
                console.log(`Product "${product.title}" has User ID (${product.entrepreneur}). Fixing...`);
                // Find the entrepreneur profile for this user
                const entrepreneurProfile = await Entrepreneur.findOne({ user: product.entrepreneur });
                
                if (entrepreneurProfile) {
                    product.entrepreneur = entrepreneurProfile._id;
                    await product.save();
                    console.log(`-> FIXED: Linked to Entrepreneur ID (${entrepreneurProfile._id})`);
                } else {
                    console.log(`-> ERROR: No Entrepreneur profile found for User ${isUser.name}`);
                }
            } else {
                console.log(`Product "${product.title}" seems OK (ID: ${product.entrepreneur})`);
            }
        }

        console.log('--- MIGRATION COMPLETE ---');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixData();
