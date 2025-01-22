import mongoose from "mongoose";

const { Schema } = mongoose; 

const AppointmentSchema_Doctor = new Schema({
    
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospitals",
        required: true,
    },
    
    doctor: { 
        type: Schema.Types.ObjectId,
        ref: "doctors",
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
    fees:String,
    
});

export const AppointmentModel_doctor = mongoose.model("AppointmentModel_doctor", AppointmentSchema_Doctor);
