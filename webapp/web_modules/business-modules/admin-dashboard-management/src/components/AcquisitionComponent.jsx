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
 * AcquisitionComponent
 * @author Théo Lasserre
 */
class AcquisitionComponent extends React.Component {
  static propTypes = {
    sessionStep: PropTypes.object,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  // Case FeatureManager
  displayFEM = () => {
    const { sessionStep } = this.props
    const { intl: { formatMessage }, moduleTheme: { selectedSession: { cardContentStyle, cardButtonStyle } } } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.in' }, { nbIn: sessionStep.in })}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.refused' }, { nbRefused: -1 })}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.error' }, { nbError: -1 })}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.acquired' }, { nbAcquired: sessionStep.out })}
          disabled
        />
      </div>
      <div style={cardButtonStyle}>
        <FlatButton
    // onClick={this.addNewValue}
          label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.button.see-errors' })}
          primary
        />
        <FlatButton
    // onClick={this.addNewValue}
          label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.button.retry-errors' })}
          primary
        />
      </div>
    </div>
  }

  // Case DataProvider
  displayDP = () => {
    const { sessionStep } = this.props
    const { intl: { formatMessage }, moduleTheme: { selectedSession: { cardContentStyle, cardButtonStyle } } } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.in' }, { nbIn: sessionStep.in })}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.incomplete' }, { nbIncomplete: -1 })}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.invalid' }, { nbInvalid: -1 })}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.error' }, { nbError: -1 })}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.acquired' }, { nbAcquired: sessionStep.out })}
          disabled
        />
      </div>
      <div style={cardButtonStyle}>
        <FlatButton
    // onClick={this.addNewValue}
          label={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.button.see-errors' })}
        />
        <FlatButton
    // onClick={this.addNewValue}
          label={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.button.retry-errors' })}
        />
      </div>
    </div>
  }

  render() {
    const { sessionStep } = this.props
    const { intl: { formatMessage }, moduleTheme: { selectedSession: { cardStyle, cardTitleStyle, cardTitleTextStyle } } } = this.context
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <CardTitle
            title={formatMessage({ id: 'dashboard.selectedsession.acquisition.title' })}
            style={cardTitleStyle}
            titleStyle={cardTitleTextStyle}
          />
          <CardText>
            {sessionStep.stepId === '0' ? this.displayFEM() : this.displayDP()}
          </CardText>
        </Card> : null
    )
  }
}
export default AcquisitionComponent
