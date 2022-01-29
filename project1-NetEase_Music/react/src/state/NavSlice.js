import {createSlice} from '@reduxjs/toolkit';

export const navSlice = createSlice({
    name: 'nav',
    initialState: {
        current: 0,
    },
    reducers:{
        setCurrent: (state, action) => {
            state.current = action.payload;
        }
    }
});


export const {setCurrent} = navSlice.actions;

export default navSlice.reducer;