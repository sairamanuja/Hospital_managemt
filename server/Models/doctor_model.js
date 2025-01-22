import mongoose, { Schema, Types } from "mongoose";

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospitals",
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    aboutme: {
        type: String
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }

}, {
    timestamps: true
});

export const DoctorModel = mongoose.model("Doctors", DoctorSchema);

