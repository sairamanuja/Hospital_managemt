import mongoose from "mongoose";

const { Schema } = mongoose; 

const AppointmentSchema_Doctor = new Schema({
    
    
    
    doctor: { 
        type: Schema.Types.ObjectId,
        ref: "doctors",
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
 
    
}, {
    timestamps: true
});

export const AppointmentModel_doctor = mongoose.model("AppointmentModel_doctor", AppointmentSchema_Doctor);
