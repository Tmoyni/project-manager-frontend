import {
    FETCH_PROJECTS,
    FETCH_POSTS
} from './actionCreators'

let defaultState = {
    allProjects: [],
    allPosts: [],
}
 

let reducer = (prevState=defaultState, action) => {
    switch(action.type) {
        case FETCH_PROJECTS:
            return { ...prevState, allProjects: action.payload}
        case FETCH_POSTS:
            return { ...prevState, allPosts: action.payload}
        default:
            return { ...prevState }
    }
}


export default reducer