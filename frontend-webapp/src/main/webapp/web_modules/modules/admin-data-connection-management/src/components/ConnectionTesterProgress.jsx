/*
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import { FormattedMessage } from 'react-intl'

/**
 * Wraps a Material-Ui's {@link CircularProgress} with styles adapted for usage in {@link ConnectionTesterIconButton}
 *
 * @author Léo Mieulet
 */
const ConnectionTesterProgress = () => (
  <div style={{ display: 'inline-block' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <FormattedMessage
        id="connection.connectionTester.pending"
        style={{
          textAlign: 'center',
          width: 100,
        }}
      />
      <CircularProgress />
    </div>
  </div>
)


export default ConnectionTesterProgress
