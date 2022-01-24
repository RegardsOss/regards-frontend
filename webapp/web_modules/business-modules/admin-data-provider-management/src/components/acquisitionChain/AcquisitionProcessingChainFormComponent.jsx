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

import get from 'lodash/get'
import map from 'lodash/map'
import omit from 'lodash/omit'
import HelpCircle from 'mdi-material-ui/HelpCircle'
import { Tabs, Tab } from 'material-ui/Tabs'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import {
  CardActionsComponent, HelpMessageComponent,
} from '@regardsoss/components'
import {
  RenderTextField, RenderPageableAutoCompleteField, RenderSelectField, reduxForm,
  RenderArrayObjectField, RenderCheckbox, ValidationHelpers, Field, FieldArray,
  RenderFieldArray,
} from '@regardsoss/form-utils'
import { DataProviderDomain, IngestDomain } from '@regardsoss/domain'
import { ingestProcessingChainActions, ingestProcessingChainEntitiesKey } from '../../clients/IngestProcessingChainClient'
import AcquisitionProcessingChainFormPluginsComponent from './AcquisitionProcessingChainFormPluginsComponent'
import AcquisitionFileInfoComponent from './AcquisitionFileInfoComponent'
import CronDescriptionDialog from './CronDescriptionDialog'
import AcquisitionProcessingChainStorageConfComponent from './AcquisitionProcessingChainStorageConfComponent'
import styles from '../../styles'
import messages from '../../i18n'

