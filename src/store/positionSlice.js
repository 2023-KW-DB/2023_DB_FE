import { createSlice } from '@reduxjs/toolkit'


export const positionSlice = createSlice({
    name: 'position',
    initialState: {
        startPos: null,
        endPos: null
    },
    reducers: {
        setStartPos: (state, action) => {
            state.startPos = action.payload
        },
        setEndPos: (state, action) => {
            state.endPos = action.payload
        },
    },
})

export const { setStartPos, setEndPos } = positionSlice.actions
export default positionSlice.reducer