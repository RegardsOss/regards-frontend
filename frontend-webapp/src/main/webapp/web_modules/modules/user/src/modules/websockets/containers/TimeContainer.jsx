import * as React from "react"
import { connect } from "react-redux"
import { connectTime, disconnectTime } from "../actions/WSTimeActions"
import { startTimeWebSocket } from "../actions/TimeActions"
import Time from "../components/TimeComponent"

interface TimeProps {
  time?: any,
  started?: boolean,
  webSocketConnect?: any,
  webSocketDisconnect?: any,
  startTime?: any
}

class TimeContainer extends React.Component<TimeProps, any> {

  // Websocket client
  client: any

  componentWillMount (): any {
    // Action to connect to websocket server
    this.client = this.props.webSocketConnect()
    // Action to start the thread which send time by websocket
    this.props.startTime()
  }

  componentWillUnmount (): any {
    // Action to disconnect from web socket server
    this.props.webSocketDisconnect(this.client)
  }

  render (): JSX.Element {
    // Render time
    if (this.props.started === true) {
      return (
        <Time time={this.props.time}/>
      )
    }
    return null
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  webSocketConnect: () => dispatch(connectTime()),
  webSocketDisconnect: (sock: any) => dispatch(disconnectTime(sock)),
  startTime: () => dispatch(startTimeWebSocket())
})
const mapStateToProps = (state: any) => ({
  time: state.userApp.ws.time,
  started: state.userApp.ws.started
})
const timeConnected = connect<{}, {}, TimeProps>(mapStateToProps, mapDispatchToProps)(TimeContainer)
export default timeConnected
