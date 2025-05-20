<template>
  <div>
    <h1>User Management</h1>

    <form @submit.prevent="addUser">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const name = ref('')
const email = ref('')

const getUsers = async () => {
  const res = await axios.get('/server/api/users')
  users.value = res.data
}

const addUser = async () => {
  await axios.post('/server/api/users', {
    name: name.value,
    email: email.value
  })
  name.value = ''
  email.value = ''
  getUsers()
}

const deleteUser = async (id) => {
  await axios.delete(`/server/users?id=${id}`)
  getUsers()
}

onMounted(getUsers)
</script>
