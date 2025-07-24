import { deleteUser, getUsers, updateUser } from '@app/controllers/usersController'
import express from 'express'

const user = express.Router()

user.get('/', getUsers)
user.post('/update', updateUser)
user.delete('/delete', deleteUser)

export default user;