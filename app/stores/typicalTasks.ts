import { defineStore } from 'pinia'

export const useTypicalTasksStore = defineStore('typicalTasks', {
  state: () => ({
    tasks: [] as Array<{
      id: number
      task_name: string
      category: string
      time_estimate: number
    }>,
  }),
  actions: {
    setTasks(tasks) {
      this.tasks = tasks
    },
  },
})
