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
import { Link } from 'react-router'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

import {
  FieldsGroup, Field, FieldArray, RenderCheckbox, RenderTextField,
} from '@regardsoss/form-utils'
import IconButton from 'material-ui/IconButton'
import DetailIcon from 'mdi-material-ui/HelpCircle'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
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
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Initial state
   */
  state = {
    isHelpOpenSearchDialogOpen: false,
  }

  /**
   * Display or not OpenSearch help dialog
   */
  showOrCloseHelpOpenSearchDialog = () => {
    const { isHelpOpenSearchDialogOpen } = this.state
    this.setState({
      isHelpOpenSearchDialogOpen: !isHelpOpenSearchDialogOpen,
    })
  }

  /**
   * Dialog to help user to build an OpenSearch request
   */
  helpOpenSearchDialog = () => {
    const { isHelpOpenSearchDialogOpen } = this.state
    const { intl: { formatMessage }, moduleTheme: { user: { restrictionStyle: { linkDivStyle, linkStyle } } } } = this.context
    return (
      <Dialog
        actions={<>
          <FlatButton
            key="close"
            label={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.close' })}
            primary
            onClick={this.showOrCloseHelpOpenSearchDialog}
          />
        </>}
        title={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.title' })}
        open={isHelpOpenSearchDialogOpen}
        onRequestClose={this.showOrCloseHelpOpenSearchDialog}
      >
        <div>
          {formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.message' })}
        </div>
        <div style={linkDivStyle}>
          <Link to={{ pathname: CatalogDomain.LINK_DOC_SEARCH_API }} target="_blank" style={linkStyle}>
            {formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.dialog.link' })}
          </Link>
        </div>
      </Dialog>
    )
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

  render() {
    const {
      currentNamespace, currentRestrictionsValues,
      datasets, datasetModels,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { restrictionStyle: { iconStyle, buttonStyle, helpOpenSearchIcon } } } } = this.context
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
        {/* OpenSearch Request */}
        <FieldsGroup
          title={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.title' })}
          spanFullWidth
          clearSpaceToChildren
        >
          <div style={helpOpenSearchIcon}>
            <Field
              name={`${currentNamespace}.restrictions.byOpenSearch.openSearchRequest`}
              component={RenderTextField}
              label={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.request' })}
              hintText={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.hint' })}
              fullWidth
            />
            <IconButton
              className="selenium-edit-openSearch-field"
              title={formatMessage({ id: 'search.results.form.restrictions.configuration.opensearch.info.button' })}
              iconStyle={iconStyle}
              style={buttonStyle}
              onClick={this.showOrCloseHelpOpenSearchDialog}
            >
              <DetailIcon />
            </IconButton>
          </div>
        </FieldsGroup>
        {this.helpOpenSearchDialog()}
      </>
    )
  }
}
export default RestrictionsConfigurationComponent
