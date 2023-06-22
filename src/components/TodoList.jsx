import React, { useEffect } from "react";
import { Checkbox, Typography, Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import '@fontsource/roboto/400.css';


function TodoList({todos, fetchTodos}) {
  const deleteTodo = (id) => {
    console.log(id);
    fetch(`https://todo-app-75ffc-default-rtdb.asia-southeast1.firebasedatabase.app/todo-app/${id}.json`, {
      method: 'DELETE',
    })
    .then(() => {
      fetchTodos();
    })
  }

  return (
    <div>
      {todos.length > 0 ? (
        <div className="todos-container">
          {todos.map((todo) => {
            return (
              <div key={todo.id} className="todo">
                <div className="todo-left">
                  <div className="todo-done">
                    <Checkbox
                      checked={todo.done}
                      onChange={() =>
                        setTodos((prevTodos) =>
                          prevTodos.map((todo) =>
                            todo.id === todo.id
                              ? { ...todo, done: !todo.done }
                              : todo
                          )
                        )
                      }
                    />
                  </div>

                  <div className="todo-detail">
                    <Typography variant="h6" component="div">
                      {todo.title}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {todo.description} 
                    </Typography>
                  </div>
                </div>

                <div className="todo-right">
                  <div className="todo-delete">
                    <IconButton onClick={() => deleteTodo(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div> 

                {/* <div>{todo.priority}</div>
                    <div>{todo.dueDate}</div>
                    <div>{todo.isCompleted}</div> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div> No Todos </div>
      )}
    </div>
  );
}


export default TodoList
