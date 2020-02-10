export const FETCH_PROJECTS = "FETCH_PROJECTS"
export const FETCH_POSTS = "FETCH_POSTS"
export const VIEW_PROFILE = "VIEW_PROFILE"
export const VIEW_PROJECTS = "VIEW_PROJECTS"
export const TOGGLE_SHOW_NEW_PROJECT = "TOGGLE_SHOW_NEW_PROJECT"
export const SHOW_ADD_POST_FORM = "SHOW_ADD_POST_FORM"
export const VIEW_POST = "VIEW_POST"
export const NEW_POST = "NEW_POST"
export const NEW_FORM_CANCEL = "NEW_FORM_CANCEL"
export const CLOSE_NEW_PROJECT_FORM = "CLOSE_NEW_PROJECT_FORM"
export const CLOSE_NEW_POST_FORM = "CLOSE_NEW_POST_FORM"


export const fetchProjects = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/projects')
          .then(res => res.json())
          .then(projects => {
              dispatch ({type: FETCH_PROJECTS, payload: projects.data })            
          })
    }
}


export const fetchPosts = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/posts')
          .then(res => res.json())
          .then(posts => {
              dispatch ({type: FETCH_POSTS, payload: posts.data })            
          })
    }
}


export const viewProfile = () => ({type: VIEW_PROFILE})

export const viewProjects = () => ({type: VIEW_PROJECTS})

export const toggleShowNewProject = () => ({type: TOGGLE_SHOW_NEW_PROJECT})

export const showAddPostForm = (project) => ({type: SHOW_ADD_POST_FORM, payload: {project} })

export const handleViewPost = (post) => ({type: VIEW_POST, payload: {post} })

export const handleNewPost = (project) => ({type: NEW_POST, payload: {project} })

export const handleNewFormCancel = () => ({type: NEW_FORM_CANCEL})

export const closeNewProjectForm = () => ({type: CLOSE_NEW_PROJECT_FORM})

export const closeNewPostForm = () => ({type: CLOSE_NEW_POST_FORM})









