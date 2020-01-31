import {
    FETCH_PROJECTS,
    FETCH_POSTS,
    TOGGLE_VIEW_PROFILE,
    TOGGLE_SHOW_NEW_PROJECT
} from './actionCreators'

let defaultState = {
    allProjects: [],
    allPosts: [],
    profileSelected: false,
    showNewProject: false

}
 

let reducer = (prevState=defaultState, action) => {
    switch(action.type) {
        case TOGGLE_VIEW_PROFILE:
            return { ...prevState, profileSelected: !prevState.profileSelected}
        case TOGGLE_SHOW_NEW_PROJECT:
            return { ...prevState, showNewProject: !prevState.showNewProject}
        case FETCH_PROJECTS:
            return { ...prevState, allProjects: action.payload}
        case FETCH_POSTS:
            return { ...prevState, allPosts: action.payload}
        default:
            return { ...prevState }
    }
}


export default reducer