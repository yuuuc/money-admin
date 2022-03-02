import http from '../http/index'

const requestMapping = '/messageFormat'

const MESSAGEFORMATS = requestMapping + '/getMessageFormats'
export function getMessageFormats() {
	return http.get(MESSAGEFORMATS, {})
}

const UPDATEMESSAGEFORMAT = requestMapping + '/updateMessageFormats'
export function postUpdateMessageFormats(data) {
	return http.post(UPDATEMESSAGEFORMAT, data)
}

const INSERTMESSAGEFORMAT = requestMapping + '/insertMessageFormat'
export function postInsertMessageFormat(data) {
	return http.post(INSERTMESSAGEFORMAT, data)
}

const DELETEONEMESSAGEFORMAT = requestMapping + '/deleteMessageFormat'
export function postDeleteOneMessageFormat(data) {
	return http.post(DELETEONEMESSAGEFORMAT, data)
}
