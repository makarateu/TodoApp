import AddToDo from '@/components/AddToDo'
import TodoList from '@/components/TodoList'

export default async function Home() {

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'> ToDo App</h1>
        <AddToDo />
      </div>
      <TodoList />
    </main>
  )
}
