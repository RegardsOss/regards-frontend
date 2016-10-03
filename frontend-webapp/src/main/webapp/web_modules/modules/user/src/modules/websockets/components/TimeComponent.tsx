import * as React from "react"

class Time extends React.Component<any, any> {
  constructor () {
    super()
  }

  render (): JSX.Element {
    return (
      <div>
        {this.props.time}
      </div>
    )
  }
}

export default Time
