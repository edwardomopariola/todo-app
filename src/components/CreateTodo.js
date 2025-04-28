import { useState } from 'react';  // Importing useState hook from React

const CreateTodo = ({ IsSignedin}) => {  // Component to create a new todo
    const [ todos, setTodos ] = useState([]);  // State to store the list of todos
    const [ newTodo, setNewTodo ] = useState("");  // State to store the new todo input value
    const [ editTodos, setEditTodos ] = useState(null);  // State to store the value of the todo being edited
    const [ editIndex, setEditIndex ] = useState("");  // State to store the index of the todo being edited
    
    const addTodo = () => {  // Function to add a new todo}
        if (newTodo) {  // Check if the new todo is not empty
            setTodos([ ...todos, newTodo ]);  // Add the new todo to the list of todos
            setNewTodo('');  // Clear the input field
        }
    };

    const iseditTodos = (index) => {  // Function to edit an existing todo
        if (IsSignedin) {  // Check if the user is signed in
            setEditIndex(index);  // Set the index of the todo being edited
            setEditTodos(todos[index]);  // Set the current todo value in the input field
        } 
    };

    const deleteTodo = (index) => {  // Function to delete a todo
        if (IsSignedin) {  // Check if the user is signed in
            const updatedTodos = todos.filter((_, i) => i !== index);  // Filter out the todo at the specified index
            setTodos(updatedTodos);  // Set the updated list of todos
        }
    }

    const saveEdit = () => {  // Function to save the edited todo
        if (IsSignedin && editIndex.trim()) {  // Check if the user is signed in and the edit index is not empty
            const updatedTodos = [...todos];  // Create a copy of the current list of todos
            updatedTodos[editIndex] = editTodos;  // Update the todo at the specified index
            setTodos(updatedTodos);  // Set the updated list of todos
            setEditIndex(null);  // Clear the edit index
            setEditText('');  // Clear the input field
        }
    }

    return (
        <div>
            <h2>Create Todo</h2> 
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" /> 
            <button onClick={addTodo}>Add Todo</button>  
            <ul>  
                {todos.map((todo, index) => (  // Map through the list of todos and display them
                    <li key={index}>{todo} 
                        {editIndex === index ? (  // Check if the todo is being edited
                            <div>
                                <input type="text" value={editTodos} onChange={(e) => setEditTodos(e.target.value)} /> 
                                <button onClick={saveEdit}>Save</button>  {/* Save the edited todo */}
                            </div>
                        ) : (  // If not editing, show the edit button
                            <span>{todo}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    
}

export default CreateTodo;  // Export the CreateTodo component