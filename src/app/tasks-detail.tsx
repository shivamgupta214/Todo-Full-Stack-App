"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./model/taskModel";

interface TaskDetailProps {
    onTaskClick: (task: Task) => void;
    isEditClicked: boolean;
  }

const TaskDetail = ({ onTaskClick, isEditClicked }: TaskDetailProps) => {
    const [tasks, setTasks] = useState<Task[]>([]); 
    const [completedCount, setCompletedCount] = useState(0);
    const [editClick, setIsEditClicked] = useState(false);

    const fetchTasks = async () => {
        const response = await axios.get("http://localhost:3001/get-tasks");
        
        setTasks(response.data);
        setCompletedCount(response.data.filter((t: any) => t.completed).length);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const toggleCompletion = async (id: number, completed: boolean) => {
        await axios.put(`http://localhost:3001/update-tasks/${id}`, { completed });
        fetchTasks();
    };

    const deleteTask = async (id: number) => {
        await axios.delete(`http://localhost:3001/delete-tasks/${id}`);
        fetchTasks();
    };

    const handleTaskClick = (task: Task) => {
        onTaskClick(task);
        console.log('taks is clicked in taskdetail');
        setIsEditClicked(true);
        isEditClicked = editClick;
      };


    return (
    <div className="min-h-screen "> 
       <div className="flex flex-row items-center justify-center"> 
       <div className="w-1/2 h-11">
        <div className="flex justify-between w-full">
          <div className="flex items-center space-x-2">
             <span className="text-xl font-semibold text-[#3c779b]">Tasks</span>
            <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">{tasks.length - completedCount}</span>
          </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-[#6b6dc9]">Completed</span>
              <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">{completedCount !== 0 
                                                                              ? `${completedCount} of ${tasks.length}` 
                                                                              : `${completedCount}`}
              </span>
            </div>
        </div>
        {tasks.length === 0 ? (
        <div className="text-center mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 w-10 h-10 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2M9 5c0 1.105-1.343 2-3 2s-3-.895-3-2"
            />
          </svg>
          <p className="text-lg text-gray-400">You don't have any tasks registered yet.</p>
          <p className="text-lg text-gray-400">Create tasks and organize your to-do items.</p>
        </div>
        ) : (
        <div className="mt-8">
          <ul className="space-y-4">
            {tasks.map((task) => (
            
              <li 
                key={task.id} 
                className="flex items-center justify-between bg-[#262626] border rounded-md shadow-md p-4 w-full"
                
              >
                <div className="flex items-center space-x-2">
                  <input 
                  type="checkbox" 
                  className="text-blue-500 rounded-full focus:ring-blue-500" 
                  checked={task.completed} 
                  onChange={(e) => {
                    toggleCompletion(task.id, !task.completed);
                    e.stopPropagation();
                    } }
                  />
                  <span 
                    className={`text-white text-sm font-medium break-words ${
                        task.completed ? 'line-through opacity-50' : ''
                      }`} 
                      onClick={() => handleTaskClick(task)}
                  >
                    {task.title}
                  </span>
                </div>
                <div className="flex flex-col space-y-2 mx-1">
                <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete Task"
                >
                <img
                    src="/delete.png" 
                    alt="Delete Task"
                    className="w-5 h-5" 
                />
                </button>
                </div>
              </li>
            
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
    </div>
    );
};

export default TaskDetail;
