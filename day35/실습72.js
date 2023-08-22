const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const newName = path.basename(file.originalname, ext) + Date.now() + ext
    cb(null, newName)
  },
})

const limits = {
  fileSize: 5 * 1024 * 1024, //5mb
}

const upload = multer({ storage, limits })

app.get('/', (req, res) => {
  res.render('실습72')
})

app.post('/dynamic', upload.array('dynamic'), (req, res) => {
  console.log(req.files)
  res.send(req.files)
})

app.use('*', (req, res) => {
  res.render('404')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
