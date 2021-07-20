import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {

};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //initate firestore connection
const todoCollection = db.collection("todosList"); //

export const addTodoItem = (docId, todoItem) => {
  const newTodo = todoCollection.doc(docId);
  newTodo.set(todoItem);
};

export const getTodoItem = async () => {
//   const todoDocs = todoCollection.doc();
  const snapshot = await todoCollection.get();
  console.log(snapshot);
//   const listOfTodo = getTodo.data
//   console.log(listOfTodo);
  return snapshot;
};

export const deleteTodo = async (docId) => {
    return await todoCollection.doc(docId).delete()
}
