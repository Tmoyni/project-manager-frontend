import {
    FETCH_PROJECTS,
    FETCH_POSTS,
    TOGGLE_VIEW_PROFILE
} from './actionCreators'

let defaultState = {
    allProjects: [],
    allPosts: [],
    profileSelected: false
}
 

let reducer = (prevState=defaultState, action) => {
    switch(action.type) {
        case TOGGLE_VIEW_PROFILE:
            return { ...prevState, profileSelected: !prevState.profileSelected}
        case FETCH_PROJECTS:
            return { ...prevState, allProjects: action.payload}
        case FETCH_POSTS:
            return { ...prevState, allPosts: action.payload}
        default:
            return { ...prevState }
    }
}


export default reducer