const {
  required, validStringSize,
} = ValidationHelpers
const validRequiredString255 = [required, validStringSize(1, 255)]
const validateCron = (value) => value && !/^0 [^ ]* [^ ]* [^ ]* [^ ]* [^ ]*$/i.test(value)
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
    changeField: PropTypes.func.isRequired,
    // from reduxForm
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    hasModeAuto: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static INGEST_PROCESSING_CHAIN_CONFIG = {
    text: 'name',
    value: 'name',
  }

  /** Order versioning mode, as displayed to user */
  static ORDERED_VERSIONING_MODES = [
    IngestDomain.VERSIONING_MODES_ENUM.IGNORE,
    IngestDomain.VERSIONING_MODES_ENUM.INC_VERSION,
    IngestDomain.VERSIONING_MODES_ENUM.REPLACE,
    IngestDomain.VERSIONING_MODES_ENUM.MANUAL,
  ]

  static getNewIntialValues() {
    return {
      active: true,
      fileInfos: [{
        mandatory: true,
      }],
      versioningMode: IngestDomain.VERSIONING_MODES_ENUM.INC_VERSION,
      mode: 'MANUAL',
      periodicity: '0 * * * * *',
      productsStored: true,
      categories: [],
    }
  }

  /**
   * Duplicate the given chain by removing parameters [id,label,locked,lastDateActivation].
   * For each fileInfos, the id parameter is removed.
   * For each plugin, the id parameter is remove and the label is initialized to a new generated one.
   */
  static getDuplicatedInitialValues = (chainToDuplicate) => {
    const duplicatedChain = omit(chainToDuplicate.content, [
      'id', 'businessId', 'label', 'locked', 'lastDateActivation', 'fileInfos',
      'productPluginConf', 'generatePluginConf', 'validationPluginConf',
      'postProcessSipPluginConf',
    ])
    duplicatedChain.fileInfos = map(chainToDuplicate.content.fileInfos,
      AcquisitionProcessingChainFormComponent.duplicateFileInfo)
    if (get(chainToDuplicate, 'content.validationPluginConf')) {
      duplicatedChain.validationPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(get(chainToDuplicate, 'content.validationPluginConf'))
    }
    if (get(chainToDuplicate, 'content.productPluginConf')) {
      duplicatedChain.productPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(get(chainToDuplicate, 'content.productPluginConf'))
    }
    if (get(chainToDuplicate, 'content.generateSipPluginConf')) {
      duplicatedChain.generateSipPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(get(chainToDuplicate, 'content.generateSipPluginConf'))
    }
    if (get(chainToDuplicate, 'content.postProcessSipPluginConf')) {
      duplicatedChain.postProcessSipPluginConf = AcquisitionProcessingChainFormComponent.duplicatePluginConf(get(chainToDuplicate, 'content.postProcessSipPluginConf'))
    }
    if (get(chainToDuplicate, 'content.label')) {
      duplicatedChain.label = `${get(chainToDuplicate, 'content.label')} (1)`
    }
    return duplicatedChain
  }

  static getFileInfoForChainDuplication = (fileInfo) => {
    const infos = omit(fileInfo, ['id', 'scanPlugin'])
    return {
      ...infos,
    }
  }

  static duplicateFileInfo(fileInfo) {
    return {
      ...AcquisitionProcessingChainFormComponent.getFileInfoForChainDuplication(fileInfo),
      // plugin is reported when duplicating file info
      scanPlugin: AcquisitionProcessingChainFormComponent.duplicatePluginConf(fileInfo.scanPlugin),
    }
  }

  static duplicatePluginConf(plugin) {
    return {
      ...omit(plugin, ['id', 'label', 'parameters', 'businessId']),
      label: plugin.pluginId ? `${plugin.pluginId}-${Date.now()}` : Date.now(),
      parameters: map(plugin.parameters, (parameter) => omit(parameter, ['id'])) || [],
    }
  }

  state = {
    cronDescOpened: false,
  }

  UNSAFE_componentWillMount() {
    const {
      chain, mode, storages, initialize,
    } = this.props
    let initialValues

    switch (mode) {
      case 'create':
        initialValues = {
          ...AcquisitionProcessingChainFormComponent.getNewIntialValues(),
          storages: AcquisitionProcessingChainStorageConfComponent.initDefaultStorages(storages),
        }
        break
      case 'duplicate':
        if (chain) {
          initialValues = {
            ...AcquisitionProcessingChainFormComponent.getDuplicatedInitialValues(chain),
            storages: AcquisitionProcessingChainStorageConfComponent.initStorages(chain, storages),
          }
        } else {
          throw new Error('No chain loaded')
        }
        break
      case 'edit':
        if (chain) {
          initialValues = {
            ...chain.content,
            storages: AcquisitionProcessingChainStorageConfComponent.initStorages(chain, storages),
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

  switchCronDialog = () => {
    this.setState({
      cronDescOpened: !this.state.cronDescOpened,
    })
  }

  renderFileInfoItemLabel = (item) => item.comment || this.context.intl.formatMessage({ id: 'acquisition-chain.form.fileInfos.list.item.title' })

  render() {
    const {
      chain, onSubmit, handleSubmit, mode, hasModeAuto,
      invalid, pristine, submitting, onBack,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { periodicity } } = this.context

    const infoMessage = (
      <span>
        {formatMessage({ id: 'acquisition-chain.form.informations-1' })}
        <ul>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-2' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-3' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-4' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-5' })}</li>
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

    const componentProps = { changeField: this.props.changeField }
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
                  key="versioningMode"
                  name="versioningMode"
                  fullWidth
                  component={RenderSelectField}
                  hintText={formatMessage({ id: 'acquisition-chain.form.general.section.version.mode' })}
                  floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.version.mode' })}
                  validate={required}
                >
                  {AcquisitionProcessingChainFormComponent.ORDERED_VERSIONING_MODES.map((versionMode) => (
                    <MenuItem
                      key={versionMode}
                      value={versionMode}
                      primaryText={formatMessage({ id: `acquisition-chain.form.general.section.version.mode.${versionMode}` })}
                    />))}
                </Field>
                <Field
                  key="mode"
                  name="mode"
                  fullWidth
                  component={RenderSelectField}
                  hintText={formatMessage({ id: 'acquisition-chain.form.general.section.starting.mode' })}
                  floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.starting.mode' })}
                  validate={required}
                >
                  {map(DataProviderDomain.AcquisitionProcessingChainModes, (activationMode, key) => (
                    <MenuItem
                      className={`selenium-pick-mode-${activationMode}`}
                      value={activationMode}
                      key={key}
                      primaryText={formatMessage({ id: `acquisition-chain.form.general.section.starting.mode.${activationMode}` })}
                    />
                  ))}
                </Field>
                {hasModeAuto ? (
                  <div style={periodicity.layout}>
                    <div style={periodicity.field}>
                      <Field
                        name="periodicity"
                        fullWidth
                        component={RenderTextField}
                        type="text"
                        label={formatMessage({ id: 'acquisition-chain.form.general.section.periodicity' })}
                        validate={validateCron}
                      />
                    </div>
                    <div style={periodicity.help}>
                      <IconButton
                        tooltip={formatMessage({ id: 'acquisition-chain.form.general.section.cron.description.tooltip' })}
                        onClick={this.switchCronDialog}
                      >
                        <HelpCircle />
                      </IconButton>
                    </div>
                  </div>
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
                  entitiesConfig={AcquisitionProcessingChainFormComponent.INGEST_PROCESSING_CHAIN_CONFIG}
                  validate={required}
                />
                <FieldArray
                  name="categories"
                  fullWidth
                  component={RenderFieldArray}
                  canBeEmpty
                  label={formatMessage({ id: 'acquisition-chain.form.general.section.periodicity' })}
                  title={formatMessage({ id: 'acquisition-chain.form.general.section.info.category' })}
                  warningText={formatMessage({ id: 'acquisition-chain.form.general.section.click.category.add.warn' })}
                  alreadyExistText={formatMessage({ id: 'acquisition-chain.form.general.section.click.category.add.exist' })}
                  floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.category-hint' })}
                />
              </Tab>
              <Tab
                label={formatMessage({ id: 'acquisition-chain.form.fileInfos.section' })}
                className="selenium-filesTab"
              >
                <FieldArray
                  name="fileInfos"
                  component={RenderArrayObjectField}
                  fieldProps={componentProps}
                  elementLabel={this.renderFileInfoItemLabel}
                  fieldComponent={AcquisitionFileInfoComponent}
                  duplicationTransformation={AcquisitionProcessingChainFormComponent.duplicateFileInfo}
                  canBeEmpty={false}
                  listHeight="600px"
                  validate={required}
                />
              </Tab>
              <Tab
                label={formatMessage({ id: 'acquisition-chain.form.storage.section' })}
                className="selenium-storageTab"
              >
                <AcquisitionProcessingChainStorageConfComponent
                  chain={chain}
                  changeField={this.props.changeField}
                  storages={this.props.storages}
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
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={mode === 'create' || mode === 'duplicate'
                ? formatMessage({ id: 'acquisition-chain.form.create.button' })
                : formatMessage({ id: 'acquisition-chain.form.update.button' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || pristine || invalid}
              secondaryButtonLabel={formatMessage({ id: 'acquisition-chain.form.cancel.button' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
          <CronDescriptionDialog
            opened={this.state.cronDescOpened}
            onClose={this.switchCronDialog}
          />
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
