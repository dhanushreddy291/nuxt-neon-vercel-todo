<template>
  <div class="container">
    <h1>Todo List</h1>
    <p>
      A Nuxt.js app with a serverless Postgres database from Neon, deployed on Vercel with
      automated database branching.
    </p>
    <form @submit.prevent="addTodo">
      <div class="form-row">
        <input v-model="newTodoText" placeholder="Add a new todo item" required />
        <select v-model="newTodoPriority" class="priority-select">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit">Add Todo</button>
      </div>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id" :class="`priority-${todo.priority}`">
        <div class="todo-content">
          <span :class="{ completed: todo.completed }" @click="toggleTodo(todo)">
            {{ todo.text }}
          </span>
          <span class="priority-badge" :class="`priority-${todo.priority}`">
            {{ todo.priority }}
          </span>
        </div>
        <button class="remove-btn" @click="removeTodo(todo)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: todos, refresh } = await useFetch('/api/todos');
const newTodoText = ref('');
const newTodoPriority = ref('medium');

const addTodo = async () => {
  if (!newTodoText.value.trim()) return;
  await $fetch('/api/todos', {
    method: 'POST',
    body: {
      text: newTodoText.value,
      priority: newTodoPriority.value,
    },
  });
  newTodoText.value = '';
  newTodoPriority.value = 'medium';
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
  margin-bottom: 1rem;
}
.form-row {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}
input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.priority-select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  min-width: 140px;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #00b04f;
  color: white;
  border-radius: 4px;
  cursor: pointer;
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
  border-left: 4px solid #ddd;
}
li.priority-high {
  border-left-color: #ff4444;
}
li.priority-medium {
  border-left-color: #ffaa00;
}
li.priority-low {
  border-left-color: #44ff44;
}
.todo-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-grow: 1;
}
li span {
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
  color: #aaa;
}
.priority-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: default !important;
}
.priority-badge.priority-high {
  background-color: #ffe6e6;
  color: #cc0000;
}
.priority-badge.priority-medium {
  background-color: #fff3e0;
  color: #e65100;
}
.priority-badge.priority-low {
  background-color: #e8f5e8;
  color: #2e7d32;
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