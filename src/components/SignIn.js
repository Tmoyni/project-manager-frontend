import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class SignIn extends React.Component {

  state = {
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === "trionamoynihan@gmail.com" && this.state.password === "1234") {
      console.log("correct email, correct password")
      this.props.history.push("/")
    }
  }

  render() {

  return (
    <Grid container spacing={1} >
      <Grid item xs={8}>
        <img width="100%" src="https://static.buffer.com/marketing/static/hero/hero-publish@2x.jpg" alt="hero"/>
      </Grid>

      <Grid item xs={4}>
      <Container className="logintext" >
        <CssBaseline />
        <div >
          <h1 className="logo">Post Manager</h1>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.handleSubmit}  noValidate>
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={this.state.email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={this.state.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              Sign In
            </Button>
            
          </form>
        </div>
        </ Container>

      </Grid>


    </Grid>
  );
}
}

export default SignIn