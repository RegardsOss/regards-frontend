import { connect } from 'react-redux'

/**
 * React component to display a global application error.
 */
export function ApplicationErrorComponent() {
  return (
    <div>
        Application unavailable
    </div>
  )
}

// Add theme from store to the component props
const mapStateToProps = state => ({
  theme: state.theme,
})
export default connect(mapStateToProps)(ApplicationErrorComponent)
