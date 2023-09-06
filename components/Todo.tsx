"use client";
import { TodoModel } from '@/app/lib/todo'
import React, { useState } from 'react'
import {VscTrash, VscEdit} from 'react-icons/vsc'
import { DELETE, PUT} from '@/app/api/todo/[id]/route'
import { GET } from '@/app/api/todo/route'
import { useRouter } from 'next/navigation';

interface TodoProps {
    todo: TodoModel
    allTodos: TodoModel[]
}

const Todo: React.FC<TodoProps> = ({todo, allTodos}) => {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [todoText, setTodoText] = useState(todo.todo);
    const [error, setError] = useState('');

    const onDelete = async (id: any) => {
        await DELETE(id);
        router.refresh();
        setDeleteSuccess(true);
        setTimeout(() => setDeleteSuccess(false), 2000);
    }

    const onChangeCompletion = async (id: any, isCompleted: boolean) => {
        await PUT(id, isCompleted, null);
        router.refresh();
        setEditSuccess(true);
        setTimeout(() => setEditSuccess(false), 2000);
    }

    const handleInputChange = (e: any) => {
        setTodoText(e.target.value);
    };

    const onEditTodo = () => {
        setIsEditing(true);
    };

    const onSaveTodo = async (e: any) => {
        if (e.key === 'Enter') {
            const isDuplicate = allTodos.some((todo) => todo.todo === todoText);
            if (isDuplicate) {
                setError('Duplicate Todo!');
                setTimeout(() => setError(''), 2000);
            } else {
                await PUT(todo.id, null, todoText);
                router.refresh();
                setIsEditing(false);
                setEditSuccess(true);
                setTimeout(() => setEditSuccess(false), 2000);
            }
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    return (
        <tr key={todo.id} className={`hover group`}>
            <td>{isEditing ? (
                    <input
                        type="text"
                        className="input input-accent w-full"
                        value={todoText}
                        onChange={handleInputChange}
                        onKeyDown={onSaveTodo}
                    />
                ) : (
                    <span style={{textDecoration: todo.isCompleted ? 'line-through' : 'none',}}>
                        {todo.todo}
                    </span>
                )}
            </td>
            <td>
                <div className="form-control w-20">
                    <input 
                        type="checkbox"
                        className="checkbox checkbox-secondary ml-6"
                        checked={todo.isCompleted}
                        onChange={() => onChangeCompletion(todo.id, !todo.isCompleted)}
                    />
                </div>
            </td>
            <td className='space-x-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300'>
                <button onClick={() => onEditTodo()}>
                    <VscEdit size={18}/>
                </button>
                <button onClick={() =>  onDelete(todo.id)}>
                    <VscTrash size={18}/>
                </button>
            </td>

            {deleteSuccess && 
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        Todo deleted!
                    </div>
                </div>
            }

            {editSuccess &&
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        Todo edited!
                    </div>
                </div>
            }

            {error &&
                <div className="toast toast-top toast-end">
                    <div className="alert alert-error">
                        Duplicate todo!
                    </div>
                </div>
            }
        </tr>
    )
}

export default Todo