import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from './components/NavBar'
import MoviesAdd from './pages/MovieAdd.jsx'
import MoviesUpdate from './pages/MovieUpdate.jsx'
import MovieList from "./pages/MovieList.jsx";


function App() {

  return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/movies/list" exact component= {MovieList} />
          <Route path="/movies/create" exact component={MoviesAdd} />
          <Route path="/movies/update/:id" exact component={MoviesUpdate}/>
        </Switch>
      </Router>
  )

}



export default App