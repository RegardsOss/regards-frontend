/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import omit from 'lodash/omit'
import some from 'lodash/some'
import find from 'lodash/find'
import { Tabs, Tab } from 'material-ui/Tabs'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import {
  CardActionsComponent, HelpMessageComponent,
} from '@regardsoss/components'
import {
  RenderTextField, RenderPageableAutoCompleteField, RenderSelectField, reduxForm,
  RenderArrayObjectField, RenderCheckbox, ValidationHelpers, Field, FieldArray, StringComparison,
} from '@regardsoss/form-utils'
import { DataProviderDomain } from '@regardsoss/domain'
import { ingestProcessingChainActions, ingestProcessingChainEntitiesKey } from '../../clients/IngestProcessingChainClient'
import AcquisitionProcessingChainFormPluginsComponent from './AcquisitionProcessingChainFormPluginsComponent'
import AcquisitionFileInfoComponent from './AcquisitionFileInfoComponent'
import { StoragesFieldArrayRenderer, DATA_TYPES_ENUM } from './StoragesFieldArrayRenderer'
import { CategoriesFieldArrayRenderer } from './CategoriesFieldArrayRenderer'
import styles from '../../styles'
import messages from '../../i18n'

const {
  required, validStringSize,
} = ValidationHelpers
const validRequiredString255 = [required, validStringSize(1, 255)]
const validateCron = value => value && !/^0 \* ((\*|\?|\d+((\/|-){0,1}(\d+))*)\s*){4}$/i.test(value)
  ? 'invalid.cron.expression' : undefined

