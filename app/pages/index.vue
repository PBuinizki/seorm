<script setup>
import { useTypicalTasks } from '~/composables/useTypicalTasks'
const { tasks, isLoading, error, createTask } = useTypicalTasks()

// Состояние для новой задачи
const newTask = reactive({
  task_name: '',
  category: '',
  time_estimate: 30,
})

const handleCreate = async () => {
  try {
    await createTask({ ...newTask })
    // Очистить форму после успеха
    newTask.task_name = ''
    newTask.category = ''
    newTask.time_estimate = 30
  } catch (err) {
    // ошибка уже в error из композабла
  }
}

const totalTime = computed(() => {
  return tasks.value.reduce((acc, task) => acc + task.time_estimate, 0)
})
</script>
<!-- pages/index.vue -->
<template>
  <div>
    <h1>Типовые задачи</h1>

    <!-- Форма добавления -->
    <form @submit.prevent="handleCreate">
      <h3>Добавить задачу</h3>
      <div>
        <label>Название:</label>
        <input v-model="newTask.task_name" required />
      </div>
      <div>
        <label>Категория:</label>
        <input v-model="newTask.category" required />
      </div>
      <div>
        <label>Время (мин):</label>
        <input v-model.number="newTask.time_estimate" type="number" required />
      </div>
      <button type="submit" :disabled="isLoading">Добавить</button>
      <p v-if="error" style="color: red">{{ error }}</p>
    </form>

    <hr />

    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        {{ task.task_name }} ({{ task.category }}, {{ task.time_estimate }} мин.)
      </li>
    </ul>

    <h2>Отчёт</h2>
    <table border="1" cellpadding="5">
      <tbody>
        <tr>
          <td>Всего задач:</td>
          <td>{{ tasks.length }}</td>
        </tr>
        <tr>
          <td>Общая оценка времени:</td>
          <td>{{ totalTime }} мин.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
