import 'dotenv/config'
// dotEnv.config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

//imports
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(cors({
    origin: ["http://localhost:5000", "https://popx-auth-app-2xy7.vercel.app"]

}))
app.use(express.json())

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("successfully connected to database")

    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

connectDB()

app.use('/api', userRoutes)

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    return res.json("server is running")
})

app.listen(port, () => {
    console.log(`server running at port ${port}`)
})