<template>
  <tr :class="post.lineItem">
    <td class="w-2/12 py-4">{{ post.date }}</td>
    <td class="w-6/12 break-words py-4">
      <p v-if="!edit">{{ post.description }}</p>
      <input
        class="border-2 text-center rounded-md"
        v-else
        type="text"
        v-model="post.description"
        autofocus
      />
    </td>
    <td class="w-3/12 py-4">{{ post.priority }}</td>
    <td class="w-1/12">
      <button @click="edit = true" class="editBtn" v-if="!edit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-pencil-fill h-5"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
          />
        </svg>
      </button>
      <button v-if="edit" @click="updateTodo" class="editBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-check-circle-fill h-5"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        </svg>
      </button>
      <button @click="deleteTodo" class="deleteBtn">
        <svg
          v-if="post.priority === 'Done'"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-trash-fill h-5"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-check h-5"
          viewBox="0 0 16 16"
        >
          <path
            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
          />
        </svg>
      </button>
    </td>
  </tr>
</template>

<script>
import {
  deleteTodo,
  updateStatus,
  updateTodoDescription,
} from "../firebase/firebase";
export default {
  name: "Table",
  props: ["post"],
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    async deleteTodo() {
      if (this.post.priority === "Done") {
        const del = await deleteTodo(String(this.post.id));
        console.log(del);
        this.$emit("remove-todo");
        console.log("successfully deleted");
        // location.reload();
      } else {
        const update = await updateStatus(String(this.post.id), "Done");
        this.post.priority = "Done";
        console.log(update);
        console.log("The item is marked done.");
      }
    },
    async updateTodo() {
      const updateDescription = await updateTodoDescription(
        this.post.id,
        this.post.description
      );
      this.post.description = this.post.description;
      this.edit = false;
      console.log("Successfully updated todos");
      console.log(
        "New description for ",
        this.post.id,
        " is ",
        this.post.description
      );
    },
  },
};
</script>

<style scoped></style>
