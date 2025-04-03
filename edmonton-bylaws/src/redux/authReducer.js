import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user')) || {
  _id: "",
  firstName: "",
  lastName: "",
  email: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState: savedUser,
    reducers: {
        updateUser: (state,action) => {
          const updatedUser = {
            _id: action.payload._id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
          };
    
          // Save updated user to localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));

          return updatedUser;
        },
    }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;