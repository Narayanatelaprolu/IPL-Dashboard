// Write your code here
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import TeamCard from '../TeamCard'

class Home extends Component {
  /** the state method saves data obtained from url https://apis.ccbp.in/ipl */
  state = {
    teamDate: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamList()
  }

  getTeamList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchDate = await response.json()
    const updatedDate = fetchDate.teams.map(eachDate => ({
      name: eachDate.name, 
      imageUrl: eachDate.team_image_Url,
      id: eachDate.id,
    }))
    this.setState({teamsDate: updatedDate, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamsDate} = this.state
    return(
      <ul className="team-list-items">
        {teamsDate.map(team => (
          <TeamCard key={team.id} teamDate={team} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="Loader" className="loader-container">
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return(
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home