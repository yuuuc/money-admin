import http from '../http/index'

const requestMapping = '/account'

const GETLISTBYPAGE = requestMapping + '/getAccounts'
export function getAccounts(data) {
	return http.get(GETLISTBYPAGE, { params: data })
}

const UPDATEACCOUNT = requestMapping + '/updateAccount'
export function postUpdateAccount(data) {
	return http.post(UPDATEACCOUNT, data)
}

const DELETEONE = requestMapping + '/deleteAccount'
export function postDeleteAccountOne(data) {
	return http.post(DELETEONE, data)
}

const DELETEACCOUNTLIST = requestMapping + '/deleteAccountList'
export function postDeleteAccountList(data) {
	return http.post(DELETEACCOUNTLIST, data)
}

const SEARCHACCOUNTBYUSER = requestMapping + '/getAccountsByUser'
export function getSearchAccountByUser(data) {
	return http.get(SEARCHACCOUNTBYUSER, { params: data })
}
