export const FETCH_PROJECTS = "FETCH_PROJECTS"
export const FETCH_POSTS = "FETCH_POSTS"
export const VIEW_PROFILE = "VIEW_PROFILE"
export const VIEW_PROJECTS = "VIEW_PROJECTS"
export const TOGGLE_SHOW_NEW_PROJECT = "TOGGLE_SHOW_NEW_PROJECT"
export const VIEW_POST_DETAILS = "VIEW_POST_DETAILS"


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

export const viewPostDetails = () => ({type: VIEW_POST_DETAILS})








