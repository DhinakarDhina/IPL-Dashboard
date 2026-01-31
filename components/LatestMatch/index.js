import './index.css'

const LatestMatch = props => {
  const { latestMatchDetails } = props
  const {
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    date,
    venue,
    result,
    umpires,
    matchStatus,
  } = latestMatchDetails

  const isWon = matchStatus === 'Won'

  return (
    <div className="latest-match-card">
      <div className="match-teams-container">
        <div className="team-logo-container">
          <p className="team-name">{firstInnings}</p>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="team-logo"
          />
          <p className="first-innings">First Innings</p>
        </div>
        <div className="team-logo-container">
          <p className="second-innings">Second Innings</p>
          <p className="team-name">{secondInnings}</p>
        </div>
      </div>
      <div className="match-details-section">
        <div className="match-details">
          <p className="match-detail">Man of the Match</p>
          <p className="match-value">{manOfTheMatch}</p>
        </div>
        <div className="match-details">
          <p className="match-detail">Umpires</p>
          <p className="match-value">{umpires}</p>
        </div>
        <div className="match-details">
          <p className="match-detail">Venue</p>
          <p className="match-value">{venue}</p>
        </div>
        <div className="match-details">
          <p className="match-detail">Date</p>
          <p className="match-value">{date}</p>
        </div>
        <div className="match-details">
          <p className="match-detail">Result</p>
          <p className="match-value">{result}</p>
        </div>
        {isWon ? (
          <div className="status-won">
            <h1 className="won-text">{matchStatus}</h1>
          </div>
        ) : (
          <div className="status-lost">
            <h1 className="lost-text">{matchStatus}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default LatestMatch