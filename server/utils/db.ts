import sqlite3 from 'sqlite3'
import { resolve } from 'path'

export async function initializeDB() {
  const config = useRuntimeConfig()
  const dbPath = resolve(config.sqliteFile) // абсолютный путь
  const db = new sqlite3.Database(dbPath)

  // Используем промисы для удобства
  const run = (sql: string, params?: any) =>
    new Promise<void>((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err)
        else resolve()
      })
    })

  const get = (sql: string, params?: any) =>
    new Promise<any[]>((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })

  try {
    // Создаём таблицу, если её нет
    await run(`
      CREATE TABLE IF NOT EXISTS typical_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_name TEXT NOT NULL,
        category TEXT NOT NULL,
        time_estimate REAL DEFAULT 0.0
      )
    `)

    // Проверяем, есть ли уже данные
    const existing = await get('SELECT COUNT(*) as count FROM typical_tasks')
    if (existing[0].count === 0) {
      // Заполняем начальными данными
      const defaultTasks = [
        { task_name: 'Обновить WordPress', category: 'Техподдержка', time_estimate: 30 },
        { task_name: 'SEO-аналитика', category: 'SEO', time_estimate: 60 },
        { task_name: 'Перенос сайта', category: 'Техподдержка', time_estimate: 120 },
      ]

      for (const task of defaultTasks) {
        await run(
          'INSERT INTO typical_tasks (task_name, category, time_estimate) VALUES (?, ?, ?)',
          [task.task_name, task.category, task.time_estimate]
        )
      }
      console.log('База данных инициализирована и заполнена тестовыми задачами.')
    }
  } finally {
    db.close() // всегда закрываем соединение
  }
}
