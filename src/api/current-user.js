export const getCurrentUser =() =>{
    return JSON.parse(localStorage.getItem('user') ?? '{}')
}

export const setCurrentUserDetails =user =>{
    localStorage.setItem('user', JSON.stringify(user))
}