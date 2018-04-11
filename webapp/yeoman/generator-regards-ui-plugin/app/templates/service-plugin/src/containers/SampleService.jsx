/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import React from 'react'
import { AccessShapes } from '@regardsoss/shape'

export class SampleService extends React.Component {

  static propTypes = {
    pluginInstanceId: React.PropTypes.string.isRequired,
    runtimeTarget: AccessShapes.RuntimeTarget.isRequired,
    configuration: AccessShapes.RuntimeConfiguration.isRequired,
  }

  render() {
    return (
      <div>Hello Service Plugin</div>
    )
  }
}

export default SampleService

