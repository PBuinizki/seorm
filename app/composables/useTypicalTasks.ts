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
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  // Загружаем задачи при первом вызове (например, на странице)
  onMounted(() => {
    fetchTasks()
  })

  // Возвращаем данные и функцию для повторной загрузки
  return {
    tasks,
    isLoading,
    error,
    refresh: fetchTasks
  }
}