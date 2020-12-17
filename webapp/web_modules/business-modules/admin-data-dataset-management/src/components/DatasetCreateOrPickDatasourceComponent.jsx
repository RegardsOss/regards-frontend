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
import { browserHistory } from 'react-router'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * React component to list datasets.
 */
export class DatasetCreateOrPickDatasourceComponent extends React.Component {
  static propTypes = {
    datasourceList: DataManagementShapes.DatasourceList,
    createDatasourceUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    handleDone: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentDatasource: undefined,
  }

  handleChange = (event, index, value) => {
    this.setState({
      currentDatasource: value,
    })
  }

  goToDatasource = () => {
    browserHistory.push(this.props.createDatasourceUrl)
  }

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20px',
    }

    const { currentDatasource } = this.state
    const styleButton = {
      margin: '30px 0',
    }
    const { datasourceList, handleDone, backUrl } = this.props
    return (
      <div>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'dataset.form.create.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'dataset.form.create.subtitle' })}
          />
          <CardText>
            <SelectField
              className="selenium-pickDatasource"
              floatingLabelText={this.context.intl.formatMessage({ id: 'dataset.form.create.datasource' })}
              onChange={this.handleChange}
              value={currentDatasource}
              fullWidth
            >
              {map(datasourceList, (datasource, id) => (
                <MenuItem
                  className={`selenium-pickDatasource-${datasource.content.label}`}
                  value={datasource.content.businessId}
                  key={id}
                  primaryText={datasource.content.label}
                />
              ))}
            </SelectField>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonClick={() => { handleDone(currentDatasource) }}
              mainButtonLabel={
                <FormattedMessage
                  id="dataset.form.create.action.next"
                />
              }
              isMainButtonDisabled={currentDatasource === undefined}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.create.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
        <Card>
          <div style={style}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'dataset.form.create.action.datasource' })}
              secondary
              style={styleButton}
              onClick={this.goToDatasource}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default DatasetCreateOrPickDatasourceComponent
