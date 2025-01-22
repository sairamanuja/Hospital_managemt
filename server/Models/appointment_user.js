import mongoose from "mongoose";

const { Schema } = mongoose; 

const AppointmentSchema_User = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    doctor: { 
        type: Schema.Types.ObjectId,
        ref: "Doctors",
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospitals",
        required: true,
    },
   
    availability: [
        {
          day: { type: String, required: true }, 
          slots: [
            {
              startTime: { type: String, required: true },
              endTime: { type: String, required: true },

              isBooked: { type: Boolean, }, 
            },
          ],
        },
      ],
    
    
});

export const AppointmentModel_user = mongoose.model("AppointmentModel_user", AppointmentSchema_User);
