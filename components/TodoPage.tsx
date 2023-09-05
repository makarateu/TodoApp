"use client"
import React, { useState, useEffect } from 'react';
import AddToDo from '@/components/AddToDo';
import TodoList from '@/components/TodoList';
import { GET } from '@/app/api/todo/route';
import { TodoModel } from '@/app/lib/todo';

const TodoPage: React.FC = () => {
    
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState<TodoModel[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        async function fetchData() {
          const todosData = await GET();
          setTodos(todosData);
        }
        if(!isSearching || inputText == "") {
            fetchData();
        }
    }, [todos, inputText]);

    const handleInputChange = (text: any, isSearching: any) => {
        setIsSearching(isSearching);
        setInputText(text);
        const filteredTodos = todos.filter((todo) => {
            return todo.todo.toLowerCase().includes(text.toLowerCase());
        });
        setTodos(filteredTodos);
    };

    return (
        <main className='max-w-4xl mx-auto mt-4'>
            <div className='text-center my-5 flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'> ToDo App</h1>
                <AddToDo todos={todos} onInputChange={handleInputChange}/>
            </div>
            <TodoList todos={todos} />
        </main>
    );
};

export default TodoPage;
