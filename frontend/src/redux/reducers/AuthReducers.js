import {ToastHandler} from "../ToastHandler.js";

import jwt from 'jwt-decode'

var InitState = {
    token: null,
    RegStatus: false,
    LogStatus: false,
    user: "",
    socketId: "",
    notifications: [],
    users: [],
    logics:{}
}

export const UserReg = (state = InitState, action) => {

    switch (action.type) {
        case "USER_REG":
            ToastHandler(action.payload)

            return { ...state, RegStatus: action.payload.status, users: [...state.users, action.payload.user] }
        case "USER_LOG":
            ToastHandler(action.payload)

            var token = action.payload.token
            const { user } = jwt(token)
            return { ...state, token: action.payload.token, LogStatus: action.payload.status, user: user }

        case "USER_LOG_BACK":
            const user2 = jwt(action.payload.token)
            const now = Date.now().valueOf() / 1000

            if (typeof user2.exp !== 'undefined' && user2.exp < now) {
                localStorage.removeItem('token')
                return { ...state, LogStatus: false }
            }
            if (typeof user2.nbf !== 'undefined' && user2.nbf > now) {
                localStorage.removeItem('token')
                return { ...state, LogStatus: false }

            }
            return { ...state, token: action.payload.token, user: user2.user, LogStatus: true }

        case "LOGOUT":
            localStorage.removeItem("token")
            return { ...state, LogStatus: false, token: null, user: {} }
        case "SOCKET_ID":
            return { ...state, socketId: action.payload }
        case "NOTIFICATION":
            return { ...state, notifications: action.payload.notifications }
        case "NEW_NOTIFICATION":
            return { ...state, notifications: [action.payload, ...state.notifications] }
        case "DELETED_ACTIONLOGS":
            ToastHandler(action.payload);
            return { ...state, notifications: action.payload.notifications }
        case "USERS":
            return { ...state, users: action.payload.msg }
        case "USER_DELETE":
            ToastHandler(action.payload)

            const filtered = state.users.filter(u => u._id !== action.payload.user._id)
            return { ...state, users: filtered }
            case "LOGICS":
                return { ...state, logics: action.payload }
        default:
            return state
    }
}



