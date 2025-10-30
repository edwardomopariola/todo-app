Quick Start 🚀
1. Clone the Repository
Download the project using: git clone https://github.com/edwardomopariola/todo-app.git cd todo-app

2. Install Dependencies
Ensure all required packages are installed: npm install

2. Start the Frontend
npm start


Project Description:
The Todo App is a web application designed to help users manage tasks efficiently. It allows users to add, edit, delete, providing an intuitive and interactive way to track daily activities. It has a goggle OAuth verification, where only those who signed in can edit or delete their todo. Those who do not or did not sign-in do not get the option to delete or edit.

How It Works:
Once you open the app, you get the OAuth verification to sign in with your goggle account, if you sign-in, you get to edit or delete you todo-app ELSE you do not get the option to edit or delete.
Users enter a task into the input field and click "Add" to store the task.
Tasks appear in a list where users can edit or delete them.
The UI dynamically updates using React Hooks for state management.

Technologies Used:
React – Component-based UI rendering
React Hooks (useState, useEffect) – Handles task state and effects
Axios – Handles API calls for backend storage (if applicable)
Styled Components / CSS and tailwind CSS – UI design for user-friendly experience
