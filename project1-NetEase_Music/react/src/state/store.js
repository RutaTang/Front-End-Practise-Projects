import {configureStore} from '@reduxjs/toolkit';
import navReducer from './NavSlice';

export default configureStore({
    reducer: {
        nav: navReducer
    }
})

