import { UUID } from "crypto"
import { Timestamp } from "firebase/firestore/lite";

export interface TodoModel {
    id: string;
    todo: string;
    isCompleted: boolean;
    createdAt: any;
}