export const FETCH_PROJECTS = "FETCH_PROJECTS"
export const FETCH_POSTS = "FETCH_POSTS"


export const fetchProjects = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/projects')
          .then(res => res.json())
          .then(projects => {
              dispatch ({type: FETCH_PROJECTS, payload: projects })            
          })
    }
}

export const fetchPosts = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/posts')
          .then(res => res.json())
          .then(posts => {
              dispatch ({type: FETCH_POSTS, payload: posts })            
          })
    }
}



