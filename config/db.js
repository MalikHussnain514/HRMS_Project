import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    console.log(`DataBase Connected at ${connect.connection.host}`);
  } catch (error) {
    console.log("DataBase Connection Error", error.message);
    process.exit(1);
  }
};

export default connectDB;
