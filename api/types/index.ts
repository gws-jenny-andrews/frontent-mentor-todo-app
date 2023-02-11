import mongoose from 'mongoose';
const {Types } = mongoose;

export interface ITodo {
    _id: string
    description: String,
    createdAt: Date,
    updatedAt?:Date
}

