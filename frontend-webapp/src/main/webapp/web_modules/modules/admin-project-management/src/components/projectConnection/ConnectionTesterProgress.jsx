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
const ConnectionTesterProgress = () => (
  <div style={{ display: 'inline-block' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <FormattedMessage
        id="database.connectionTester.pending"
        style={{
          textAlign: 'center',
          width: 100,
        }}
      />
      <LinearProgress mode="indeterminate" />
    </div>
  </div>)

ConnectionTesterProgress.propTypes = {
  value: React.PropTypes.number.isRequired,
}

export default ConnectionTesterProgress
