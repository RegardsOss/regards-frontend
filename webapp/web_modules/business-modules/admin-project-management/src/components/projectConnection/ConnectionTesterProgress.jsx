/*
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'

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
const ConnectionTesterProgress = (props, { intl: { formatMessage } }) => (
  <div style={styles}>
    <div style={testerStyles}>
      <span style={labelStyles}>
        {formatMessage({ id: 'database.connectionTester.pending' })}
      </span>
      <LinearProgress mode="indeterminate" />
    </div>
  </div>)

ConnectionTesterProgress.contextTypes = { ...i18nContextType }

export default ConnectionTesterProgress
