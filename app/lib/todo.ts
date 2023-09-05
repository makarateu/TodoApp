import { UUID } from "crypto"
import { Timestamp } from "firebase/firestore/lite";

export interface Todos {
    id: string;
    todo: string;
    isCompleted: boolean;
    createdAt: Timestamp;
}