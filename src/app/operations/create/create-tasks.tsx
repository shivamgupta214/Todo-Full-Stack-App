"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "@/app/model/taskModel";

interface NewTaskFormProps {
  onClose: () => void;
  isEditClicked: boolean;
  editTask?: Task | null;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onClose, isEditClicked, editTask }) => {
    const [title, setTitle] = useState(''); 
    const [color, setColor] = useState('red');
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [id, setId] = useState(0);

     const handleCreateTask = async (newTask: { title: string; color: string }) => {
      console.log('this is task', newTask);
      try {
        const response = await axios.post('http://localhost:3001/create-tasks', newTask);
        //fetchTasks(); 
        console.log('Task created successfully:', response.data);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    const handleUpdatetask = async (id: number, title: string, color: string) => {
        try {
            await axios.put(`http://localhost:3001/update-tasks/${id}`, { title, color });
        } catch (error) {
            console.error('Error creating task:', error);
        }
   
    };

    useEffect(() => {
        setIsEditTaskOpen(isEditClicked);
        console.log("isEditClicked", isEditClicked)
        if (isEditClicked){
            setTitle(editTask?.title || '')
            setColor(editTask?.color || 'red')
            setId(editTask?.id || 0)
        }
    }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newtask = {
            title,
            color
    }
    if (isEditClicked){
        handleUpdatetask(id, title, color)
    } else{
        handleCreateTask(newtask);
        setTitle('');
    }
    onClose();
    editTask = null;
  };

  const setBoolTOManageCreateTask = () =>{
    sessionStorage.setItem("isCreateTask", JSON.stringify(false));
  }

  return (
    <div className="min-h-screen pt-[100px]">
      <div className="flex flex-row justify-center">
      <div className="w-1/2 h-11">
        <button 
          className="text-white hover:text-gray-300 p-2 rounded-md" 
          onClick={onClose}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5" 
            />
          </svg>
        </button>
        <div className="flex flex-col w-full pt-[50px]">

            <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="w-full">
                <label htmlFor="title" className="block text-white mb-2">
                Title
                </label>
                <input
                type="text"
                id="title"
                value={title}
                onChange={(e) =>  setTitle(e.target.value)}
                placeholder="E.g., Brush your teeth"
                className="w-full px-3 py-2 border rounded-md bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>
            <div className="flex flex-col space-x">
                <label htmlFor="color" className="block text-white mb-2">
                Color
                </label>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        key="red"
                        className={`rounded-full w-8 h-8 ${color === 'red' ? 'bg-[#EA0A0F] border-2 border-white-500' : 'bg-[#EA0A0F]'}`}
                        onClick={() => {
                        setColor('red');}}
                        />
                    <button
                        type="button"
                        key="orange"
                        className={`rounded-full w-8 h-8 ${color === 'orange' ? 'bg-[#ff9500] border-2 border-white-500' : 'bg-[#ff9500]'}`}
                        onClick={() => setColor('orange')}
                        />
                    <button
                        type="button"
                        key="yellow"
                        className={`rounded-full w-8 h-8 ${color === 'yellow' ? 'bg-[#ffcc00] border-2 border-white-500' : 'bg-[#ffcc00]'}`}
                        onClick={() => setColor('yellow')}
                        />
                    <button
                        type="button"
                        key="green"
                        className={`rounded-full w-8 h-8 ${color === 'green' ? 'bg-[#34c759] border-2 border-white-500' : 'bg-[#34c759]'}`}
                        onClick={() => setColor('green')}
                        />
                    <button
                        type="button"
                        key="blue"
                        className={`rounded-full w-8 h-8 ${color === 'blue' ? 'bg-[#007aff] border-2 border-white-500' : 'bg-[#007aff]'}`}
                        onClick={() => setColor('blue')}
                        />
                    <button
                        type="button"
                        key="indigo"
                        className={`rounded-full w-8 h-8 ${color === 'indigo' ? 'bg-[#5856d6] border-2 border-white-500' : 'bg-[#5856d6]'}`}
                        onClick={() => setColor('indigo')}
                        />
                    <button
                        type="button"
                        key="purple"
                        className={`rounded-full w-8 h-8 ${color === 'purple' ? 'bg-[#af52de] border-2 border-white-500' : 'bg-[#af52de]'}`}
                        onClick={() => setColor('purple')}
                        />
                    <button
                        type="button"
                        key="gray"
                        className={`rounded-full w-8 h-8 ${color === 'pink' ? 'bg-[#ff2d55] border-2 border-white-500' : 'bg-[#ff2d55]'}`}
                        onClick={() => setColor('gray')}
                        />
                    <button
                        type="button"
                        key="brown"
                        className={`rounded-full w-8 h-8 ${color === 'brown' ? 'bg-[#a2845e] border-2 border-white-500' : 'bg-[#a2845e]'}`}
                        onClick={() => setColor('brown')}
                        />
                </div>
            </div>
            <div className="pt-[10px]">
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full h-11 rounded mb-8">
                <div className="flex flex-row items-center justify-center">
                <span className="mr-2">{isEditClicked ? "Save Task" : "Add Task"}</span>
                <img 
                    src={isEditClicked ? "/check.png" : "/plus.png"} 
                    alt={isEditClicked ? "Save" : "Plus"} 
                    className="w-5 h-5" 
                />
                </div>
        
                </button>
        
            </div>
        </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NewTaskForm;