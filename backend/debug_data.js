const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Entrepreneur = require('./models/Entrepreneur');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const debugData = async () => {
    try {
        await connectDB();
        console.log('--- USERS ---');
        const users = await User.find({});
        users.forEach(u => console.log(`User: ${u.name} (${u._id}) Role: ${u.role}`));

        console.log('\n--- ENTREPRENEURS ---');
        const entrepreneurs = await Entrepreneur.find({});
        entrepreneurs.forEach(e => console.log(`Entrep: ${e.businessName} (${e._id}) Linked User: ${e.user}`));

        console.log('\n--- PRODUCTS ---');
        const products = await Product.find({});
        products.forEach(p => console.log(`Product: ${p.title} (${p._id}) Entrep Ref: ${p.entrepreneur}`));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugData();
