import { createSlice } from '@reduxjs/toolkit'

export interface IntialStateTypes {
    authUser: {
        firstName: string,
        lastName: string,
        email: string,
        id?: number
    },
    selectedEmail: {
        id: string
    }
}

const initialState: IntialStateTypes = {
    authUser: {
        firstName: '',
        lastName: '',
        email: ''
    },
    selectedEmail: {
        id: '',
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload
        }
    }
});
export const { setAuthUser, setSelectedEmail } = userSlice.actions
export default userSlice.reducer