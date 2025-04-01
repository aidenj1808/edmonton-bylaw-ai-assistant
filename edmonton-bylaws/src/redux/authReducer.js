import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      _id: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    reducers: {
        updateUser: (state,action) => {
            return {
                ...state,
                _id: action.payload._id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
              };
            /* console.log("HERE");
            console.log(action.payload._id);
            state._id = action.payload._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email; */
        },
    }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;