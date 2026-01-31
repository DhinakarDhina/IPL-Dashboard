import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
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
    const data = await response.json()

    Promise.resolve().then(() => {
      const updatedData = {
        teamBannerUrl: data.team_banner_url,
        latestMatchDetails: this.getUpdatedLatestMatchDetails(
          data.latest_match_details,
        ),
        recentMatches: data.recent_matches.map(eachMatch =>
          this.getUpdatedMatchDetails(eachMatch),
        ),
      }
      this.setState({teamMatchesData: updatedData, isLoading: false})
    })
  }

  getUpdatedLatestMatchDetails = latestMatchDetails => ({
    umpires: latestMatchDetails.umpires,
    result: latestMatchDetails.result,
    manOfTheMatch: latestMatchDetails.man_of_the_match,
    id: latestMatchDetails.id,
    date: latestMatchDetails.date,
    venue: latestMatchDetails.venue,
    competingTeam: latestMatchDetails.competing_team,
    competingTeamLogo: latestMatchDetails.competing_team_logo,
    firstInnings: latestMatchDetails.first_innings,
    secondInnings: latestMatchDetails.second_innings,
    matchStatus: latestMatchDetails.match_status,
  })

  getUpdatedMatchDetails = matchDetails => ({
    umpires: matchDetails.umpires,
    result: matchDetails.result,
    manOfTheMatch: matchDetails.man_of_the_match,
    id: matchDetails.id,
    date: matchDetails.date,
    venue: matchDetails.venue,
    competingTeam: matchDetails.competing_team,
    competingTeamLogo: matchDetails.competing_team_logo,
    firstInnings: matchDetails.first_innings,
    secondInnings: matchDetails.second_innings,
    matchStatus: matchDetails.match_status,
  })

  renderLatestMatch = () => {
    const {
      teamMatchesData: {latestMatchDetails},
    } = this.state
    return <LatestMatch latestMatchDetails={latestMatchDetails} />
  }

  renderMatchCardsList = () => {
    const {
      teamMatchesData: {recentMatches},
    } = this.state
    return (
      <ul className="match-cards-list">
        {recentMatches.map(match => (
          <MatchCard matchDetails={match} key={match.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getTeamBackgroundColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const teamGradients = {
      RCB: 'linear-gradient(to bottom, #1e293b, #a4261d)',
      KKR: 'linear-gradient(to bottom, #5755a7, #d91c1f)',
      MI: 'linear-gradient(to bottom, #f7db00, #002d72)',
      CSK: 'linear-gradient(to bottom, #f26d22, #da237b)',
      SRH: 'linear-gradient(to bottom, #13418b, #f26d22)',
      RR: 'linear-gradient(to bottom, #da237b, #ffffff33)',
      DC: 'linear-gradient(to bottom, #4f5db0, #e31a1a)',
      PBKS: 'linear-gradient(to bottom, #f7db00, #da237b)',
      LSG: 'linear-gradient(to bottom, #0f172a, #18ed66)',
      GT: 'linear-gradient(to bottom, #4f5db0, #f26d22)',
    }

    return teamGradients[id] || 'linear-gradient(to bottom, #1e293b, #a4261d)'
  }

  render() {
    const {isLoading, teamMatchesData} = this.state
    const {teamBannerUrl} = teamMatchesData

    if (isLoading) {
      return (
        <div
          className="team-matches-container"
          style={{backgroundImage: this.getTeamBackgroundColor()}}
        >
          {this.renderLoader()}
        </div>
      )
    }

    return (
      <div
        className="team-matches-container"
        style={{backgroundImage: this.getTeamBackgroundColor()}}
      >
        <div className="team-matches-banner-container">
          <img
            src={teamBannerUrl}
            alt="team banner"
            className="team-banner-img"
          />
        </div>
        <div className="latest-match-container">{this.renderLatestMatch()}</div>
        <div className="recent-matches-container">
          <h1 className="recent-matches-heading">Recent Matches</h1>
          {this.renderMatchCardsList()}
        </div>
      </div>
    )
  }
}

export default TeamMatches
