import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage or backend
  useEffect(() => {
    const cached = localStorage.getItem('tasks');
    if (cached) {
      setTasks(JSON.parse(cached));
    } else {
      fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
          setTasks(data);
          localStorage.setItem('tasks', JSON.stringify(data));
        });
    }
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
