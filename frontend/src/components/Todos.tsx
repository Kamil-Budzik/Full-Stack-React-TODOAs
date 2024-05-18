import React, {useState} from "react";
import axios from 'axios';
import {useQuery } from "@tanstack/react-query";
import TodosList from "./TodosList.tsx";
import AddTodoForm from "./AddTodo.tsx";
import '../styles/Todos.css';
import {TextField} from "@mui/material";

export interface Todo {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: number;
}

const getTodos = async () => {
   return await axios.get('http://localhost:3000/todos')
};

const Todos = () => {
    const {isLoading, isError, data} = useQuery({ queryKey: ['todos'], queryFn: getTodos })
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTodos = data?.data.filter((todo: Todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    if (isError) {
        return (
            <>
                <div>Something went wrong... Make sure your backend is on</div>
            </>
        )
    }

    return (
        <div className="todos__wrapper">
            <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2 }}
                disabled={isLoading || !filteredTodos}
            />
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && (
                <>
                <AddTodoForm />
                <TodosList todos={filteredTodos} />
                </>
            )}
        </div>
    )

};

export default Todos;