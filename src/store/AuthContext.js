import {legacy_createStore as createStore} from 'redux';

const addData = (state = {data:[]}, action) => {
    if(action.type ==="add"){
        return {
            data: action.data
        }
    }
    return state;
}

const store = createStore(addData);

export default store;

