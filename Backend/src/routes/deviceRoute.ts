import { createDevices, deleteDevice, getDeviceById, getDevices, updateDevice } from '@app/controllers/deviceController'

import express from 'express'

const device = express.Router()
//configure the routes for this
device.get('/', getDevices)
device.get('/:id', getDeviceById)
device.post('/create', createDevices)
device.put('/:id', updateDevice)
device.delete('/:id', deleteDevice)


export default device