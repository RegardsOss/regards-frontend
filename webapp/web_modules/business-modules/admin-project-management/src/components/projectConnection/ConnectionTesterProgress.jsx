/*
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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

export default ConnectionTesterProgress
