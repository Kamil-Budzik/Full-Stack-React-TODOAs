import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import type { Todo } from "./Todos.tsx";
import {Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Delete} from "@mui/icons-material";

interface Props {
    todos: Todo[];
}

const deleteTodo = (id: string) => axios.delete(`http://localhost:3000/todos/${id}`);

const toggleTodo = ({id, isCompleted}: {id: string; isCompleted: boolean}) => {
    return axios.patch(`http://localhost:3000/todos/${id}/toggle`, {isCompleted});
}

const TodosList = ({todos}: Props) => {
    const queryClient = useQueryClient();


    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const toggleMutation = useMutation({
        mutationFn: toggleTodo,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    })

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    const handleToggle = (id: string, isCompleted: boolean) => {
        toggleMutation.mutate({id, isCompleted: !isCompleted});
    }

   return (
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           {!todos.length && (
               <h2>No items yet.</h2>
           )}
           {todos.sort((a,b) => b.createdAt - a.createdAt).map(({id, title, description, isCompleted}: Todo) => {
               const labelId = `checkbox-list-label-${id}`;

               return (
                   <ListItem
                       key={id}
                       secondaryAction={
                           <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(id)}>
                               <Delete />
                           </IconButton>
                       }
                       disablePadding
                   >
                       <ListItemButton role={undefined} dense>
                           <ListItemIcon>
                               <Checkbox
                                   edge="start"
                                   checked={isCompleted}
                                   onChange={() => handleToggle(id, isCompleted)}
                                   tabIndex={-1}
                                   disableRipple
                                   inputProps={{ 'aria-labelledby': labelId }}
                               />
                           </ListItemIcon>
                           <ListItemText id={labelId} primary={title} secondary={description} />
                       </ListItemButton>
                   </ListItem>
               );
           })}
       </List>
   )

};

export default TodosList