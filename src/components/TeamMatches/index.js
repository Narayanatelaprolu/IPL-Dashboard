// Write your code here
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    matchesDate: []
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedDate = await response.json()
    const updatedDate = {
      teamBannerUrl: fetchedDate.team_banner_url,
      latestMatchDetails: {
        id: fetchedDate.latest_match_details.id,
        competingTeam: fetchedDate.latest_match_details.Component_team,
        competingTeamLogo: fetchedDate.latest_match_details.competing_Team_logo,
        date: fetchedDate.latest_match_date,
        firstInnings: fetchedDate.latest_match_details.first_innings,
        manOfTheMatch: fetchedDate.latest_match_details.man_of_the_match,
        matchStatus: fetchedDate.latest_match_details.match_status,
        result: fetchedDate.latest_match_details.result,
        secondInnings: fetchedDate.latest_match_details.second_innings,
        umpires: fetchedDate.latest_match_details.umpires
        venue: fetchedDate.latest_match_details.venue,
      },
      recentMatches: fetchedDate.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.component_team_logo,
        firstInning: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }
    this.setState({matchesDate: updatedDate, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchesDate} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchesDate
    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {matchesDate} this.state
    const {recentMatches} = matchesDate
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchDate={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    <div testid="loader" className="loader-container">
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`app-team-matches-container ${id}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches


