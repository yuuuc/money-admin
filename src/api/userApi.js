import http from '../http/index'

const requestMapping = '/user'

const GETUSERS = requestMapping + '/getUsers'
export function getUsers(data) {
	return http.get(GETUSERS, { params: data })
}

const GETSEARCH = requestMapping + '/getUsersBySearch'
export function getUserBySearch(data) {
	return http.get(GETSEARCH, { params: data })
}

const NEWUSER = requestMapping + '/newUser'
export function postNewUser(data) {
	return http.post(NEWUSER, data)
}

const DELETEUSER = requestMapping + '/deleteUser'
export function postDeleteUser(data) {
	return http.post(DELETEUSER, data)
}

const UPDATEUSER = requestMapping + '/updateUser'
export function postUpdateUser(data) {
	return http.post(UPDATEUSER, data)
}

const DELETEUSERS = requestMapping + '/deleteUserList'
export function postDeleteUsers(data) {
	return http.post(DELETEUSERS, data)
}
