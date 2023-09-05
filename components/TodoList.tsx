import React, { useState, useEffect } from 'react';
import { Todos } from '@/app/lib/todo';
import Todo from './Todo';
import { GET } from '@/app/api/todo/route';

interface TodoListProps {
    // todos: Todos[]
}

const TodoList: React.FC<TodoListProps> = async({})  =>  {
    const todos: Todos[] = await GET();
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='w-3/4'>ToDO</th>
                        <th>Is Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>( 
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList