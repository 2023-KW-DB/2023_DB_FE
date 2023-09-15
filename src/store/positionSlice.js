import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    startPos: null,
    endPos: null,
}

export const positionSlice = createSlice({
    name: 'position',
    initialState,
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