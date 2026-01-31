import { Component } from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teams: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    Promise.resolve().then(() => {
      const updatedData = this.getUpdatedData(data.teams)
      this.setState({ teams: updatedData, isLoading: false })
    })
  }

  getUpdatedData = teamsList => {
    return teamsList.map(eachItem => {
      const updatedTeam = {
        id: eachItem.id,
        name: eachItem.name,
        teamImageUrl: eachItem.team_image_url,
      }
      return updatedTeam
    })
  }

  renderTeamsList = () => {
    const { teams } = this.state
    return (
      <ul className="teams-list">
        {teams.map(team => (
          <TeamCard key={team.id} teamDetails={team} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const { isLoading } = this.state
    return (
      <div className="home-container">
        <div className="ipl-dashboard-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo-img"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        {isLoading ? this.renderLoader() : this.renderTeamsList()}
      </div>
    )
  }
}

export default Home