const express = require('express')
const controller = require('../controller/Cvisitor')
const router = express.Router()

//방명록 전체보이기
router.get('/', controller.getVisitors)

//방명록 하나 조회
router.get('/get', controller.getVisitor)

//방명록 하나 생성
router.post('/write', controller.postVisitor)

//방명록 하나 수정
router.patch('/edit', controller.patchVisitor)

//방명록 하나 삭제
router.delete('/delete', controller.deleteVisitor)

module.exports = router
