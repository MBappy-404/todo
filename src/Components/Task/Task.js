// TaskList.js
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [priorityFilter, setPriorityFilter] = useState("all");


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Update filtered tasks whenever tasks is filtered
    if (priorityFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.priority === priorityFilter);
      setFilteredTasks(filtered);
    }
  }, [tasks, priorityFilter]);

  const storedTasks = JSON.parse(localStorage.getItem("storedTasks")) || [];

  useEffect(() => {
    const fetchData = () => {
      const storedData = JSON.parse(localStorage.getItem("storedTasks")) || [];
      setTasks(storedData); // Update state
    };
    fetchData(); // Call the function
  }, [filteredTasks]);

  // add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    toast.success("Added New Task!");
  };

  //  update an existing task
  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task,
    );
    localStorage.setItem("storedTasks", JSON.stringify(updatedTasks));
    toast.success("Your task is updated");
  };

  //  mark a task as completed
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    localStorage.setItem("storedTasks", JSON.stringify(updatedTasks));
  };

  //  delete a task
  const deleteTask = (taskId) => {
    const filter = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("storedTasks", JSON.stringify(filter));
    toast.success("Task Deleted!");
  };

//   set priority when filter 
  const filterTasksByPriority = (priority) => {
    setPriorityFilter(priority);
  };
  // Count completed tasks
  const completedTasks = tasks.filter((task) => task?.completed)?.length;

  return (
    <div class="max-w-5xl   mb-5    mt-5 mx-auto font-[sans-serif]   text-[#333]">
      <div className="px-2 mx-2 min-h-[100vh] py-5 border">
        <div class="text-center  pb-8 max-w-2xl mx-auto">
          <h2 class="sm:text-3xl text-2xl font-extrabold">Task Master</h2>
          <p class="text-sm text-gray-500 mt-6">Add Your Daily Task</p>
          <div className="flex justify-between py-3">
            <p>Total Tasks: {storedTasks?.length}</p>
            <p>Completed Tasks: {completedTasks}</p>
          </div>
          {/* add task button  */}
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-500 text-white p-2 px-8 rounded-lg"
          >
            Add Task
          </button>
        </div>
        {/* filter menu  */}
        <ul class="flex border-b-2  space-x-1 md:space-x-5 overflow-hidden font-sans">
          <li
            onClick={() => filterTasksByPriority("all")}
            class={` font-bold    w-full  transition-all duration-300  text-center text-[15px] py-2.5 px-4 rounded-tl-2xl rounded-tr-2xl cursor-pointer  ${priorityFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} `}
          >
            All
          </li>
          <li
            onClick={() => filterTasksByPriority("high")}
            class={` font-bold  w-full  transition-all duration-300  text-center text-[15px] py-2.5 px-4 rounded-tl-2xl rounded-tr-2xl cursor-pointer ${priorityFilter === "high" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            High Priority
          </li>
          <li
            onClick={() => filterTasksByPriority("medium")}
            class={` font-bold  w-full  transition-all duration-300  text-center text-[15px] py-2.5 px-4 rounded-tl-2xl rounded-tr-2xl cursor-pointer ${priorityFilter === "medium" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            Medium Priority
          </li>
          <li
            onClick={() => filterTasksByPriority("low")}
            class={` font-bold  w-full  transition-all duration-300  text-center text-[15px] py-2.5 px-4 rounded-tl-2xl rounded-tr-2xl cursor-pointer ${priorityFilter === "low" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            Low Priority
          </li>
        </ul>

        <TaskForm
          openModal={openModal}
          tasks={tasks}
          setTasks={setTasks}
          onAddTask={addTask}
          setOpenModal={setOpenModal}
        />
        {tasks?.length ? (
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-1 mt-5 max-md:max-w-lg mx-auto">
            {filteredTasks?.map((task, index) => (
              <TaskItem
                key={task?.id}
                task={task}
                index={index}
                onUpdateTask={updateTask}
                onToggleTaskStatus={toggleTaskStatus}
                onDeleteTask={deleteTask}
              />
            ))}
          </div>
        ) : (
          // when task length 0
          <div className="flex mt-10 justify-center">
            <h2 className="text-lg text-gray-500 ">No task Available</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
