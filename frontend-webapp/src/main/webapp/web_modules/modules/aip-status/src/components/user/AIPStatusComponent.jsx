/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React, { Component } from 'react'
import ModuleIcon from 'material-ui/svg-icons/device/storage'
import { DynamicModule, ModuleTitle } from '@regardsoss/components'

class AIPStatus extends Component {

  static propTypes = {
    // expanded state management
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,
  }

  render() {
    const { onExpandChange, expanded } = this.props
    return (
      <DynamicModule
        title={<ModuleTitle IconConstructor={ModuleIcon} text={'TODO TITLE'} />} // TODO
        onExpandChange={onExpandChange}
        expanded={expanded}
      >
        {/* TODO implement me */}
        <div />
      </DynamicModule>
    )
  }
}


export default AIPStatus