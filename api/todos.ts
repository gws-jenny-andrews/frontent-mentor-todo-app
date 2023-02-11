
import clientPromise from "./lib/mongodb";
import Todo from "./models/Todo";
import { ITodo } from "./types";


export default async (req: any,res: any) => {
    await clientPromise;

    try {
        const todos: ITodo[] = await Todo.find({})
        console.log(todos)
        res.status(200).json(todos);
      } catch (e) {
          console.error(e);
          res.json(400)
      }
}