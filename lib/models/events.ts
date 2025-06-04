import {Schema,model,models} from "mongoose"

const EventSchema = new Schema(

    {
         event_name:{type:String,required:true},
         conducting_society: {type:String,required:true},
         date: {type:Date,required:true},
         completion_status:{type:Boolean,default:false}
    },

    {
        timestamps:true
    }
  
)

const Event = models.Event || model("Event",EventSchema);

export default Event;