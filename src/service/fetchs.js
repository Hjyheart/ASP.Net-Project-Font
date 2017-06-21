/**
 * Created by hongjiayong on 2017/6/13.
 */
import fetch from './getData'

var getUsers = () => fetch('GET', '/api/user', {})

var addDevice = (data) =>  fetch('POST', '/api/add', data)

var editDevice = (data) => fetch('POST', '/api/edit', data)

var getAllDevice = () => fetch('GET', '/api/getAll', {})

var getDeviceById = (id) => fetch('GET', '/api/getDeviceById', {id: id})

export {getUsers, addDevice, getAllDevice, getDeviceById, editDevice}
