<script setup>
 import { useTypicalTasks } from '~/composables/useTypicalTasks';
    const { tasks, isLoading, error } = useTypicalTasks()
    
    const totalTime = computed(() => {
      return tasks.value.reduce((acc, task) => acc + task.time_estimate, 0)
    })
</script>
<!-- pages/index.vue -->
<template>
  <div>
    <h1>Типовые задачи</h1>
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
      </tr></tbody>
    </table>
  </div>
</template>