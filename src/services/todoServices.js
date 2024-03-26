import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/index";

export function settodoData(todoData) {
  return addDoc(collection(db, "Todosssss"), todoData);
}

export async function getAllTodos() {
  const todosRef = collection(db, "Todosssss");
  const querySnapshot = await getDocs(todosRef);

  const todos = [];
  querySnapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() });
  });

  return todos;
}

export async function deleteTodoData(todoId) {
  return deleteDoc(doc(db, "Todosssss", todoId));
}
