/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { EntitiesFilesFormContainer } from '@regardsoss/admin-data-entities-attributes-management'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'

/**
 * React component to list datasets.
 */
export class DatasetEditFilesComponent extends React.Component {
  static propTypes = {
    backUrl: PropTypes.string.isRequired,
    currentDataset: DataManagementShapes.Dataset,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { backUrl, currentDataset } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.subtitle' })}
        />
        <DatasetStepperContainer
          stepIndex={2}
          currentDatasetIpId={currentDataset.content.feature.id}
          currentDatasetId={currentDataset.content.id}
          isEditing
        />
        <CardText>
          <EntitiesFilesFormContainer
            currentEntity={currentDataset}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.action.next' })}
            mainButtonClick={this.handleSubmit}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.uiservices.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditFilesComponent

