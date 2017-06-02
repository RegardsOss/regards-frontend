/*
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { FormattedMessage } from 'react-intl'

/**
 * Wraps a Material-Ui's {@link CircularProgress} with styles adapted for usage in {@link ConnectionTesterIconButton}
 *
 * @author Léo Mieulet
 */
const testerStyle = { display: 'inline-block' }
const contentStyle = { display: 'flex', alignItems: 'center', flexDirection: 'column' }
const textStyle = { textAlign: 'center', width: 100 }

const ConnectionTesterProgress = () => (
  <div style={testerStyle}>
    <div style={contentStyle}>
      <FormattedMessage
        id="connection.connectionTester.pending"
        style={textStyle}
      />
      <CircularProgress />
    </div>
  </div>
)


export default ConnectionTesterProgress
