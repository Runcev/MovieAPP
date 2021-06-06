const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const color = require('colors')
const dotenv = require('dotenv')
const multer = require('multer')

const connectDB = require('./config/db')
const movieRouter = require('./routes/movieRouter')

dotenv.config()

connectDB()
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Server Run!')
})

app.use('/api', movieRouter)


let storage = multer.diskStorage({
     destination: function (req, file, cb) {
         cb(null, 'server/utils') },
     filename: function (req, file, cb) {
        cb(null, 'moviesData.txt'  )
}
})

let upload = multer({ storage: storage }).single('file')


app.post('/upload',  (req,res) =>  {
    console.log(req.file)
    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.file)
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold)
})