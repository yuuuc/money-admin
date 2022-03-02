import http from '../http/index'

const requestMapping = '/accountType'

const GETACCOUNTTYPEALL = requestMapping + '/getAccountTypeAll'
export function getAccountTypes() {
	return http.get(GETACCOUNTTYPEALL)
}

const GETACCOUNTTYPEBYPAGE = requestMapping + '/getAccountTypes'
export function getAccountTypesByPage(data) {
	return http.get(GETACCOUNTTYPEBYPAGE, { params: data })
}

const UPDATEACCOUNTTYPE = requestMapping + '/updateAccountType'
export function postUpdateAccountType(data) {
	return http.post(UPDATEACCOUNTTYPE, data)
}

const INSERTACCOUNTTYPE = requestMapping + '/insertAccountType'
export function postInsertAccountType(data) {
	return http.post(INSERTACCOUNTTYPE, data)
}

const DELETEACCOUNTTYPE = requestMapping + '/deleteAccountType'
export function postDeleteAccountType(data) {
	return http.post(DELETEACCOUNTTYPE, data)
}

const DELETEACCOUNTTYPELIST = requestMapping + '/deleteAccountTypeList'
export function postDeleteAccountTypeByList(data) {
	return http.post(DELETEACCOUNTTYPELIST, data)
}

const GETACCOUNTTYPEBYTITLE = requestMapping + '/getAccountTypeByTitle'
export function getAccountTypeByTitle(data) {
	return http.get(GETACCOUNTTYPEBYTITLE, { params: data })
}
