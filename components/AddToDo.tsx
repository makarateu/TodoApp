"use client"
import React, { useState } from 'react'
import { POST } from '@/app/api/todo/route';
import { useRouter } from 'next/navigation';
import { Todos } from '@/app/lib/todo';
import { GET } from '@/app/api/todo/route';

interface TodoListProps {
    todos: Todos[]
}

const AddToDo: React.FC<TodoListProps> = ({todos})  =>  {
    const router = useRouter();

    const [todoText, setTodoText] = useState('');
    const [error, setError] = useState('');
    const [addSuccess, setAddSuccess] = useState(false);

    const handleInputChange = (e: any) => {
        setTodoText(e.target.value);
    };

    const handleSubmit = async(e: any) => {
        if (e.key === 'Enter') {
            if (todoText.trim() === '') {
                setError('Invalid Todo!');
                setTimeout(() => setError(''), 2000);
            } else {
                //make sure the todo is unique
                const isDuplicate = todos.some((todo) => todo.todo === todoText);
                if (isDuplicate) {
                    setError('Duplicate Todo!');
                    setTimeout(() => setError(''), 2000);
                } else {
                    setTodoText('');
                    await POST(todoText);
                    router.refresh();
                    setAddSuccess(true);
                    setTimeout(() => setAddSuccess(false), 2000);
                }
            }
        }
    };

    return (
        <div className="form-control w-full">
            <input 
                type="text"
                placeholder="+ Add new Todo"
                className="input input-bordered input-accent w-full"
                value={todoText}
                onChange={handleInputChange}
                onKeyDown={handleSubmit}
            />
            <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt">Press Enter to add to list!</span>
            </label>

            {error && 
                <div className="toast toast-top toast-end">
                    <div className="alert alert-error">
                        {error}
                    </div>
                </div>
            }

            {addSuccess && 
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        New Todo Added!
                    </div>
                </div>
            }

        </div>
    )
}

export default AddToDo