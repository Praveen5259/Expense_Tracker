import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {loggedInName: '', loggedInEmail: ''},
    reducers: {
        saveDetails(state, action) {
            state.loggedInEmail = action.payload.email;
            state.loggedInName = action.payload.name;
        }
    }
})

export default userSlice.reducer
export const {saveDetails} = userSlice.actions