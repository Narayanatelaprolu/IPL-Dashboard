// Write your code here
import './index.css'
import {Component} from 'react'

class MatchCard extends Component {
  render() {
    const {matchDate} = this.props
    const {result, competingTeam, competingTeamLogo, matchStatus} = matchDate
    return (
      <li className={`match-card ${matchStatus}`}
        <img
          className="match-card-logo"
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
        />
        <p className="match-card-name">{competingTeam}</p>
        <p className="match-card-result">{result}</p>
        <p className="match-status">{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
