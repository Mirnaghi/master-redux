const deepFreeze = require("deep-freeze");
const expect = require("expect");

const todo = (state = {}, action) => {
    switch(action.type){
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                important: false
            };
            break;
        case 'TOGGLE_TODO':
            return {
                ...state,
                important: !state.important
            }    
            break;
        default:
            return state;
            break;    
    }
}

const todosReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [...state, todo(undefined, action)];
            break;
        case 'TOGGLE_TODO':
            return state.map(t => t.id === action.id ? todo(t, action) : t);
            break;    
        default:
            return state;
            break;    
    }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return state = action.filter;
            break;
        default:
            return state;
            break;    
    }
}

const testAddTodo = () => {
    const beforeState = [];
    
    const action = {
        type: 'ADD_TODO',
        id: 1,
        text: 'test todo reducer' 
    };
    
    const afterState = [
        {
            id: 1,
            text: 'test todo reducer',
            important: false  
        }
    ] 


    deepFreeze(beforeState);
    deepFreeze(action);

    expect(
        todosReducer(beforeState, action)
    ).toEqual(afterState);

    console.log(todosReducer(beforeState, action));
}

testAddTodo();
console.log('Reducer test passed');


const testToggleTodo = () => {
    const beforeState = [
        {
            id: 0,
            text: 'test todo reducer',
            important: false  
        },
        {
            id: 1,
            text: 'test toggle todo',
            important: false  
        },
    ];
    
    const action = {
        type: 'TOGGLE_TODO',
        id: 1, 
    };
    
    const afterState = [
        {
            id: 0,
            text: 'test todo reducer',
            important: false  
        },
        {
            id: 1,
            text: 'test toggle todo',
            important: true  
        },
    ] 


    deepFreeze(beforeState);
    deepFreeze(action);

    expect(
        todosReducer(beforeState, action)
    ).toEqual(afterState);

    console.log(todosReducer(beforeState, action));
}

testToggleTodo();
console.log('Toggle todo test passed');