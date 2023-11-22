import { createSlice } from '@reduxjs/toolkit'
// {
//     "id": 1,
//     "password": "abcd1234",
//     "username": "김데베",
//     "user_type": 1,
//     "email": "kw_db@kw.ac.kr",
//     "phone_number": "1.012345678E9",
//     "weight": 50,
//     "age": 20,
//     "last_accessed_at": null,
//     "total_money": 50000
// }

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        password: null,
        username: null,
        user_type: null,
        email: null,
        phone_number: null,
        weight: null,
        age: null,
        last_accessed_at: null,
        total_money: null
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.password = action.payload.password
            state.username = action.payload.username
            state.user_type = action.payload.user_type
            state.email = action.payload.email
            state.phone_number = action.payload.phone_number
            state.weight = action.payload.weight
            state.age = action.payload.age
            state.last_accessed_at = action.payload.last_accessed_at
            state.total_money = action.payload.total_money
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setUserType: (state, action) => {
            state.user_type = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPhoneNumber: (state, action) => {
            state.phone_number = action.payload
        },
        setWeight: (state, action) => {
            state.weight = action.payload
        },
        setAge: (state, action) => {
            state.age = action.payload
        },
        setLastAccessedAt: (state, action) => {
            state.last_accessed_at = action.payload
        },
        setTotalMoney: (state, action) => {
            state.total_money = action.payload
        },
    },
})

export const { 
    setUser, 
    setId, 
    setPassword, 
    setUsername, 
    setUserType, 
    setEmail, 
    setPhoneNumber, 
    setWeight, 
    setAge, 
    setLastAccessedAt, 
    setTotalMoney 
} = userSlice.actions
export default userSlice.reducer