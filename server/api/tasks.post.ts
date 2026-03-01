import sqlite3 from 'sqlite3'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { task_name, category, time_estimate } = body

  // Простейшая валидация
  if (!task_name || !category || !time_estimate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  const config = useRuntimeConfig()
  const dbPath = resolve(config.sqliteFile)
  const db = new sqlite3.Database(dbPath)

  // Вставка данных
  const result = await new Promise<{ id: number }>((resolve, reject) => {
    db.run(
      'INSERT INTO typical_tasks (task_name, category, time_estimate) VALUES (?, ?, ?)',
      [task_name, category, time_estimate],
      function (err) {
        if (err) reject(err)
        else resolve({ id: this.lastID })
      }
    )
  })

  db.close()
  return { id: result.id, ...body }
})
