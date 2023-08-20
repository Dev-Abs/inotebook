
const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

// const connectToMongo = () => {
//   mongoose.connect(mongoURI, () => {
//     console.log("connected to mongo successfully!!");
//   });
// };

// Import the Mongoose library

// Define a function to connect to MongoDB using async/await
async function connectToMongo() {
    try {
        // Use the mongoose.connect() method with the MongoDB connection URL
        // and necessary options like useNewUrlParser and useUnifiedTopology
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Connection successful
        console.log('Connected to MongoDB');
    } catch (error) {
        // Connection failed
        console.error('Error connecting to MongoDB:', error);
    }
}

// Call the connectToMongo function to initiate the connection
module.exports = connectToMongo;

