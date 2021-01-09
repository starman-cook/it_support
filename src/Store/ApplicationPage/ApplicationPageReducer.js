const initialState = {
    departments: ["main dep", "office dep", "some other dep"]
};

const ApplicationPageReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default ApplicationPageReducer;