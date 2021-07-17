<template>
  <div>
    <div class="priorityFilter">
      <div>
        <p class="font-semibold">Priority filter:</p>
      </div>
      <div class="flex flex-col justify-around h-60">
        <button @click="filterAll" :class="allBtn">All</button>
        <button @click="filterHigh" :class="highBtn">High</button>
        <button @click="filterMed" :class="medBtn">Medium</button>
        <button @click="filterLow" :class="lowBtn">Low</button>
      </div>
    </div>
    <div class="headerContainer">
      <h1 class="header">To Do List:</h1>
    </div>
    <div class="todosBody">
      <div class="w-9/12 flex justify-center border-b-2">
        <input
          class="inputContainer"
          type="text"
          name="todoItem"
          placeholder="Press key in then press Enter to add todos"
          v-model="item"
          @keypress.enter="addTodo"
          required
        />

        <select
          class="py-4 w-2/12 border-l-2 rounded-tr-xl"
          name="priorityLevel"
          id="priorityLevel"
          v-model="priorityLevel"
          @keypress.enter="addTodo"
          required
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <!-- <ul class="listContainer">
        <li @click="deleteTodo" class="border-b-2 py-4 rounded-b-xl" v-for="todo, index in todos" :key="index" :data-link="index">{{ todo }}</li>
      </ul> -->
      <table class="listContainer">
        <thead class="border-b-2">
          <tr>
            <th class="py-4">Date</th>
            <th class="py-4">Description</th>
            <th class="py-4">Priority</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Table :post="post" v-for="(post, index) in todos" :key="index" />
          <!-- <tr
            :class="todo.lineItem"
            v-for="(todo, index) in todos"
            :key="index"
            :data-link="index"
          >
            <td class="w-2/12 py-4">{{ todo.date }}</td>
            <td class="w-6/12 break-words py-4">{{ todo.description }}</td>
            <td class="w-3/12 py-4">{{ todo.priority }}</td>
            <td class="w-1/12">
              <button @click="deleteTodo" class="deleteBtn">Delete</button>
              <p class="hidden">{{ todo.id }}</p>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { addTodoItem, getTodoItem } from "../src/firebase/firebase.js";
import Table from "../src/components/Table.vue";

export default {
  data() {
    return {
      todos: [],
      highBtn: "btnCSS",
      medBtn: "btnCSS",
      lowBtn: "btnCSS",
      allBtn: "active",
      item: "",
      priorityLevel: "",
    };
  },
  components: { Table },
  created() {
    const gettingAllTodos = async () => {
      const gettingAllDocs = await getTodoItem();
      console.log(gettingAllDocs);
      // const listOfDocs = gettingAllDocs.docs;
      // console.log(listOfDocs);

      gettingAllDocs.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        const todosData = doc.data();
        this.todos.push(todosData);
        console.log("successfully read from firestore");
      });

    };
    return gettingAllTodos();
  },
  methods: {
    async addTodo() {
      const ts = new Date();
      const day = ts.getDate();
      const month = ts.getMonth();
      const year = ts.getFullYear();
      const docId = String(Date.now());
      const container = {
        id: docId,
        date: day + "/" + month + "/" + year,
        description: this.item,
        priority: this.priorityLevel,
        lineItem: "border-t-2",
      };
      console.log(container);
      this.todos.push(container);
      addTodoItem(docId, container);
      console.log("Successfully added");
      this.item = "";
      this.priorityLevel= ""
    },
    filterHigh() {
      if ((this.highBtn = "btnCSS")) {
        this.highBtn = "active";
        this.allBtn = "btnCSS";
        this.medBtn = "btnCSS";
        this.lowBtn = "btnCSS";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          if (todo.priority === "Low" || todo.priority === "Medium") {
            todo.lineItem += " " + "hidden";
          } else {
            todo.lineItem = "border-t-2";
          }
        }
      }
    },
    filterAll() {
      if ((this.allBtn = "btnCSS")) {
        this.allBtn = "active";
        this.highBtn = "btnCSS";
        this.medBtn = "btnCSS";
        this.lowBtn = "btnCSS";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          todo.lineItem = "border-t-2";
        }
      }
    },
    filterMed() {
      if ((this.medBtn = "btnCSS")) {
        this.highBtn = "btnCSS";
        this.allBtn = "btnCSS";
        this.medBtn = "active";
        this.lowBtn = "btnCSS";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          if (todo.priority === "High" || todo.priority === "Low") {
            todo.lineItem += " " + "hidden";
          } else {
            todo.lineItem = "border-t-2";
          }
        }
      }
    },
    filterLow() {
      if ((this.lowBtn = "btnCSS")) {
        this.highBtn = "btnCSS";
        this.allBtn = "btnCSS";
        this.medBtn = "btnCSS";
        this.lowBtn = "active";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          if (todo.priority === "Medium" || todo.priority === "High") {
            todo.lineItem += " " + "hidden";
          } else {
            todo.lineItem = "border-t-2";
          }
        }
      }
    },
  },
};
</script>

<style></style>
