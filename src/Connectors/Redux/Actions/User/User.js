import { USER_ADD, USER_ALL } from 'Connectors/Redux/Types/User/UserTypes';

export function setUser( user, token) {
    return {
        type: USER_ADD,
        action: {
            user, token
        }
    }
}

export  function setUsers(users) {
    return {
        type: USER_ALL,
        action: users
    }
}
