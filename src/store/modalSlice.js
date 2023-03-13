import { createSlice } from '@reduxjs/toolkit';


const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShown: false,
    },
    reducers: {
        setModal: (state, action) => {
            state.isShown = action.payload;
        }
    }
});

export const modalActions = modalSlice.actions;

export default modalSlice;