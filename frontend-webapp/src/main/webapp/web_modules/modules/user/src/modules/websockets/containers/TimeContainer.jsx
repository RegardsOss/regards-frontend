
import { connect } from 'react-redux'
import { connectTime, disconnectTime } from '../actions/WSTimeActions'
import { startTimeWebSocket } from '../actions/TimeActions'
import Time from '../components/TimeComponent'


class TimeContainer extends React.Component {


  componentWillMount() {
    // Action to connect to websocket server
    this.client = this.props.webSocketConnect()
    // Action to start the thread which send time by websocket
    this.props.startTime()
  }


  componentWillUnmount() {
    // Action to disconnect from web socket server
    this.props.webSocketDisconnect(this.client)
  }

  // Websocket client
  client

  render() {
    // Render time
    if (this.props.started === true) {
      return (
        <Time time={this.props.time} />
      )
    }
    return null
  }
}
TimeContainer.propTypes = {
  time: React.PropTypes.number,
  started: React.PropTypes.bool,
  webSocketConnect: React.PropTypes.objectOf(React.PropTypes.string),
  webSocketDisconnect: React.PropTypes.objectOf(React.PropTypes.string),
  startTime: React.PropTypes.number,
}

const mapDispatchToProps = dispatch => ({
  webSocketConnect: () => dispatch(connectTime()),
  webSocketDisconnect: sock => dispatch(disconnectTime(sock)),
  startTime: () => dispatch(startTimeWebSocket()),
})
const mapStateToProps = state => ({
  time: state.userApp.ws.time,
  started: state.userApp.ws.started,
})
export default connect(mapStateToProps, mapDispatchToProps)(TimeContainer)
