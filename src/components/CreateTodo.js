import { useState } from 'react';  // Importing useState hook from React

const CreateTodo = ({ isSignedIn}) => {  // Component to create a new todo
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
        if (isSignedIn) {  // Check if the user is signed in
            setEditIndex(index);  // Set the index of the todo being edited
            setEditTodos(todos[index]);  // Set the current todo value in the input field
        } 
    };

    const deleteTodo = (index) => {  // Function to delete a todo
        if (isSignedIn) {  // Check if the user is signed in
            const updatedTodos = todos.filter((_, i) => i !== index);  // Filter out the todo at the specified index
            setTodos(updatedTodos);  // Set the updated list of todos
        }
    }

    const saveEdit = () => {  // Function to save the edited todo
        if (isSignedIn && editTodos.trim()) {  // Check if the user is signed in and the edit index is not empty
            const updatedTodos = [...todos];  // Create a copy of the current list of todos
            updatedTodos[editIndex] = editTodos;  // Update the todo at the specified index
            setTodos(updatedTodos);  // Set the updated list of todos
            setEditIndex(null);  // Clear the edit index
            setEditTodos('');  // Clear the input field
        }
    }

    return (
        <div className='todo-container'> 
            <h2 className='todo-header'>Create Todo</h2> 
            <div className='todo-input'> 
                <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" className='input-field'/> 
                <button onClick={addTodo}>Add Todo</button>  
            </div>
            <ul className='todo-list'>  
                {todos.map((todo, index) => (  // Map through the list of todos and display them
                    <li key={index} className='todo-item'>
                        {editIndex === index ? (  // Check if the todo is being edited
                            <>
                                <input type="text" value={editTodos} onChange={(e) => setEditTodos(e.target.value)} className='edit-input'/> 
                                <button onClick={saveEdit} className='save-edit'>Save</button>  {/* Save the edited todo */}
                            </>
                        ) : ( 
                            <>
                                <span>{todo}</span>
                                {isSignedIn &&  (
                                    <>
                                        <button className="edit-button" onClick={() => iseditTodos(index)}>Edit</button>  
                                        <button className="delete-button" onClick={() => deleteTodo(index)}>Delete</button>  
                                    </>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );  // Return the JSX for the component
};

export default CreateTodo;  // Export the CreateTodo component