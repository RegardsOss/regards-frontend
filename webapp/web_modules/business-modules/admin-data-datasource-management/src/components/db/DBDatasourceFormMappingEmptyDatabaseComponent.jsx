/**
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
 **/
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import DissatisfiedIcon from 'mdi-material-ui/EmoticonSadOutline'
import { i18nContextType } from '@regardsoss/i18n'
import DBDatasourceStepperComponent from './DBDatasourceStepperComponent'

export class DBDatasourceFormMappingEmptyDatabaseComponent extends React.Component {
  static propTypes = {
    handleBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { handleBack } = this.props
    return (
      <form>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'datasource.form.mapping.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'datasource.form.mapping.subtitle' })}
          />
          <DBDatasourceStepperComponent stepIndex={2} />
          <NoContentComponent
            titleKey="datasource.form.mapping.emptyDatabase.title"
            messageKey="datasource.form.mapping.emptyDatabase.message"
            Icon={DissatisfiedIcon}
          />
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.mapping.action.cancel' })}
              mainButtonClick={handleBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default DBDatasourceFormMappingEmptyDatabaseComponent
