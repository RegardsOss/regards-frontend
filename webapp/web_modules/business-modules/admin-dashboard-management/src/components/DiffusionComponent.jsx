/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { AdminShapes } from '@regardsoss/shape'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'
import { DIFFUSION_PROPERTIES, DIFFUSION_PROPERTIES_ENUM } from '../domain/diffusionProperties'
import { ICON_TYPE_ENUM } from '../domain/iconType'

/**
 * DiffusionComponent
 * @author Théo Lasserre
 */
class DiffusionComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onClick = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/datasource/monitor`)
  }

  displayListItem = (property) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          listItemStyle, listItemNoValueStyle, listItemErrorStyle,
        },
      },
    } = this.context
    const propValue = get(sessionStep, `properties.${property}`, false)
    let style = listItemNoValueStyle
    if (propValue > 0) {
      style = listItemStyle
    }
    if (property === DIFFUSION_PROPERTIES_ENUM.INDEXED_ERROR) {
      style = listItemErrorStyle
    }
    return (
      <ListItem
        key={property}
        primaryText={formatMessage({ id: `dashboard.selectedsession.diffusion.${property}` }, { value: propValue || 0 })}
        disabled
        style={style}
      />
    )
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          cardStyle, cardTitleDivStyle, cardContentStyle, cardButtonStyle, cardTitleTextStyle,
          raisedListStyle, listItemDivStyle, cardTitleStyle,
        },
      },
    } = this.context
    const inputRelated = get(sessionStep, 'inputRelated', 0)
    const outputRelated = get(sessionStep, 'outputRelated', 0)
    const runnings = get(sessionStep, `state.${ICON_TYPE_ENUM.RUNNING}`, 0)
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.diffusion.title' }, { nbIn: inputRelated, nbOut: outputRelated })}
              titleStyle={cardTitleTextStyle}
              style={cardTitleStyle}
            />
            { runnings !== 0
              ? <DisplayIconsComponent
                  entity={sessionStep}
                  displayIconType={DISPLAY_ICON_TYPE_ENUM.NO_COUNT}
              />
              : null}
          </div>
          <CardText style={cardContentStyle}>
            <div style={listItemDivStyle}>
              {
                map(DIFFUSION_PROPERTIES, (property) => (this.displayListItem(property)))
              }
            </div>
            <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.onClick}
                label={formatMessage({ id: 'dashboard.selectedsession.diffusion.button.see-detail' })}
                primary
                style={raisedListStyle}
              />
            </div>
          </CardText>
        </Card> : null
    )
  }
}
export default DiffusionComponent
