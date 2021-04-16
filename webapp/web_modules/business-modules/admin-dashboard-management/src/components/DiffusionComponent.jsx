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

import { Card, CardTitle, CardText } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * DiffusionComponent
 * @author Théo Lasserre
 */
class DiffusionComponent extends React.Component {
  static propTypes = {
    sessionStep: PropTypes.object,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSession: {
          cardStyle, cardTitleStyle, cardContentStyle, cardButtonStyle, cardTitleTextStyle,
        },
      },
    } = this.context
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <CardTitle
            title={formatMessage({ id: 'dashboard.selectedsession.diffusion.title' })}
            style={cardTitleStyle}
            titleStyle={cardTitleTextStyle}
          />
          <CardText style={cardContentStyle}>
            <div>
              <ListItem
                primaryText={formatMessage({ id: 'dashboard.selectedsession.diffusion.out' }, { nbOut: sessionStep.out })}
                disabled
              />
              <ListItem
                primaryText={formatMessage({ id: 'dashboard.selectedsession.diffusion.dp.error' }, { nbError: -1 })}
                disabled
              />
            </div>
            <div style={cardButtonStyle}>
              <FlatButton
    // onClick={this.addNewValue}
                label={formatMessage({ id: 'dashboard.selectedsession.diffusion.button.see-detail' })}
                primary
              />
            </div>
          </CardText>
        </Card> : null
    )
  }
}
export default DiffusionComponent
