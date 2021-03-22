import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (categories, category) => {
    let myCategories = [];

    for(let cat of categories){
        myCategories.push(...cat);
    }
    return myCategories;
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
                state = {
                    ...state,
                    categories: action.payload.categories
                }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
                state = {
                    ...state,
                    loading: true
                }
            break;    
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(state.categories, category);
                state = {
                    ...state,
                    loading: false,
                    categories: updatedCategories
                }
            break;  
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
                state = {
                    ...initState
                }
            break;  
    }
    return state;
}