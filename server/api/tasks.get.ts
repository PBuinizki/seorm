import sqlite3 from 'sqlite3'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const dbPath = resolve(config.sqliteFile)
  const db = new sqlite3.Database(dbPath)

  // Оборачиваем db.all в промис
  const rows = await new Promise<any[]>((resolve, reject) => {
    db.all('SELECT * FROM typical_tasks', (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })

  db.close()
  return rows
})