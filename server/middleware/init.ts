import { initializeDB } from "../utils/db"

export default defineNitroPlugin(async () => {
  await initializeDB()
})