/**
* Component to display a form of AcquisitionProcessingChain entity
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainFormComponent extends React.PureComponent {
  static propTypes = {
    chain: DataProviderShapes.AcquisitionProcessingChain,
    mode: PropTypes.oneOf(['edit', 'create', 'duplicate']),
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    storages: CommonShapes.PluginConfigurationArray.isRequired,
    // from reduxForm
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    hasModeAuto: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  static getNewIntialValues = () => ({
    active: true,
    generationRetryEnabled: false,
    fileInfos: [{
      mandatory: true,
    }],
    categories: [],
    mode: 'MANUAL',
    periodicity: '0 * ',
  })

  /**
   * Duplicate the given chain by removing parameters [id,label,locked,lastDateActivation].
   * For each fileInfos, the id parameter is removed.
   * For each plugin, the id parameter is remove and the label is initialized to a new generated one.
   */
  static getDuplicatedInitialValues = (chainToDuplicate) => {
    const duplicatedChain = omit(chainToDuplicate.content, [
      'id', 'label', 'locked', 'lastDateActivation', 'fileInfos',
      'productPluginConf', 'generatePluginConf', 'validationPluginConf',
      'postProcessSipPluginConf',
    ])
    duplicatedChain.fileInfos = map(chainToDuplicate.content.fileInfos,
      AcquisitionProcessingChainFormComponent.getFileInfoForChainDuplication)
    if (chainToDuplicate.content.validationPluginConf) {
      duplicatedChain.validationPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(chainToDuplicate.content.validationPluginConf)
    }
    if (chainToDuplicate.content.productPluginConf) {
      duplicatedChain.productPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(chainToDuplicate.content.productPluginConf)
    }
    if (chainToDuplicate.content.generateSipPluginConf) {
      duplicatedChain.generateSipPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(chainToDuplicate.content.generateSipPluginConf)
    }
    if (chainToDuplicate.content.postProcessSipPluginConf) {
      duplicatedChain.postProcessSipPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(chainToDuplicate.content.postProcessSipPluginConf)
    }
    return duplicatedChain
  }

  static getFileInfoForChainDuplication = fileInfo => omit(fileInfo, ['id', 'scanPlugin'])

  static duplicateFileInfo(fileInfo) {
    return {
      ...AcquisitionProcessingChainFormComponent.getFileInfoForChainDuplication(fileInfo),
      // plugin is reported when duplicating file info
      scanPlugin: AcquisitionProcessingChainFormComponent.duplicatePluginConf(fileInfo.scanPlugin),
    }
  }

  static duplicatePluginConf(plugin) {
    return {
      ...omit(plugin, ['id', 'label', 'parameters']),
      label: plugin.pluginId ? `${plugin.pluginId}-${Date.now()}` : Date.now(),
      parameters: map(plugin.parameters, parameter => omit(parameter, ['id'])) || [],
    }
  }

  static validateStorages(value) {
    return some(value, { active: true }) ? undefined : true
  }

  componentWillMount() {
    const {
      chain, mode, storages, initialize,
    } = this.props
    let initialValues
    let loadedStorages
    if (mode !== 'create') {
      loadedStorages = storages.map((serverStorage) => {
        const findStorage = chain.content.storages.find(configuredStorage => serverStorage.content.businessId === configuredStorage.pluginBusinessId)
        return {
          label: serverStorage.content.label,
          active: !!findStorage,
          storePath: findStorage ? findStorage.storePath : '',
          aip: findStorage && findStorage.targetTypes ? findStorage.targetTypes.includes(DATA_TYPES_ENUM.AIP) : false,
          rawdata: findStorage && findStorage.targetTypes ? findStorage.targetTypes.includes(DATA_TYPES_ENUM.RAWDATA) : false,
          document: findStorage && findStorage.targetTypes ? findStorage.targetTypes.includes(DATA_TYPES_ENUM.DOCUMENT) : false,
          description: findStorage && findStorage.targetTypes ? findStorage.targetTypes.includes(DATA_TYPES_ENUM.DESCRIPTION) : false,
          thumbnail: findStorage && findStorage.targetTypes ? findStorage.targetTypes.includes(DATA_TYPES_ENUM.THUMBNAIL) : false,
          quicklook: findStorage && findStorage.targetTypes ? findStorage.targetTypes.includes(DATA_TYPES_ENUM.QUICKLOOK) : false,
          other: findStorage && findStorage.targetTypes ? findStorage.targetTypes.includes(DATA_TYPES_ENUM.OTHER) : false,
        }
      },
      ).sort(({ label: l1 }, { label: l2 }) => StringComparison.compare(l1, l2))
    }

    switch (mode) {
      case 'create':
        initialValues = {
          ...AcquisitionProcessingChainFormComponent.getNewIntialValues(),
          storages: storages.map(serverStorage => ({
            label: serverStorage.content.label,
            active: false,
            path: '',
          })),
        }
        break
      case 'duplicate':
        if (chain) {
          initialValues = {
            ...AcquisitionProcessingChainFormComponent.getDuplicatedInitialValues(chain),
            storages: loadedStorages,
          }
        } else {
          throw new Error('No chain loaded')
        }
        break
      case 'edit':
        if (chain) {
          initialValues = {
            ...chain.content,
            storages: loadedStorages,
          }
        } else {
          throw new Error('No chain loaded')
        }
        break
      default:
        throw new Error(`Unknown mode : ${mode}`)
    }

    initialize(initialValues)
  }

  handleModeChange = (event, index, value, input) => {
    input.onChange(value)
  }

  renderActionButtons = () => {
    const { intl: { formatMessage } } = this.context
    const {
      invalid, submitting, onBack, mode,
    } = this.props
    const label = mode === 'create' || mode === 'duplicate'
      ? formatMessage({ id: 'acquisition-chain.form.create.button' })
      : formatMessage({ id: 'acquisition-chain.form.update.button' })
    return (
      <CardActions>
        <CardActionsComponent
          mainButtonLabel={label}
          mainButtonType="submit"
          isMainButtonDisabled={submitting || invalid}
          secondaryButtonLabel={formatMessage({ id: 'acquisition-chain.form.cancel.button' })}
          secondaryButtonClick={onBack}
        />
      </CardActions>
    )
  }

  renderFileInfoItemLabel = item => item.comment || this.context.intl.formatMessage({ id: 'acquisition-chain.form.fileInfos.list.item.title' })

  render() {
    const {
      chain, onSubmit, handleSubmit, mode, hasModeAuto,
    } = this.props
    const { intl: { formatMessage } } = this.context

    const infoMessage = (
      <span>
        {formatMessage({ id: 'acquisition-chain.form.informations-1' })}
        <ul>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-2' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-3' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-4' })}</li>
        </ul>
      </span>
    )

    let title
    switch (mode) {
      case 'create':
        title = formatMessage({ id: 'acquisition-chain.form.create.title' })
        break
      case 'duplicate':
        title = formatMessage({ id: 'acquisition-chain.form.duplicate.title' }, { name: get(chain, 'content.label', '') })
        break
      case 'edit':
        title = formatMessage({ id: 'acquisition-chain.form.edit.title' }, { name: get(chain, 'content.label', '') })
        break
      default:
        title = 'undefined'
        break
    }

    const ingestProcessingChainConfig = {
      text: 'name',
      value: 'name',
    }
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardTitle title={title} />
          <CardText>
            <HelpMessageComponent message={infoMessage} />
            <br />
            <Tabs>
              <Tab
                label={formatMessage({ id: 'acquisition-chain.form.general.section.title' })}
                className="selenium-generalTab"
              >
                <Field
                  name="label"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  validate={validRequiredString255}
                  label={formatMessage({ id: 'acquisition-chain.form.general.section.label' })}
                />
                <Field
                  name="active"
                  fullWidth
                  component={RenderCheckbox}
                  label={formatMessage({ id: 'acquisition-chain.form.general.section.active' })}
                />
                <Field
                  name="generationRetryEnabled"
                  fullWidth
                  component={RenderCheckbox}
                  label={formatMessage({ id: 'acquisition-chain.form.general.generationRetryEnabled' })}
                />
                <Field
                  key="mode"
                  name="mode"
                  fullWidth
                  component={RenderSelectField}
                  hintText={formatMessage({ id: 'acquisition-chain.form.general.section.mode' })}
                  floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.mode' })}
                  validate={required}
                >
                  {map(DataProviderDomain.AcquisitionProcessingChainModes, (activationMode, key) => (
                    <MenuItem
                      className={`selenium-pick-mode-${activationMode}`}
                      value={activationMode}
                      key={key}
                      primaryText={formatMessage({ id: `acquisition-chain.form.general.section.mode.${activationMode}` })}
                    />
                  ))}
                </Field>
                {hasModeAuto ? (
                  <Field
                    name="periodicity"
                    fullWidth
                    component={RenderTextField}
                    type="text"
                    label={formatMessage({ id: 'acquisition-chain.form.general.section.periodicity' })}
                    validate={validateCron}
                  />
                ) : (<div />)}
                <Field
                  name="ingestChain"
                  fullWidth
                  component={RenderPageableAutoCompleteField}
                  floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.ingestChain.select' })}
                  hintText={formatMessage({ id: 'acquisition-chain.form.general.section.ingestChain.select.hint' })}
                  pageSize={50}
                  entitiesFilterProperty="name"
                  entityActions={ingestProcessingChainActions}
                  entitiesPayloadKey={ingestProcessingChainEntitiesKey}
                  entitiesConfig={ingestProcessingChainConfig}
                  validate={required}
                />
                <FieldArray
                  name="categories"
                  fullWidth
                  component={CategoriesFieldArrayRenderer}
                  canBeEmpty
                  label={formatMessage({ id: 'acquisition-chain.form.general.section.periodicity' })}
                />
                <FieldArray
                  name="storages"
                  component={StoragesFieldArrayRenderer}
                  elementLabel="Test"
                  canBeEmpty={false}
                  validate={AcquisitionProcessingChainFormComponent.validateStorages}
                />
              </Tab>
              <Tab
                label={formatMessage({ id: 'acquisition-chain.form.fileInfos.section' })}
                className="selenium-filesTab"
              >
                <FieldArray
                  name="fileInfos"
                  component={RenderArrayObjectField}
                  elementLabel={this.renderFileInfoItemLabel}
                  fieldComponent={AcquisitionFileInfoComponent}
                  duplicationTransformation={AcquisitionProcessingChainFormComponent.duplicateFileInfo}
                  canBeEmpty={false}
                  listHeight="600px"
                  validate={required}
                />
              </Tab>
              <Tab
                label={formatMessage({ id: 'acquisition-chain.form.plugins.section' })}
                className="selenium-pluginsTab"
              >
                <AcquisitionProcessingChainFormPluginsComponent
                  chain={chain}
                />
              </Tab>
            </Tabs>
          </CardText>
          {this.renderActionButtons()}
        </Card>
      </form>
    )
  }
}

let connectedReduxForm = reduxForm({
  form: 'acquisition-chain-form',
})(AcquisitionProcessingChainFormComponent)

const selector = formValueSelector('acquisition-chain-form')

connectedReduxForm = connect(
  (state) => {
    // can select values individually
    const hasModeAuto = selector(state, 'mode') === 'AUTO'
    return {
      hasModeAuto,
    }
  },
)(connectedReduxForm)

export default withI18n(messages)(withModuleStyle(styles)(connectedReduxForm))
