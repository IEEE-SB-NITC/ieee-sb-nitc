import { NextResponse } from "next/server"
import connect from "@/lib/db"
import Event from "@/lib/models/events";

export const GET = async (req:Request) =>
{
   try {
      await connect();
   
      const {searchParams} = new URL(req.url);

      const society = searchParams.get("society");

      const query = society ? { conducting_society: society } : {};
      //no society then return all events

      
      const events = await Event.find(query);
       const currentDate = new Date();

      for (const event of events) {
      const eventDate = new Date(event.date);

      if (!event.completion_status && eventDate < currentDate) {
        event.completion_status = true;
        await event.save(); //save event back to DB   
      }
    }

       return new NextResponse(JSON.stringify(events), { status: 200 });
   } 
   catch (error : any ) {
      return new NextResponse("Error in fetching Events" + error.message,{status:500})
   }
}



export const POST  =  async (request: Request) =>
{
     try 
     {
        const body = await request.json();
        await connect();
        const newEvent =  new Event({
         event_name:body.event_name,
         conducting_society:body.conducting_society,
         date:body.date,
         completion_status:false
         });

         await newEvent.save();

         return new NextResponse(JSON.stringify({message:"New Event Added to Database",user:newEvent}),{status:200})
     } 
     catch (error:any) 
     {
         return new NextResponse("Error in adding Event" + error.message,{status:500})
     }

}