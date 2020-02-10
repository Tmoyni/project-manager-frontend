import {
    FETCH_PROJECTS,
    FETCH_POSTS,
    VIEW_PROFILE,
    VIEW_PROJECTS,
    TOGGLE_SHOW_NEW_PROJECT,
    SHOW_ADD_POST_FORM, 
    VIEW_POST, 
    NEW_POST, 
    NEW_FORM_CANCEL, 
    CLOSE_NEW_PROJECT_FORM,
    CLOSE_NEW_POST_FORM
} from './actionCreators'

let defaultState = {
    allProjects: [],
    allPosts: [],
    profileSelected: false,
    showNewProject: false, 
    viewPostDetails: false,
    projectSelected: null, 
    postToEdit: null,
    postSelected: null, 
    viewPostSelected: false, 
    newPost: false
}
 

let reducer = (prevState=defaultState, action) => {
    switch(action.type) {
        case VIEW_PROFILE:
            return { profileSelected: true}
        case VIEW_PROJECTS:
            return { profileSelected: false}
        case SHOW_ADD_POST_FORM:
            return { ...prevState, viewPostDetails: true, projectSelected: action.payload.project}    
        case TOGGLE_SHOW_NEW_PROJECT:
            return { ...prevState, showNewProject: !prevState.showNewProject}
        case FETCH_PROJECTS:
            return { ...prevState, allProjects: action.payload}
        case VIEW_POST:
            return { ...prevState, viewPostSelected: true, newPost: false, postSelected: action.payload.post}    
        case FETCH_POSTS:
            return { ...prevState, allPosts: action.payload}
        case NEW_POST:
            return { ...prevState, viewPostDetails: false, newPost: true,  projectSelected: action.payload.project}
        case NEW_FORM_CANCEL:
            return { ...prevState, newPost: false}
        case CLOSE_NEW_PROJECT_FORM:
            return { ...prevState, showNewProject: false}
        case CLOSE_NEW_POST_FORM:
            return { ...prevState, newPost: false}
        
        default:
            return { ...prevState }
    }
}


export default reducer