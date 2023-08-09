import express from 'express'
import * as controller from '../controller/Cuser.js'
const router = express.Router()

router.get('/', controller.getUser)

router.get('/signup', controller.getSignup)

router.post('/signup', controller.postSignup)

router.get('/signin', controller.getSignin)

router.post('/signin', controller.postSignin)

router.post('/profile', controller.postProfile)

router.delete('/profile/delete', controller.deleteUser)

router.patch('/profile/patch', controller.patchUser)

export default router
