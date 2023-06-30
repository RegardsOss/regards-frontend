/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
