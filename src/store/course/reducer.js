import {
    // ...existing action types
    ADD_COURSE,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAILURE,
} from './actionTypes';

const initialState = {
    courses: [],
    loading: false,
    error: null
};

const course = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COURSE:
         return {
             //   ...state,
                //loading: true
                
        
            };
        case ADD_COURSE_SUCCESS:
            //const newCourse = {
                // id: action.payload.id,
                // details: [
                    // { fieldName: 'Name', value: action.payload.name },
                    // { fieldName: 'Category', value: action.payload.category },
                    // Include other course details here
                // ]
            //};
            return {
                ...state,
                loading: false,
                error: null,
                courses: [...state.courses, action.payload]
            };
        case ADD_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default course;
