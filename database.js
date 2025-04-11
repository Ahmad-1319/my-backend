const mongoose = require('mongoose');
const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb+srv://ahmad:ahmad1234@todo.d9wkbjo.mongodb.net/?retryWrites=true&w=majority&appName=todo').then(()=>{
            console.log("Connected to MongoDB Successsfully");
        });
       
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

module.exports = connectToMongo;
