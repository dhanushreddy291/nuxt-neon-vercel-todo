<template>
  <div class="container">
    <h1>Todo List</h1>
    <p>
      A Nuxt.js app with a serverless Postgres database from Neon, deployed on Vercel with
      automated database branching.
    </p>
    <form @submit.prevent="addTodo">
      <input v-model="newTodoText" placeholder="Add a new todo item" required />
      <button type="submit">Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ completed: todo.completed }" @click="toggleTodo(todo)">
          {{ todo.text }}
        </span>
        <button class="remove-btn" @click="removeTodo(todo)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: todos, refresh } = await useFetch('/api/todos');
const newTodoText = ref('');

const addTodo = async () => {
  if (!newTodoText.value.trim()) return;
  await $fetch('/api/todos', {
    method: 'POST',
    body: { text: newTodoText.value },
  });
  newTodoText.value = '';
  await refresh();
};

const toggleTodo = async (todo) => {
  await $fetch(`/api/todos/${todo.id}`, {
    method: 'PUT',
    body: { completed: !todo.completed },
  });
  await refresh();
};

const removeTodo = async (todo) => {
  await $fetch(`/api/todos/${todo.id}`, {
    method: 'DELETE',
  });
  await refresh();
};
</script>

<style>
body {
  background-color: #f4f4f9;
  color: #333;
}
.container {
  max-width: 600px;
  margin: 2rem auto;
  font-family: sans-serif;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  color: #000000;
}
p {
  text-align: center;
  margin-bottom: 2rem;
}
form {
  display: flex;
  margin-bottom: 1rem;
}
input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #00b04f;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}
li span {
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
  color: #aaa;
}
.remove-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
