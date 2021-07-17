<template>
  <tr :class="post.lineItem">
    <td class="w-2/12 py-4">{{ post.date }}</td>
    <td class="w-6/12 break-words py-4">{{ post.description }}</td>
    <td class="w-3/12 py-4">{{ post.priority }}</td>
    <td class="w-1/12">
      <button @click="deleteTodo" class="deleteBtn">Delete</button>
      <p class="hidden">{{ post.id }}</p>
    </td>
  </tr>
</template>

<script>
import { deleteTodo } from "../firebase/firebase";
export default {
  name: "Table",
  props: ["post"],
  methods: {
    async deleteTodo() {
      const del = await deleteTodo(String(this.post.id));
      console.log(del);
      console.log("successfully deleted");
      location.reload();
    },
  },
};
</script>

<style scoped></style>
