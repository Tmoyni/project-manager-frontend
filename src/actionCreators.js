export const FETCH_PROJECTS = "FETCH_PROJECTS"
export const FETCH_POSTS = "FETCH_POSTS"
export const TOGGLE_VIEW_PROFILE = "TOGGLE_VIEW_PROFILE"
export const TOGGLE_SHOW_NEW_PROJECT = "TOGGLE_SHOW_NEW_PROJECT"


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

export const toggleViewProfile = () => ({type: TOGGLE_VIEW_PROFILE})

export const toggleShowNewProject = () => ({type: TOGGLE_SHOW_NEW_PROJECT})






