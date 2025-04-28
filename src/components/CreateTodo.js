import { useState } from 'react';  // Importing useState hook from React

const CreateTodo = ({}) => {  // Component to create a new todo
    const [ todos, setTodos ] = useState([]);  // State to store the list of todos
    const [ newTodo, setNewTodo ] = useState("");  // State to store the new todo input value
    
    const addTodo = () => {  // Function to add a new todo}
        if (newTodo) {  // Check if the new todo is not empty
            setTodos([ ...todos, newTodo ]);  // Add the new todo to the list of todos
            setNewTodo('');  // Clear the input field
        }
    };

    return (
        <div>
            <h2>Create Todo</h2> 
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" /> 
            <button onClick={addTodo}>Add Todo</button>  
            <ul>  
                {todos.map((todo, index) => (  // Map through the list of todos and display them
                    <li key={index}>{todo}</li>  // Display each todo in a list item
                ))}
            </ul>
        </div>
    );

    
}

export default CreateTodo;  // Export the CreateTodo component