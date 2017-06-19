/*
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const style = { marginLeft: 12 }

/**
 * Wraps a Material-Ui's {@link CircularProgress} with styles adapted for usage in {@link ConnectionTesterIconButton}
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
const ConnectionTesterProgress = () => <CircularProgress size={24} style={style} thickness={2.5} />

export default ConnectionTesterProgress
