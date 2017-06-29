/**
 * Created by hongjiayong on 2017/6/13.
 */
import fetch from './getData'

// Users
var getUsers = () => fetch('GET', '/api/users', {})

var getUserInfo = (id) => fetch('GET', '/api/users/' + id, {})

var deleteUser = (id) => fetch('DELETE', '/api/users/' + id, {})

var editUser = (id, username, password) => fetch('PUT', '/api/users/' + id, {id: id, username: username, password: password})

var addUser = (id, username, password) => fetch('POST', '/api/users', {id: id, username: username, password: password})

var checkUser = (id, password) => fetch('GET', '/check', {userid: id, pwd: password})

// Device
var getAllDevice = () => fetch('GET', '/api/devices', {})

var getDeviceInfo = (id) => fetch('GET', '/api/devices/' + id, {})

var editDevice = (id, data) => fetch('PUT', '/api/devices/' + id, data)

var addDevice = (data) => fetch('POST', '/api/devices', data)

var deleteDevice = (id) => fetch('DELETE', '/api/devices/' + id, {})

// Device and User
var getAllRelationship = () => fetch('GET', '/api/device_user', {})

var addRelationship = (d_id, u_id) => fetch('POST', '/api/device_user', {device_id: d_id, user_id: u_id})

var deleteRelationship = (d_id, u_id) => fetch('GET', '/api/device_user/delete', {dev_id: d_id, user_id: u_id})

var getUsersDevice = (u_id) => fetch('GET', '/api/device_user/get_device', {user_id: u_id})

var getDeviceUsers = (d_id) => fetch('GET', '/api/device_user/get_user', {device_id: d_id})

// History
var getAllHistory = () => fetch('GET', '/api/histories', {})

var addHistory = (d_id, u_id, t) =>fetch('POST', '/api/histories', {device_id: d_id, user_id: u_id, type: t})

var getUserHistory = (id) => fetch('GET', '/api/histories/get_his_user', {user_id: id})

var getDeviceHistory = (id) => fetch('GET', '/api/histories/get_his_dev', {dev_id: id})

var getRecommendations = (type) => fetch('GET', '/api/user/recommend', {type: type})

export {
  getUsers, deleteUser, getUserInfo, editUser, addUser, checkUser,
  addDevice, getAllDevice, editDevice, deleteDevice, getDeviceInfo,
  getAllRelationship, addRelationship, deleteRelationship, getUsersDevice, getDeviceUsers,
  getAllHistory, addHistory, getUserHistory, getDeviceHistory,
  getRecommendations
}
