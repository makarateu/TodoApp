import { firebaseApp, firestoreDb } from '@/firebase/clientApp';
import { collection, doc, query, where, getDocs, deleteDoc, updateDoc} from "firebase/firestore";
import { NextResponse } from 'next/server';

export const DELETE = async (id: any): Promise<any> => {
    try {
        const q = query(collection(firestoreDb, "todo"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
  
        return NextResponse.json({Response: "Success"});
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        )
    }
};

export const PUT = async (id: any, isCompleted: boolean | null = null, todoText: any | null = null): Promise<any> => {
    try {
        // Reference the todo document by its ID
        const q = query(collection(firestoreDb, "todo"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const docRef = querySnapshot.docs[0].ref;
        if(isCompleted != null) {
            await updateDoc(docRef, {isCompleted: isCompleted})
        }

        if(todoText != null) {
            await updateDoc(docRef, {todo: todoText})
        }

        return NextResponse.json({Response: "Success"});
    } catch (err) {
        return NextResponse.json(
            { message: "Error", err },
            { status: 500 }
        )
    }
};