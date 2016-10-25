/** @module common */
import * as React from "react"
import { connect } from "react-redux"

/**
 * React component to display a global application error.
 */
class ApplicationErrorComponent extends React.Component<any, any> {

  render (): JSX.Element {
    return (
      <div>
        Application unavailable
      </div>
    )
  }
}

// Add theme from store to the component props
const mapStateToProps = (state: any) => {
  return {
    theme: state.theme
  }
}
export default connect(mapStateToProps)(ApplicationErrorComponent)
