import './index.css'

const MatchCard = props => {
  const { matchDetails } = props
  const { competingTeam, competingTeamLogo, matchStatus, result, umpires } = matchDetails
  const statusClassName = matchStatus === 'Won' ? 'status won' : 'status lost'

  return (
    <li className="match-card-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <div className="match-details">
        <p className="competing-team-name">{competingTeam}</p>
        <p className="result">{result}</p>
        <p className="umpires">{umpires}</p>
        <p className={statusClassName}>{matchStatus}</p>
      </div>
    </li>
  )
}

export default MatchCard