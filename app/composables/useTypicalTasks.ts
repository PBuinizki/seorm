import { storeToRefs } from 'pinia'

export const useTypicalTasks = () => {
  const store = useTypicalTasksStore()
  const { tasks } = storeToRefs(store)
  const isLoading = ref(true)
  const error = ref(null)

  const fetchTasks = async () => {
    isLoading.value = true
    error.value = null
    try {
      const data = await $fetch('/api/tasks')
      store.setTasks(data)
    } catch (err) {
      // @ts-ignore
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  // Загружаем задачи при первом вызове (например, на странице)
  onMounted(() => {
    fetchTasks()
  })

  const createTask = async (task: {
    task_name: string
    category: string
    time_estimate: number
  }) => {
    isLoading.value = true
    error.value = null
    try {
      const newTask = await $fetch('/api/tasks', {
        method: 'POST',
        body: task,
      })
      // Обновляем список задач, загружая свежие данные
      await fetchTasks()
      // Или можно добавить в стор вручную: store.tasks.push(newTask) – но лучше fetch для консистентности
    } catch (err: any) {
      error.value = err.message
      throw err // пробрасываем ошибку, чтобы форма могла её обработать
    } finally {
      isLoading.value = false
    }
  }

  // Загружаем задачи при первом вызове
  onMounted(() => {
    fetchTasks()
  })

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
  }
}
