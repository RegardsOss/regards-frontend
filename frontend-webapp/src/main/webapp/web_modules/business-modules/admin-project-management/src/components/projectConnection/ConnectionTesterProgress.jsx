/*
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import { FormattedMessage } from 'react-intl'

/**
 * Wraps a Material-Ui's {@link LinearProgress} with styles adapted for usage in {@link DatabaseConnectionTester}
 *
 * @author Xavier-Alexandre Brochard
 */
const styles = { display: 'inline-block' }
const labelStyles = { textAlign: 'center', width: 100 }
const testerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}
const ConnectionTesterProgress = () => (
  <div style={styles}>
    <div style={testerStyles}>
      <FormattedMessage
        id="database.connectionTester.pending"
        style={labelStyles}
      />
      <LinearProgress mode="indeterminate" />
    </div>
  </div>)

ConnectionTesterProgress.propTypes = {
  value: PropTypes.number.isRequired,
}

export default ConnectionTesterProgress
