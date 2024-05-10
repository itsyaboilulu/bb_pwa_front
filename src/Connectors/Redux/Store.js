import { createStore } from '@reduxjs/toolkit'
import Reducers from './Reducers/Reducer'

const reducer = Reducers;
const persistedState = localStorage.getItem('reduxState') 
                            ? JSON.parse(localStorage.getItem('reduxState'))
                            : {};

const store = createStore(reducer, persistedState);

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store