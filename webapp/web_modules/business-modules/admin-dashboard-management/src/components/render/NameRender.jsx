/**
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
 **/

import sum from 'lodash/sum'
import map from 'lodash/map'
import Running from 'mdi-material-ui/PlayCircleOutline'
import Alert from 'mdi-material-ui/AlertOutline'
import Error from 'mdi-material-ui/AlertCircleOutline'
import { StringValueRender } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import Chip from 'material-ui/Chip'

const ICON_TYPE = {
  RUNNING: 'running',
  WAITING: 'waiting',
  ERRORS: 'errors',
}

/**
  * Table cell render for attribute
  * @author Théo Lasserre
  */
class NameRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([
      AdminShapes.Source,
      AdminShapes.Session,
    ]).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getElementCount = (iconType) => {
    const { entity } = this.props
    let elementCount = 0
    if (iconType === ICON_TYPE.WAITING || iconType === ICON_TYPE.ERRORS) {
      elementCount = sum(map(entity.content.steps, (step) => step.state[iconType]))
    }
    return elementCount
  }

  displayIcon = (iconType) => {
    const {
      moduleTheme: { dashboardStyle: { tableStyle: { overlayStyle } } },
    } = this.context
    let iconComponent
    const elementCount = this.getElementCount(iconType)
    switch (iconType) {
      case ICON_TYPE.RUNNING:
        iconComponent = <Running style={overlayStyle.icon.runningStyle} />
        break
      case ICON_TYPE.WAITING:
        iconComponent = <Alert style={overlayStyle.icon.waitingStyle} />
        break
      case ICON_TYPE.ERRORS:
        iconComponent = <Error style={overlayStyle.icon.errorStyle} />
        break
      default:
    }
    return (<div style={overlayStyle.iconDivStyle}>
      <IconButton
        disabled
        style={overlayStyle.iconButton.style}
      />
      <div style={overlayStyle.style}>
        <Chip
          labelStyle={overlayStyle.chip.labelStyle}
          style={elementCount !== 0 ? overlayStyle.chip.style : { display: 'none' }}
        >
          {elementCount}
        </Chip>
        {iconComponent}
      </div>
    </div>)
  }

  render() {
    const {
      entity: {
        content: {
          name, running, waiting, error,
        },
      },
    } = this.props
    const {
      moduleTheme: { dashboardStyle: { tableStyle } },
    } = this.context
    return <div style={tableStyle.nameRenderStyle.divStyle}>
      <StringValueRender value={name} />
      <div style={tableStyle.nameRenderStyle.iconsStyle}>
        {running ? this.displayIcon(ICON_TYPE.RUNNING) : null}
        {waiting ? this.displayIcon(ICON_TYPE.WAITING) : null}
        {error ? this.displayIcon(ICON_TYPE.ERRORS) : null}
      </div>
    </div>
  }
}
export default NameRender
