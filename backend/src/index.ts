import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

interface Todo {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    isCompleted: boolean;
}


const todos: Todo[] = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const newTodo: Todo = {
        id: uuidv4(),
        title,
        description,
        createdAt: Date.now(),
        isCompleted: false,
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.patch('/todos/:id/toggle', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
    }
    todo.isCompleted = !todo.isCompleted;
    res.json(todo);
})

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Todo not found' });
        return;
    }
    todos.splice(index, 1);
    res.json({ success: true });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});