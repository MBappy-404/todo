// TaskList.js
import React, { useEffect, useState } from 'react';
import TaskItem from './Task';
import TaskForm from './TaskForm';
import toast from 'react-hot-toast';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  const storedTasks = JSON.parse(localStorage.getItem("storedTasks")) || [];

  useEffect(() => {
    // Example: Fetch data from local storage or perform other asynchronous operations
    const fetchData = () => {
      const storedData = JSON.parse(localStorage.getItem("storedTasks")) || [];
      setTasks(storedData); // Update state
    };

    fetchData(); // Call the function

  }, [tasks]);


  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    toast.success('Added New Task!')

  };

  

  // Count completed tasks
  const completedTasks = tasks.filter(task => task?.completed)?.length;

  return (
    <div class="max-w-5xl   mb-5    mt-5 mx-auto font-[sans-serif]   text-[#333]">
      <div className='px-2 mx-2 min-h-[100vh] py-5 border'>
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="sm:text-3xl text-2xl font-extrabold">Task Master</h2>
          <p class="text-sm text-gray-500 mt-6">Add Your Daily Task</p>
          <div className='flex justify-between py-3'>
            <p>Total Tasks: {storedTasks?.length}</p>
            <p>Completed Tasks: {completedTasks}</p>
          </div>
          <button onClick={() => setOpenModal(true)} className="bg-blue-500 text-white p-2 px-8 rounded-lg">Add Task</button>
        </div>
        <TaskForm openModal={openModal} tasks={tasks} setTasks={setTasks} onAddTask={addTask} setOpenModal={setOpenModal} />
      
      </div>
    </div>
  );
};

export default App;
