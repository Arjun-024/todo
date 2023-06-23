import React from "react";
import alert from './alert';
import { Checkbox, Typography, IconButton} from "@mui/material";
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
      alert('Todo deleted successfully', 'info');
    })
  }
  
  const updateTodo = (id, currState) => {
    fetch(`https://todo-app-75ffc-default-rtdb.asia-southeast1.firebasedatabase.app/todo-app/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        isComplete: !currState
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      fetchTodos();
      alert('Todo updated successfully', 'info');
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
                    <input type="checkbox" className="checkbox-alter" 
                    onClick={() => updateTodo(todo.id, todo.isCompleted)}
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
