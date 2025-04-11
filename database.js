const mongoose = require('mongoose');
const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Todo').then(()=>{
            console.log("Connected to MongoDB Successsfully");
        });
       
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

module.exports = connectToMongo;
