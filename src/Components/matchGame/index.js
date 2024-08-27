import {Component} from 'react'

import TabItem from '../tabItems'

import ImgItem from '../imgItems'

import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsList: props.tabsList,
      imagesList: props.imagesList,
      score: 0,
      timer: 60,
      activeTabId: props.tabsList[0].tabId,
      initialimg: props.imagesList[0].imageUrl,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.startcounter, 1000)
  }

  startcounter = () => {
    const {timer} = this.state
    if (timer !== 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    } else {
      clearInterval(this.startcounter)
    }
  }

  selecttab = event => {
    const displayText = event.target.value
    console.log(displayText)
  }

  onClickTabUpdate = value => {
    this.setState({activeTabId: value})
  }

  activeTabResults = () => {
    const {activeTabId, imagesList} = this.state
    const activeTabResults = imagesList.filter(
      eachItem => eachItem.category === activeTabId,
    )
    return activeTabResults
  }

  Onthumbnailclick = (uid, imageUrl) => {
    const {imagesList, initialimg} = this.state
    const randomid = Math.floor(Math.random() * 30)
    console.log(randomid)
    const newinitialimg = imagesList[randomid].imageUrl
    console.log(initialimg, imageUrl)
    if (imageUrl === initialimg) {
      console.log('true match')
      this.setState(prevState => ({
        score: prevState.score + 1,
      }))
      this.setState({initialimg: newinitialimg})
    } else {
      console.log(false)
      this.setState({timer: 0})
    }
  }

  restartgame = () => {
    this.setState({score: 0, timer: 60})
  }

  componentDidUnmount() {
    clearInterval(this.startcounter)
  }

  render() {
    const {score, timer, tabsList, activeTabId, initialimg} = this.state

    const activeImgList = this.activeTabResults()

    let gameEnded = false

    if (timer === 0) {
      gameEnded = true
    } else {
      gameEnded = false
    }

    return (
      <div className="container">
        <nav className="navbar">
          <div>
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
            />
          </div>
          <ul className="navscore-block">
            <li className="scoreline">
              <p>
                Score:<span className="score">{score}</span>
              </p>
            </li>
            <li className="timerblock">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timerimg"
              />
              <p className="timer">{timer} sec</p>
            </li>
          </ul>
        </nav>
        <div className="app-container">
          {!gameEnded && (
            <div className="matchgame">
              <div className="imgblock">
                <img className="initalimg" src={initialimg} alt="match" />
              </div>
              <div className="tabsblock">
                <ul className="tabs-container">
                  {tabsList.map(eachItem => (
                    <TabItem
                      tabDetails={eachItem}
                      key={eachItem.tabId}
                      onClickTabUpdate={this.onClickTabUpdate}
                      isActive={eachItem.tabId === activeTabId}
                    />
                  ))}
                </ul>
              </div>
              <div className="thumbnailblock">
                <ul className="apps-container">
                  {activeImgList.map(eachItem => (
                    <ImgItem
                      appDetails={eachItem}
                      key={eachItem.id}
                      Onthumbnailclick={this.Onthumbnailclick}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
          {gameEnded && (
            <div className="gameover-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="trophy"
              />
              <p className="finalscore">YOUR SCORE</p>
              <p className="finalscoreval">{score}</p>

              <div className="button-block">
                <button
                  type="button"
                  className="reset-button"
                  onClick={this.restartgame}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="reset"
                  />
                  PLAY AGAIN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
