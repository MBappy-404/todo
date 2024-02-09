// TaskItem.js
import React, { useState } from "react";

const TaskItem = ({task,index,onUpdateTask,onToggleTaskStatus,onDeleteTask,}) => {
  const [updateModal, setUpdateModal] = useState(false);

  // edit task
  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updateName = form.name.value;
    const updatePriority = form.priority.value;
    const updateTitle = form.title.value;
    
    onUpdateTask(task?.id, {
      ...task,
      title: updateTitle,
      name: updateName,
      priority: updatePriority ? updatePriority : task?.priority,
      completed: task.completed,
    });
    if (onUpdateTask) {
      form.reset();
      setUpdateModal(false);
    }
  };

  // dynamic bg-color based on priority
  const bgColor =
    (task?.priority === "high" && "bg-red-200") ||
    (task?.priority === "medium" && "bg-yellow-200") ||
    (task?.priority === "low" && "bg-gray-200");

  return (
    <div
      key={task?.id}
      class={`text-left transition-all    duration-300  ${task?.completed ? "bg-green-300" : bgColor}   border rounded-md p-6`}
    >
      {/* task index  */}
      <div className="flex justify-between">
        <p className="text-xs "> Task-{index + 1}</p>
        <p className="text-xs">{task.completed ? 'Completed' : "Incomplete"}</p>
        
      </div>
      {/* task items  */}
      <div className="flex mt-3 text-wrap justify-between">
        <div>
          <span
            className={`flex-grow ${task?.completed ? "line-through" : ""}`}
          >
            <h2 className="text-lg font-semibold">{task?.title}</h2>
            <span className="text-sm text-wrap">{task?.name}</span>
          </span>
        </div>

        {/* task complete checkbox  */}
        <div>
          {task?.completed ? (
            <div class="flex items-center">
              <input
                id="checkbox1"
                type="checkbox"
                class="hidden peer"
                checked
              />
              <label
                onClick={() => onToggleTaskStatus(task?.id)}
                for="checkbox1"
                class="relative -mr-1 flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white  w-6 h-6 mt-2 cursor-pointer bg-green-500 border rounded-full overflow-hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full fill-white"
                  viewBox="0 0 520 520"
                >
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check"
                    data-original="#000000"
                  />
                </svg>
              </label>
            </div>
          ) : (
            <div class="flex items-center">
              <input
                id="checkbox1"
                type="checkbox"
                class="hidden peer"
                checked
              />
              <label
                onClick={() => onToggleTaskStatus(task?.id)}
                for="checkbox1"
                class="relative -mr-1 flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white  w-6 h-6 mt-2 cursor-pointer bg-white border rounded-full overflow-hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full fill-gray-500"
                  viewBox="0 0 520 520"
                >
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check"
                    data-original="#000000"
                  />
                </svg>
              </label>
            </div>
          )}
        </div>
      </div>
       {/* update modal button */}
      <div className="flex   justify-end">
        <button onClick={() => setUpdateModal(true)} className={`${task.completed ? 'mr-2': "mr-0"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 fill-blue-600 hover:fill-blue-800"
            viewBox="0 0 348.882 348.882"
          >
            <path
              d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
              data-original="#000000"
            />
            <path
              d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
              data-original="#000000"
            />
          </svg>
        </button>

        {task?.completed && (
          <button onClick={() => onDeleteTask(task?.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 fill-red-500 hover:fill-red-700"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000"
              />
              <path
                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000"
              />
            </svg>
          </button>
        )}
      </div>

      {/* update modal  */}
      <div
        onClick={() => setUpdateModal(false)}
        className={`fixed flex justify-center items-center  z-[100] ${updateModal ? "visible opacity-1" : "invisible opacity-0"} inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`mx-2  w-full lg:w-[500px] bg-white drop-shadow-2xl  rounded-lg ${updateModal ? "opacity-1 duration-300 translate-y-0" : "-translate-y-20 opacity-0 duration-150"}`}
        >
          <div>
          <svg onClick={() => setUpdateModal(false)} className="w-10 mx-auto mr-2 mt-2 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="gray"></path></g></svg>
          </div>
          <form onSubmit={handleEdit} class="px-2 py-6 md:px-10 md:py-4 md:pb-10 ">
            <h3 class="text-xl font-bold text-gray-400 mb-4 text-center">
              Update Task
            </h3>
            <div class="space-y-4">
              <input
                name="title"
                type="text"
                defaultValue={task?.title}
                class="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-300 transition-all"
                placeholder="Add Task Description"
              />
              <input
                name="name"
                type="text"
                defaultValue={task?.name}
                class="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-300 transition-all"
                placeholder="Add Task Title"
              />
              <div class="relative font-[sans-serif] w-max  ">
                <span className="text-sm mb-2">Update Priority</span>
                <div className="flex ">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      id="high"
                      name="priority"
                      value="high"
                      className="mr-2"
                    />
                    <label
                      htmlFor="high"
                      className="text-white bg-red-500 px-2 py-1 rounded"
                    >
                      High
                    </label>
                  </div>
                  <div className="flex items-center p-2 cursor-pointer">
                    <input
                      type="radio"
                      id="medium"
                      name="priority"
                      value="medium"
                      className="mr-2"
                    />
                    <label
                      htmlFor="medium"
                      className="text-white bg-yellow-500 px-2 py-1 rounded"
                    >
                      Medium
                    </label>
                  </div>
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      id="low"
                      name="priority"
                      value="low"
                      className="mr-2"
                    />
                    <label
                      htmlFor="low"
                      className="text-white bg-gray-400 px-2 py-1 rounded"
                    >
                      Low
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <button
                type="submit"
                class="w-full py-4 px-4 text-sm font-semibold text-white bg-blue-400 hover:bg-blue-500 focus:outline-none"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
