import { TodoModel } from '@/app/lib/todo';
import { firestoreDb } from '@/firebase/clientApp';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { NextResponse } from 'next/server';

export const  GET = async (): Promise<TodoModel[]>  =>   {
    const allTodos : TodoModel[] = [];
    const querySnapshot = await getDocs(collection(firestoreDb, "todo"));
    querySnapshot.forEach((doc) => {
        const todoItem : TodoModel = {
            id: doc.data().id,
            todo: doc.data().todo,
            isCompleted: doc.data().isCompleted,
            createdAt: doc.data().createdAt.toDate(),
        }
        allTodos.push(todoItem);
    });
    return allTodos;
}

//Method: POST; Endpoint: /api/todo
export const POST = async (todo: any): Promise<any> => {
    try {
        const id = Date.now().toString();
        const todoRef = collection(firestoreDb, "todo");
        await setDoc(doc(todoRef), {
            id: id,
            todo: todo,
            isCompleted: false,
            createdAt: new Date(),
        });
        return NextResponse.json({Response: "Success"});
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        )
    }
}
