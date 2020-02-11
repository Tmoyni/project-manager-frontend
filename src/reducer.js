import {
    FETCH_PROJECTS,
    FETCH_POSTS,
    SHOW_NEW_PROJECT,
    SHOW_ADD_POST_FORM, 
    VIEW_POST, 
    NEW_POST, 
    NEW_FORM_CANCEL, 
    CLOSE_NEW_PROJECT_FORM,
    CLOSE_NEW_POST_FORM, 
    VIEW_TYPE
} from './actionCreators'

let defaultState = {
    allProjects: [],
    allPosts: [],
    showNewProject: false, 
    viewPostDetails: false,
    projectSelected: null, 
    postToEdit: null,
    postSelected: null, 
    viewPostSelected: false, 
    newPost: false, 
    viewType: "list", 
    viewEditSelection: ""
}
 

let reducer = (prevState=defaultState, action) => {
    switch(action.type) {
        case SHOW_ADD_POST_FORM:
            return { ...prevState, viewPostDetails: true, projectSelected: action.payload.project}    
        case SHOW_NEW_PROJECT:
            return { ...prevState, viewPostSelected: true, viewEditSelection: "newProject"}
        case FETCH_PROJECTS:
            return { ...prevState, allProjects: action.payload}
        case VIEW_POST:
            return { ...prevState, viewPostSelected: true, viewEditSelection: "postDetails", postSelected: action.payload.post}    
        case FETCH_POSTS:
            return { ...prevState, allPosts: action.payload}
        case NEW_POST:
            return { ...prevState, viewPostSelected: true, viewEditSelection: "newPost",  projectSelected: action.payload.project}
        case NEW_FORM_CANCEL:
            return { ...prevState, viewPostSelected: false}
        case CLOSE_NEW_PROJECT_FORM:
            return { ...prevState, viewPostSelected: false}
        case CLOSE_NEW_POST_FORM:
            return { ...prevState, viewPostSelected: false}
        case VIEW_TYPE:
            return { ...prevState, viewType: action.payload.view}    
            
        default:
            return { ...prevState }
    }
}


export default reducer