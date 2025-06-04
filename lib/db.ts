import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

const connect = async ()=>
{
   const connectionState = mongoose.connection.readyState

   if(connectionState===1)
   {
       console.log("Connected to Database")
       return
   }

   if(connectionState===2)
   {
      console.log("Connecting...")
      return;
   }

   try {
     
    await mongoose.connect(MONGODB_URI!,{
        dbName:'ieeesbnitcweb',
        bufferCommands:true
    });
    
       console.log("Successfully connected to DB")

   } 
   catch (error:any) 
   {
      console.log(error);
      throw new Error("Failed to connect to DB");
   }
      
}

export default connect