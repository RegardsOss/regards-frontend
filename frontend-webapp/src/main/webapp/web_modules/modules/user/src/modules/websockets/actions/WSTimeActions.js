import * as SockJS from 'sockjs-client'

// Backend websocket connection endpoint
export const TIME_WS_API = 'http://localhost:8080/wsconnect'

// Action to update time in store
export const SET_TIME = 'SET_TIME'
export function setTime(time) {
  return {
    type: SET_TIME,
    time,
  }
}

// Asynchrone action to update time from websocket server
export function connectTime() {
  return function (dispatch, getState) {
    // Connect to websocket server
    const url = `${TIME_WS_API}?access_token=${getState().common.authentication.user.access_token}`
    const socket = new SockJS(url)

    // TODO : Replace stompjs lib
    socket.onclose = () => console.log('WebSocket closed')
    return socket
  }
}

// Dysconnect from the websocket server
export function disconnectTime(client) {
  return function (dispatch, getState) {
    client.close()
  }
}
