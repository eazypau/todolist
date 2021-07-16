import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa6uTi8k7PT8ivKRGMivdnupxDuODOaIA",
  authDomain: "bloginvue-2c3c7.firebaseapp.com",
  projectId: "bloginvue-2c3c7",
  storageBucket: "bloginvue-2c3c7.appspot.com",
  messagingSenderId: "387581666245",
  appId: "1:387581666245:web:9a43036d269a8c158ae1ac",
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

export const deleteTodo = (docId) => {
    todoCollection.doc(docId).delete()
}
