import {
    FETCH_PROJECTS,
    FETCH_POSTS,
    VIEW_PROFILE,
    VIEW_PROJECTS,
    TOGGLE_SHOW_NEW_PROJECT,
    VIEW_POST_DETAILS
} from './actionCreators'

let defaultState = {
    allProjects: [],
    allPosts: [],
    profileSelected: false,
    showNewProject: false, 
    viewPostDetails: true


}
 

let reducer = (prevState=defaultState, action) => {
    switch(action.type) {
        case VIEW_PROFILE:
            return { profileSelected: true}
        case VIEW_PROJECTS:
            return { profileSelected: false}
        case VIEW_POST_DETAILS:
            return { ...prevState, viewPostDetails: !prevState.viewPostDetails}    
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