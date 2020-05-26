import React, { useState } from 'react'
import useField from './hooks'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,useHistory
} from "react-router-dom"

const Notification = ({ message}) => {
  const style = {
    color:'green',
    fontStyle: 'italic',
    fontSize: 16,
    borderStyle: 'solid',  
  }

  if (message === '') {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const Menu = ({ anecdotes, addNew, message }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Notification message={message}/>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2020</i>
      </div>
    </Router>
  )


}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === id)
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>   
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


const CreateNew = (props) => {
  const contentF = useField('text')
  const authorF = useField('text')
  const infoF = useField('text')

  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentF.value,
      author: authorF.value,
      info: infoF.value,
      votes: 0
    })
    history.push('/')
  }

  const emptyFields = (e) => {
     e.preventDefault()
     contentF.onReset()
     authorF.onReset()
     infoF.onReset()
  }



  return (
    <div>
      <h2>create a new anecdote</h2>
      <form  onSubmit={handleSubmit}>
        <div>
          content
          <input  {...contentF} />
        </div>
        <div>
          author
          <input  {...authorF} />
        </div>
        <div>
          url for more info
          <input  {...infoF} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={emptyFields}>reset</button>
      </form>

    </div>
  )

 
}

const App = () => {
  

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log('ANECDOTES ', anecdotes)
    setNotification(`A new anecdote '${anecdote.content}' created! `)
    setTimeout(() => setNotification(''), 10000)
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

    return (
    <div>
      <h1>Software anecdotes</h1>  
      <Menu anecdotes={anecdotes} addNew={addNew} message={notification}/> 
      <Footer />
    </div>
  )

}

export default App;