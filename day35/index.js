const express = require('express')
const multer = require('multer')
const path = require('path') // 폴더와 파일의 경로를 쉽게 조작하도록 제공
const app = express()
const PORT = 8000

// view engine
app.set('view engine', 'ejs')
// views라는 설정을 다른 폴더로 바꿀 때 쓰는 옵션
// views라는 폴더를 기본으로 사용할 때는 생략인 가능
// app.set('views', './views')

// body-parser
// req.body 즉, post 전송일 때 사용
app.use(express.urlencoded({ extended: true }))
// extended : true를 써야 중첩된 객체 표현을 허용함
// {person: {name: "bobby"}} 이런 식으로 쓸 수 있음
// application/x-www-form-urlencoded
app.use(express.json())
// application/json
// 정적파일 설정
// 서버실행시 http://localhost:8000/uploads/파일명
app.use('/uploads', express.static(__dirname + '/uploads'))

// multer
// diskStorage: 파일 저장 관련 설정 객체
const storage = multer.diskStorage({
  // destination : 저장될 경로를 지정(요청객체, 업로드된 파일객체, 콜백함수)
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  //filename : 파일이름 결정(요청객체, 업로드된 파일객체, 콜백함수)
  filename: (req, file, cb) => {
    // extname : 확장자를 추출
    const ext = path.extname(file.originalname)
    // basename : 파일이름 추출(파일이름, 확장자 -> 확장자를 제외해서 파일이름이 추출)
    const newName = path.basename(file.originalname, ext) + Date.now() + ext
    cb(null, newName)
  },
})

// 파일 크기 제한
const limits = {
  fileSize: 5 * 1024 * 1024, //5mb
}

// key-values에서 key값과 value의 변수가 동일하면 합칠 수 있음
const upload = multer({ storage, limits })

// 싱글 : single()
app.post('/upload', upload.single('userfile'), (req, res) => {
  console.log(req.file)
  res.send(req.body)
})

// 멀티(ver1) : array()
// array() 두 번째 인자로 숫자를 넣으면 그 숫자만큼만 올릴 수 있다
app.post('/upload/array', upload.array('userfiles'), (req, res) => {
  console.log(req.files)
  res.send(req.body)
})

// 멀티(ver2) : fields()
// name 뒤 요소로 maxCount : n 식으로 넣으면 n개만큼만 파일을 올릴 수 있다
app.post(
  '/upload/fields',
  upload.fields([{ name: 'userfile1' }, { name: 'userfile2' }]),
  (req, res, err) => {
    // if (req.files.length > 2) {
    //   console.log(err)
    //   res.status(404).send('오류')
    // }
    console.log(req.files)
    res.send(req.body)
  },
)

// 동적(비동기)
app.post('/dynamic', upload.single('dynamic'), (req, res) => {
  console.log(req.file)
  res.send(req.file)
})

// 페이지를 지정할 때는 미들웨어 use 사용
app.get('/', (req, res) => {
  res.render('index')
})
// use는 http 전송방식을 이해하지 못함
// 같은 url로 get, post를 만들 수 있지만 use로는 접근이 힘듬
// 예를들어 get방식의 "/login"과 post방식의 "/login"은 다른 페이지이지만
// use는 동일한 페이지로 인식
// use는 404에러 페이지일 때 사용

app.use('*', (req, res) => {
  res.render('404')
})

app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`)
})

// const upload = multer({
//     dest: 'uploads/',
//   })
//   // dest : 파일을 업로드하고 그 파일이 저장될 경로를 지정하는 속성
//   // 단점 : 이름을 정할 수 없고 확장자를 불러올 수 없음
