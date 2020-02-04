import React from 'react';
import PostCard from './PostCard'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  
  export default function SinglePostPreview(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(open);
    };

    return (
      <div>
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <PostCard post={props.postToPreview} />
        </Backdrop>
      </div>
    );
  }

// class SinglePostPreview extends React.Component {
//     render() {
//         console.log(this.props)
//         return(
//             <div>

//                 <h1>preview for {t}</h1>
//                 <PostCard/>

//             </div>
//         )
//     }
// }

// export default SinglePostPreview