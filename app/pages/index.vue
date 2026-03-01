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
  <!-- Добавил класс task-manager -->
  <div class="task-manager">
    <h1>Типовые задачи</h1>

    <!-- Форма добавления -->
    <form @submit.prevent="handleCreate" class="task-form">
      <h3>Добавить задачу</h3>
      <div class="form-group">
        <label>Название:</label>
        <input v-model="newTask.task_name" required placeholder="Например: Созвон с клиентом" />
      </div>
      <div class="form-group">
        <label>Категория:</label>
        <input v-model="newTask.category" required placeholder="Например: Работа" />
      </div>
      <div class="form-group">
        <label>Время (мин):</label>
        <input v-model.number="newTask.time_estimate" type="number" required min="1" />
      </div>

      <button type="submit" :disabled="isLoading" class="btn-primary">
        {{ isLoading ? 'Добавляю...' : 'Добавить' }}
      </button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>

    <hr class="divider" />

    <div v-if="isLoading" class="loading-state">Загрузка данных...</div>
    <div v-else-if="error" class="error-message">Ошибка: {{ error }}</div>

    <ul v-else class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <span class="task-name">{{ task.task_name }}</span>
        <span class="task-meta">
          <span class="badge">{{ task.category }}</span>
          <span class="time">{{ task.time_estimate }} мин.</span>
        </span>
      </li>
    </ul>

    <div class="report-section">
      <h2>Отчёт</h2>
      <table class="report-table">
        <tbody>
          <tr>
            <td>Всего задач:</td>
            <td>{{ tasks.length }}</td>
          </tr>
          <tr>
            <td>Общая оценка времени:</td>
            <td class="highlight">{{ totalTime }} мин.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style src="~/assets/scss/pages/index.scss"></style>
