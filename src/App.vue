<template>
  <div>
    <div class="headerContainer">
      <h1 class="header">To Do List:</h1>
    </div>
    <div class="todosBody">
      <input class="inputContainer" type="text" name="todoItem" placeholder="Press Enter to add todos" v-model="item" @keypress.enter="addTodo">
      <ul class="listContainer">
        <li @click="deleteTodo" class="border-b-2 py-4 rounded-b-xl" v-for="todo, index in todos" :key="index" :data-link="index">{{ todo }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: ["testing", "lorem", "lorem"]
      } 
  },
  components: {
    
  },
  methods: {
    addTodo() {
      this.todos.push(this.item)
      console.log(todos);
      this.item = ""
    },
    deleteTodo() {
      this.todos.pop(this.todos[this.index])
      console.log(todos);
    }
  }
}

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>

</style>
