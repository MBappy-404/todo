// TaskForm.js

import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ onAddTask, setTasks, tasks, openModal, setOpenModal }) => {
  //   const [taskName, setTaskName] = useState('');

//   submit data to add task 
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    // get value from form 
    const name = form.name.value;
    const priority = form.priority.value;
    const title = form.title.value;

    if (!name.trim()) return;
    const newTask = {
      id: uuidv4(),
      title: title,
      name: name,
      priority: priority,
      completed: false,
    };
 
    onAddTask(newTask);
    if (onAddTask) {
      form.reset();
      setOpenModal(false);
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("storedTasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <div className="w-72 mx-auto flex items-center justify-center">
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed flex justify-center items-center z-[100] ${openModal ? "visible opacity-1" : "invisible opacity-0"} inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}>
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`mx-2 w-full lg:w-[500px] bg-white drop-shadow-2xl rounded-lg ${openModal ? "opacity-1 duration-300 translate-y-0" : "-translate-y-20 opacity-0 duration-150"}`} >
          {/* modal close button  */}
          <div>
          <svg onClick={() => setOpenModal(false)} className="w-10 mx-auto mr-2 mt-2 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="gray"></path></g></svg>
          </div>
          <form onSubmit={handleSubmit} class="px-2 py-6 md:px-10 md:py-5">
            <h3 class="text-xl font-bold text-gray-400 mb-4 text-center">
              Add Your Task
            </h3>
            <div class="space-y-4">
              <input
                name="title"
                type="text"
                required
                class="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-300 transition-all"
                placeholder="Add Task Title"
              />
              <input
                name="name"
                type="text"
                required
                class="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-blue-300 transition-all"
                placeholder="Add Task Description"
              />
              <div class="relative font-[sans-serif] w-max  ">
                <span className="text-sm text-gray-400 mb-2">Select Task Priority</span>
                <div className="flex ml-2">
                  <div className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      id="high"
                      name="priority"
                      value="high"
                      required
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
                      required
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
                      required
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
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
