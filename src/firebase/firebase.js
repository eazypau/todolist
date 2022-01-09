import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  // insert key here
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //initate firestore connection
const todoCollection = db.collection("todosList"); //

export const addTodoItem = (docId, todoItem) => {
  const newTodo = todoCollection.doc(docId);
  newTodo.set(todoItem);
};

export const getTodoItem = async () => {
  const snapshot = await todoCollection.get();
  // console.log(snapshot);
  return snapshot;
};

export const deleteTodo = async (docId) => {
    return await todoCollection.doc(docId).delete()
}

export const updateStatus = async (docId, newStatus) => {
  return await todoCollection.doc(docId).update({ priority: newStatus })
}

export const updateTodoDescription = async (docId, newDescription) => {
  return await todoCollection.doc(docId).update({ description: newDescription })
}