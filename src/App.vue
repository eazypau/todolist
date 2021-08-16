<template>
  <div>
    <div class="priorityFilter">
      <div v-if="!filter" class="absolute right-0 pb-4 border-b-2">
        <a href="#" @click="filter = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-arrow-left-short h-10"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </a>
      </div>
      <div v-if="filter">
        <div class="absolute -top-0 -left-0 rounded-tl-md">
          <a href="#" @click="filter = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-arrow-right-short h-8"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </a>
        </div>
        <div>
          <p class="font-semibold mt-3">Priority filter:</p>
        </div>
        <div class="flex flex-col justify-around h-60">
          <button @click="filterAll" :class="allBtn">All</button>
          <button @click="filterHigh" :class="highBtn">High</button>
          <button @click="filterMed" :class="medBtn">Medium</button>
          <button @click="filterLow" :class="lowBtn">Low</button>
          <button @click="filterDone" :class="doneBtn">Done</button>
        </div>
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
          placeholder="Key in description and press Enter to add todos"
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
          <Table :post="post" v-for="(post, index) in todos" :key="post.id" @remove-todo=removeTodo(index) />
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
      doneBtn: "btnCSS",
      item: "",
      priorityLevel: "",
      filter: false,
    };
  },
  components: { Table },
  created() {
    const gettingAllTodos = async () => {
      const gettingAllDocs = await getTodoItem();
      // console.log(gettingAllDocs);
      // const listOfDocs = gettingAllDocs.docs;
      // console.log(listOfDocs);
      gettingAllDocs.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
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
      this.priorityLevel = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
      console.log("Successfully remove item.");
      console.log(this.to);
    },
    filterHigh() {
      if ((this.highBtn = "btnCSS")) {
        this.highBtn = "active";
        this.allBtn = "btnCSS";
        this.medBtn = "btnCSS";
        this.lowBtn = "btnCSS";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          if (todo.priority === "Low" || todo.priority === "Medium" || todo.priority === "Done") {
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
        this.doneBtn = "btnCSS";
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
        this.doneBtn = "btnCSS";
        this.lowBtn = "btnCSS";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          if (todo.priority === "High" || todo.priority === "Low" || todo.priority === "Done") {
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
        this.doneBtn = "btnCSS";
        this.lowBtn = "active";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          if (
            todo.priority === "Medium" ||
            todo.priority === "High" ||
            todo.priority === "Done"
          ) {
            todo.lineItem += " " + "hidden";
          } else {
            todo.lineItem = "border-t-2";
          }
        }
      }
    },
    filterDone() {
      if ((this.doneBtn = "btnCSS")) {
        this.highBtn = "btnCSS";
        this.allBtn = "btnCSS";
        this.medBtn = "btnCSS";
        this.lowBtn = "btnCSS";
        this.doneBtn = "active";
        for (let i = 0; i < this.todos.length; i++) {
          const todo = this.todos[i];
          if (
            todo.priority === "Medium" ||
            todo.priority === "High" ||
            todo.priority === "Low"
          ) {
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
