"use client";

import { useEffect, useState } from "react";
import NewTask from "./operations/create/create-tasks";
import TaskDetail from "./tasks-detail";
import { Task } from "./model/taskModel";

const Home= () => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 

    const setCreateTask = () => {
      setIsCreateTaskOpen(true)
    }

    const handleTaskClick = (task: Task) => {
      console.log("Task clicked:", task);
      setIsEditTaskOpen(true)
      setSelectedTask(task)
      setCreateTask();
     
    };

    return (
    <div className="bg-[#1a1a1a] min-h-screen "> 
        <div className="bg-[#0d0d0d] p-10 rounded-lg shadow-lg flex flex-row items-center justify-center">
        <img src="/logo.png" alt="Rocket Icon" className="w-8 h-8 mr-2" />
          <h1 className="text-3xl font-bold text-[#4ea8de] mb-4">Todo</h1>
          <h1 className="text-3xl font-bold text-[#5e60ce] mb-4 mx-2">App</h1>
        </div>
      

        {isCreateTaskOpen ? (
        <NewTask 
        onClose={() => {setIsCreateTaskOpen(false), setIsEditTaskOpen(false)}}
        isEditClicked={isEditTaskOpen}
        editTask={selectedTask}
        />
      ) : (
        <div>
        <div className="flex flex-row items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/2 h-11 rounded mb-8" onClick={setCreateTask}>
        <div className="flex flex-row items-center justify-center">
        <span className="mr-2">Create Task</span>
          <img src="/plus.png" alt="Plus" className="w-5 h-5" />
        </div>
        
        </button>
        
      </div>
      <TaskDetail
       onTaskClick = {handleTaskClick}
       isEditClicked = {isEditTaskOpen}
      />
      </div>
      )} 
    </div>
    );
};

export default Home;