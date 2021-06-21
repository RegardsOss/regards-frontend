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
import get from 'lodash/get'
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { AdminShapes } from '@regardsoss/shape'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { STORAGE_PROPERTIES, STORAGE_PROPERTIES_ENUM } from '../domain/storageProperties'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'
import { ICON_TYPE_ENUM } from '../domain/iconType'

/**
 * ArchivalComponent
 * @author Théo Lasserre
 */
class ArchivalComponent extends React.Component {
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
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages`)
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
    if (property === STORAGE_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
    }
    return (
      <ListItem
        key={property}
        primaryText={formatMessage({ id: `dashboard.selectedsession.storage.${property}` }, { value: propValue || 0 })}
        disabled
        style={style}
      />
    )
  }

  // Case Storage
  displayStorage = () => {
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, cardContentStyle, cardButtonStyle, listItemDivStyle,
        },
      },
    } = this.context
    return <div style={cardContentStyle}>
      <div style={listItemDivStyle}>
        {
          map(STORAGE_PROPERTIES, (property) => (this.displayListItem(property)))
        }
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={this.onClick}
          label={formatMessage({ id: 'dashboard.selectedsession.storage.button.see-stockage' })}
          primary
          style={raisedListStyle}
        />
      </div>
    </div>
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          cardStyle, cardTitleDivStyle, cardTitleTextStyle, cardTitleStyle,
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
              title={formatMessage({ id: 'dashboard.selectedsession.storage.title' }, { nbIn: inputRelated, nbOut: outputRelated })}
              titleStyle={cardTitleTextStyle}
              style={cardTitleStyle}
            />
            { runnings !== 0
              ? <DisplayIconsComponent
                  entity={sessionStep}
                  displayIconType={DISPLAY_ICON_TYPE_ENUM.NO_COUNT}
              />
              : null }
          </div>
          <CardText>
            {this.displayStorage()}
          </CardText>
        </Card> : null
    )
  }
}
export default ArchivalComponent
