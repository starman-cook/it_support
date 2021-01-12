import { ADD_COMMENT } from "./ApplicationPageActionTypes";

const initialState = {
    departments: ["main dep", "office dep", "some other dep"],
    comments: []
};

const ApplicationPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {...state, comments: [...state.comments, action.value]}
        default:
            return state;
    }
};

export default ApplicationPageReducer;