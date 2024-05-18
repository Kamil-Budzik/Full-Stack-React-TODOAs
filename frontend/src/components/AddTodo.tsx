import React, { useState } from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';


const addTodo = async (todo: {title: string; description: string}) => {
    return await axios.post('http://localhost:3000/todos', todo);
};

const AddTodoForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutation.mutate({ title, description });

        setTitle('');
        setDescription('');
    };

    return (
        <Box
            component="form"
            sx={{ width: '100%', maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                rows={4}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!title}>
                Add Todo
            </Button>
        </Box>
    );
};

export default AddTodoForm;