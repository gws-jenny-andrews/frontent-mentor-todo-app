
import pkg from 'mongoose';
import { ITodo } from '../types';
const { Schema, model, models } = pkg;
// import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema<ITodo>({
    description: String,
    createdAt: Date,
    updatedAt: Date
});

const Todo = models.Todo || model<ITodo>('Todo', TodoSchema, "todos");


export default Todo;
