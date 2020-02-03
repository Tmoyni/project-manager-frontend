import {
    FETCH_PROJECTS,
    FETCH_POSTS,
    VIEW_PROFILE,
    VIEW_PROJECTS,
    TOGGLE_SHOW_NEW_PROJECT,
    SHOW_ADD_POST_FORM
} from './actionCreators'

let defaultState = {
    allProjects: [],
    allPosts: [],
    profileSelected: false,
    showNewProject: false, 
    viewPostDetails: false,
    projectSelected: null

}
 

let reducer = (prevState=defaultState, action) => {
    switch(action.type) {
        case VIEW_PROFILE:
            return { profileSelected: true}
        case VIEW_PROJECTS:
            return { profileSelected: false}
        case SHOW_ADD_POST_FORM:
            return { ...prevState, viewPostDetails: !prevState.viewPostDetails, projectSelected: action.payload.project}    
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