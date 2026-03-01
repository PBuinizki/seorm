// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'], // подключаем Pinia
  runtimeConfig: {
    // Переменные, доступные только на сервере
    sqliteFile: process.env.SQLITE_FILE || './data.db'
  },
  // Если нужен автоимпорт composables из папки composables – он уже работает по умолчанию
})