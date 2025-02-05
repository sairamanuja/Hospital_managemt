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
   
    availability: [
        {
          day: { 
            type: String, 
            required: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          },
          date: {  // Added date field
            type: String,
            required: true
          },
          slots: [
            {
              startTime: { 
                type: String, 
                required: true,
                match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
              },
              endTime: { 
                type: String, 
                required: true,
                match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
              },
              isBooked: { 
                type: Boolean,
                default: false
              },
            },
          ],
        },
      ],
    
    
});

export const AppointmentModel_user = mongoose.model("AppointmentModel_user", AppointmentSchema_User);
