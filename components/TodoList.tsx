import React from 'react';
import { TodoModel } from '@/app/lib/todo';
import Todo from './Todo';

interface TodoListProps {
    todos: TodoModel[]
}

const TodoList: React.FC<TodoListProps> = ({todos})  =>  {
    //sort todos by createdAt and isCompleted
    const sortedTodos = [...todos].sort((a, b) => b.createdAt - a.createdAt);
    const incompleteTodos = sortedTodos.filter(todo => !todo.isCompleted);
    const completedTodos = sortedTodos.filter(todo => todo.isCompleted);
    const finalTodos = [...incompleteTodos, ...completedTodos];

    return (
        <div className="overflow-x-auto mb-10">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='w-3/4 font'>ToDO</th>
                        <th>Is Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {finalTodos.map(todo =>(
                        <Todo key={todo.id} todo={todo} allTodos={finalTodos}/>
                    ))}
                </tbody>
            </table>
            {todos.length == 0 &&
                <h2 className='text-center mt-10'>No todo. Create a new todo instead!</h2>
            }
        </div>
    )
}

export default TodoList