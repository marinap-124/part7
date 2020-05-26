import React, { useEffect } from 'react'
import { retrieveToken } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Users from './components/Users'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import UserView from './components/UserView'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReduc)

  useEffect(() => {
    dispatch(retrieveToken())
  },[dispatch])

  const padding = {
    paddingRight: 5
  }
  return (

    <div className="container">

      <Notification />

      {(user === null || user === undefined) ?
        <LoginForm /> :
        <div>

          <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/blogs">Blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">Users</Link>
                  </Nav.Link>
                  {/* <Nav.Link href="#" as="span">
                    <Link style={padding} to="/login">Login</Link>
                  </Nav.Link> */}
                  <Nav.Link href="#" as="span">
                    {/* <Link style={padding} to="/logout">Logout</Link> */}
                    <LogoutForm />
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <div><span> {user.name} logged in  </span></div>
                  </Nav.Link>

                </Nav>
              </Navbar.Collapse>
            </Navbar>






            {/* <div className='inOneRow'>
              <Link style={padding} to="/">Home</Link>
              <Link style={padding} to="/blogs">Blogs</Link>
              <Link style={padding} to="/users">Users</Link>
              {user.name} logged in &nbsp; <LogoutForm />
            </div> */}

            <h2>blog app</h2>

            <Switch>
              <Route path="/users/:id">
                <UserView />
              </Route>
              <Route path="/blogs/:id">
                <Blog />
              </Route>

              <Route path="/users">
                <Users />
              </Route>

              <Route path="/blogs">
                <Blogs user={user} />
              </Route>

              <Route path="/logout">
                <LogoutForm />
              </Route>

              <Route path="/">

              </Route>
            </Switch>



          </Router>
        </div>
      }
    </div>

  )
}

export default App