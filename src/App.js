import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import EditorSongs from './components/EditorSongs'
import NewReleaseSongs from './components/NewReleaseSongs'
import GenereMoodsItemsList from './components/GeneralMoodsSongs'
import YourMusic from './components/YourMusic'
import PlayLists from './components/PlayLists'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/editor/:id" component={EditorSongs} />
      <ProtectedRoute exact path="/new/:id" component={NewReleaseSongs} />
      <ProtectedRoute exact path="/playList" component={PlayLists} />
      <ProtectedRoute
        exact
        path="/generes/:id"
        component={GenereMoodsItemsList}
      />
      <ProtectedRoute exact path="/yourmusic" component={YourMusic} />
    </Switch>
  </BrowserRouter>
)

export default App
