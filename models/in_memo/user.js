let USER_ID_INIT = 1
const users = []
class User {
    constructor(params) {
        if(!params.name || !params.age) {
            throw new Error('age and name required')
        }
        this.name = params.name
        this.age = params.age
        this._id = USER_ID_INIT++
    }

}
async function createNewUser(params) {
    const user = new User(params)
    users.push(user)
    return user
}
async function getUsers() {
    return users
}
async function getUserById(id) {
    return users.find(v => v._id === +id)
}
async function updateUserById({id,newInfo}) {
    let idx = users.findIndex(v => v._id === +id)
    let newUser = {
        ...users[idx],
        ...newInfo
    }
    users.splice(idx,1,newUser)
    return newUser
}
module.exports = {
    model: User,
    createNewUser,
    getUsers,
    getUserById,
    updateUserById
}