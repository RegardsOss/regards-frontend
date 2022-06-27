/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { UIDomain, CommonDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HelpDialogComponent, OpenSearchTesterIconButton } from '@regardsoss/components'
import {
  FieldsGroup, Field, FieldArray, RenderCheckbox, RenderTextField,
} from '@regardsoss/form-utils'
import { RestrictionsConfiguration } from '../../../../shapes/ModuleConfiguration'
import DatasetRestrictionsSelectionComponent from './DatasetRestrictionsSelectionComponent'

/**
 * Configuration component for results restricitons (filtering by configuration)
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class RestrictionsConfigurationComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string.isRequired,
    currentRestrictionsValues: RestrictionsConfiguration.isRequired,
    datasets: DataManagementShapes.DatasetList.isRequired,
    datasetModels: DataManagementShapes.ModelList.isRequired,
    // redux change field method
    changeField: PropTypes.func.isRequired,
    // test open search query
    testOpenSearchQuery: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    openSearchQuery: '',
  }

  /**
   * Callbak: User changed dataset restriction type. Update for selected value
   * @param {*} event MUI event
   * @param {string} value selected value, one of DISPLAYED_TYPES_CHOICES
   */
  onChangeDatasetRestrictionType = (event, type) => {
    const { currentNamespace, changeField } = this.props
    changeField(`${currentNamespace}.restrictions.byDataset`, {
      type,
      selection: [],
    })
  }

  handleOnBlur = (event, value, props, fieldName, a, b) => {
    this.setState({
      openSearchQuery: encodeURIComponent(value),
    })
  }

  render() {
    const {
      currentNamespace, currentRestrictionsValues,
      datasets, datasetModels, testOpenSearchQuery,
    } = this.props
    const { openSearchQuery } = this.state
    const { intl: { formatMessage }, moduleTheme: { user: { restrictionStyle: { openSearchContent }, openSearchButtonDivStyle } } } = this.context
    return (
      <>
        {/* Restrictions using data */ }
        <FieldsGroup
          title={formatMessage({ id: 'search.results.form.restrictions.configuration.data.restrictions.title' })}
          spanFullWidth
        >
          <Field
            name={`${currentNamespace}.restrictions.onData.lastVersionOnly`}
            component={RenderCheckbox}
            label={formatMessage({ id: 'search.results.form.restrictions.configuration.data.last.version.only' })}
          />
          <div style={openSearchContent}>
            <Field
              name={`${currentNamespace}.restrictions.onData.openSearchRequest`}
              component={RenderTextField}
              label={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.request' })}
              hintText={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.hint' })}
              fullWidth
              onBlur={this.handleOnBlur}
            />
            <HelpDialogComponent
              iconTitle={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.info.button' })}
              title={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.title' })}
              message={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.message' })}
              buttonLabel={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.close' })}
              link={CommonDomain.LINK_DOC_SEARCH_API}
              linkLabel={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.link' })}
            />
          </div>
          <div style={openSearchButtonDivStyle}>
            <OpenSearchTesterIconButton
              openSearchRequest={openSearchQuery}
              handleTestOpenSearchRequest={testOpenSearchQuery}
            />
          </div>
        </FieldsGroup>
        {/* Restrictions using dataset */}
        <FieldsGroup
          title={formatMessage({ id: 'search.results.form.restrictions.configuration.dataset.restrictions.title' })}
          spanFullWidth
        >
          <RadioButtonGroup
            name="restriction-type"
            onChange={this.onChangeDatasetRestrictionType}
            valueSelected={currentRestrictionsValues.byDataset.type}
          >
            { /** Possible restrictions types */
              UIDomain.DATASET_RESTRICTIONS_TYPES.map((type) => (
                <RadioButton
                  key={type}
                  value={type}
                  label={formatMessage({ id: `search.results.form.restrictions.configuration.display.type.${type}` })}
                />))
            }
          </RadioButtonGroup>
          <FieldArray
            name={`${currentNamespace}.restrictions.byDataset.selection`}
            component={DatasetRestrictionsSelectionComponent}
            datasets={datasets}
            datasetModels={datasetModels}
            currentRestrictionType={currentRestrictionsValues.byDataset.type}
          />
        </FieldsGroup>
      </>
    )
  }
}
export default RestrictionsConfigurationComponent
