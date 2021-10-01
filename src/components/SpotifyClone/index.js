import {Component} from 'react'
import Header from '../Header'
import EditorPicks from '../EditorPicks'
import GenereMoods from '../GenereMoods'
import NewRelease from '../NewReleases'
import './index.css'

class SpotifyClone extends Component {
  render() {
    return (
      <div className="bg-cont">
        <div className="side-nav-div">
          <Header />
        </div>
        <div className="main-container">
          <EditorPicks />
          <GenereMoods />
          <NewRelease />
        </div>
      </div>
    )
  }
}

export default SpotifyClone
