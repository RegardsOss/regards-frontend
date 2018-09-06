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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import MoodIcon from 'material-ui/svg-icons/social/mood'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CatalogShapes, CommonShapes } from '@regardsoss/shape'
import {
  reduxForm, Field, RenderTextField,
  ValidationHelpers, RenderPageableAutoCompleteField,
} from '@regardsoss/form-utils'
import {
  CardActionsComponent, PluginConfigurationPickerComponent, SubSectionCard, NoContentComponent,
} from '@regardsoss/components'
import { RenderPluginConfField, PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { DataManagementClient } from '@regardsoss/client'
import { DatasetConfiguration } from '@regardsoss/api'
import messages from '../../i18n'
import styles from '../../styles'

const datasetActions = new DataManagementClient.DatasetActions('admin-dataaccess/searchengines-datasets')
const {
  validStringSize,
} = ValidationHelpers
const validString255 = [validStringSize(0, 255)]
/**
* Component to create/edit/diplicate a search engine configuration
* @author Sébastien Binda
*/

export class SearchEngineConfigurationFormComponent extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    searchEngineConfiguration: CatalogShapes.SearchEngineConfiguration,
    onBack: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    pluginToConfigure: null,
    datasetSelector: 'all',
  }

  componentWillMount = () => {
    if (this.props.searchEngineConfiguration) {
      this.props.initialize(this.props.searchEngineConfiguration.content)
      if (this.props.searchEngineConfiguration.content.dataset) {
        this.setState({ datasetSelector: 'selected' })
      }
    }
  }


  onSubmit = (values) => {
    const searchConf = Object.assign(values, { datasetUrn: get(values, 'dataset.id', null), dataset: null })
    let task
    if (this.props.mode === 'edit') {
      task = this.props.onUpdate(searchConf, searchConf.id)
    } else {
      task = this.props.onCreate(values)
    }
    task.then((actionResults) => {
      if (!actionResults.error) {
        this.props.onBack()
      }
    })
  }

  onNewPluginConf = (pluginMetadata) => {
    this.setState({
      pluginToConfigure: pluginMetadata,
    })
    // Remove current conf in form
    this.props.change('configuration', PluginFormUtils.initNewConfiguration(pluginMetadata))
  }

  onChangeSelectedConf = (selectedConfId, selectedConf) => {
    this.setState({
      pluginToConfigure: null,
    })
    return this.props.change('configuration', selectedConf || null)
  }

  onChangeDatasetSelector = (event, value) => this.setState({ datasetSelector: value })

  renderNewPluginConf = () => {
    if (this.state.pluginToConfigure) {
      const { intl: { formatMessage } } = this.context
      return (
        <SubSectionCard
          title={formatMessage(
            { id: 'search-engines.form.new.plugin.section.title' },
            { engine: this.state.pluginToConfigure.pluginId })}
          arrowMarginLeft={30}
        >
          <Field
            name="configuration"
            component={RenderPluginConfField}
            microserviceName="rs-dam"
            pluginMetaData={this.state.pluginToConfigure}
            simpleGlobalParameterConf
            hideDynamicParameterConf
          />
        </SubSectionCard>
      )
    }
    return null
  }

  renderDatasetSelector = () => {
    const { intl: { formatMessage } } = this.context
    const datasetAutoCompletConfig = {
      text: 'label',
    }

    return (
      <div>
        <RadioButtonGroup
          name="dataset-selector"
          defaultSelected={this.state.datasetSelector}
          onChange={this.onChangeDatasetSelector}
        >
          <RadioButton
            value="all"
            label={formatMessage({ id: 'search-engines.form.dataset.type.all' })}
          />
          <RadioButton
            value="selected"
            label={formatMessage({ id: 'search-engines.form.dataset.type.selected' })}
          />
        </RadioButtonGroup>
        <br />
        {
          this.state.datasetSelector === 'selected'
            ? <SubSectionCard
              title={formatMessage({ id: 'search-engines.form.dataset.section.title' })}
              arrowMarginLeft={30}
            >
              {formatMessage({ id: 'search-engines.form.dataset.infos' })}
              <Field
                name="dataset"
                fullWidth
                component={RenderPageableAutoCompleteField}
                hintText={formatMessage({ id: 'search-engines.form.dataset.hinttext' })}
                floatingLabelText={formatMessage({ id: 'search-engines.form.dataset' })}
                pageSize={50}
                entitiesFilterProperty="label"
                entityActions={datasetActions}
                entitiesPayloadKey={DatasetConfiguration.normalizrKey}
                entitiesConfig={datasetAutoCompletConfig}
                entitiesPath="feature"
                format={dataset => dataset ? dataset.label : ''}
              />
            </SubSectionCard>
            : null
        }
      </div>
    )
  }

  render() {
    const {
      onBack, mode, searchEngineConfiguration, handleSubmit, invalid,
      pluginConfigurationList, pluginMetaDataList, submitting,
    } = this.props
    const { intl: { formatMessage } } = this.context

    if (!pluginMetaDataList || isEmpty(pluginMetaDataList)) {
      return (
        <Card>
          <NoContentComponent
            title={formatMessage({ id: 'dataaccess.searchengines.form.no.plugin.avalaible' })}
            Icon={MoodIcon}
          />
        </Card>
      )
    }

    const title = mode === 'edit'
      ? formatMessage({ id: 'dataaccess.searchengines.form.edit.title' }, { name: get(searchEngineConfiguration, 'content.label', '<>') })
      : formatMessage({ id: 'dataaccess.searchengines.form.create.title' })
    const subtitle = mode === 'edit'
      ? formatMessage({ id: 'dataaccess.searchengines.form.edit.subtitle' })
      : formatMessage({ id: 'dataaccess.searchengines.form.create.subtitle' })

    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        <CardText>
          <form
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <Field
              key="label"
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'search-engines.form.label' })}
              hintText={formatMessage({ id: 'search-engines.form.label.infos' })}
              validate={validString255}
            />
            <br />
            <br />
            {this.renderDatasetSelector()}
            <br />
            <PluginConfigurationPickerComponent
              rightRemoveIcon
              onNewPluginConf={this.onNewPluginConf}
              onChange={this.onChangeSelectedConf}
              pluginMetaDataList={pluginMetaDataList}
              pluginConfigurationList={pluginConfigurationList}
              currentPluginConfiguration={get(this.props.searchEngineConfiguration, 'configuration', undefined)}
            />
            {this.renderNewPluginConf()}
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={this.context.intl.formatMessage({ id: 'search-engines.form.action.save' })}
                mainButtonType="submit"
                isMainButtonDisabled={submitting || invalid}
                secondaryButtonLabel={this.context.intl.formatMessage({ id: 'search-engines.form.action.cancel' })}
                secondaryButtonClick={onBack}
              />
            </CardActions>
          </form>
        </CardText>
      </Card>
    )
  }
}

export default reduxForm({
  form: 'search-engine-configuration-form',
})(withModuleStyle(styles)(withI18n(messages)(SearchEngineConfigurationFormComponent)))
