import { connect } from '@regardsoss/redux'

/**
 * React components to display a global application error.
 */
export function ApplicationErrorComponent() {
  return (
    <div>
        Application unavailable
    </div>
  )
}

// Add theme from store to the components props
const mapStateToProps = state => ({
  theme: state.theme,
})
export default connect(mapStateToProps)(ApplicationErrorComponent)
