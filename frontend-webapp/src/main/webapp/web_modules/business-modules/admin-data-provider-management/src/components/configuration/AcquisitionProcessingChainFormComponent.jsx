/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Tabs, Tab } from 'material-ui/Tabs'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { reduxForm } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { DataProviderShapes } from '@regardsoss/shape'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, HelpMessageComponent } from '@regardsoss/components'
import {
  RenderTextField, RenderPageableAutoCompleteField, RenderSelectField,
  RenderArrayObjectField, RenderCheckbox, ValidationHelpers, Field, FieldArray,
} from '@regardsoss/form-utils'
import { DataProviderDomain } from '@regardsoss/domain'
import { datasetActions, datasetEntitiesKey } from '../../clients/DatasetClient'
import { ingestProcessingChainActions, ingestProcessingChainEntitiesKey } from '../../clients/IngestProcessingChainClient'
import AcquisitionProcessingChainFormPluginsComponent from './AcquisitionProcessingChainFormPluginsComponent'
import AcquisitionFileInfoComponent from './AcquisitionFileInfoComponent'
import styles from '../../styles'
import messages from '../../i18n'

const {
  required, validStringSize,
} = ValidationHelpers
const validRequiredString255 = [required, validStringSize(1, 255)]

/**
* Component to display a form of AcquisitionProcessingChain entity
* @author Sébastien Binda
*/
class AcquisitionProcessingChainFormComponent extends React.PureComponent {
  static propTypes = {
    chain: DataProviderShapes.AcquisitionProcessingChain,
    mode: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    // from reduxForm
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentWillMount() {
    const { chain, mode } = this.props
    if (chain) {
      if (mode === 'duplicate') {
        const duplicatedChain = omit(chain.content, [
          'id', 'label', 'running', 'lastDateActivation', 'fileInfos',
          'productPluginConf', 'generatePluginConf', 'validationPluginConf',
          'postProcessSipPluginConf',
        ])
        duplicatedChain.fileInfos = map(chain.content.fileInfos, this.duplicateFileInfo)
        if (chain.content.validationPluginConf) {
          duplicatedChain.validationPluginConf = this.duplicatePluginConf(chain.content.validationPluginConf)
        }
        if (chain.content.productPluginConf) {
          duplicatedChain.productPluginConf = this.duplicatePluginConf(chain.content.productPluginConf)
        }
        if (chain.content.generateSipPluginConf) {
          duplicatedChain.generateSipPluginConf = this.duplicatePluginConf(chain.content.generateSipPluginConf)
        }
        if (chain.content.postProcessSipPluginConf) {
          duplicatedChain.postProcessSipPluginConf = this.duplicatePluginConf(chain.content.postProcessSipPluginConf)
        }
        this.props.initialize(duplicatedChain)
      } else {
        this.props.initialize(chain.content)
      }
    } else {
      const initialValues = {
        active: true,
        fileInfos: [this.getEmptyFileInfo()],
      }
      this.props.initialize(initialValues)
    }
  }

  getEmptyFileInfo = () => ({
    mandatory: true,
  })

  duplicateFileInfo = (fileInfo) => {
    const duplicatedFileInfo = omit(fileInfo, ['id', 'scanPlugin'])
    return duplicatedFileInfo
  }

  duplicatePluginConf = (plugin) => {
    const duplicatedPluginConf = omit(plugin, ['id', 'label'])
    duplicatedPluginConf.label = plugin.pluginId ? `${plugin.pluginId}-${Date.now()}` : Date.now()
    return duplicatedPluginConf
  }

  handleModeChange = (event, index, value, input) => {
    input.onChange(value)
  }

  renderActionButtons = () => {
    const { intl: { formatMessage } } = this.context
    const {
      invalid, submitting, onBack, mode,
    } = this.props
    const label = mode === 'create' || mode === 'duplicate' ?
      formatMessage({ id: 'acquisition-chain.form.create.button' }) :
      formatMessage({ id: 'acquisition-chain.form.update.button' })
    return (
      <CardActions>
        <CardActionsComponent
          mainButtonLabel={label}
          mainButtonType="submit"
          isMainButtonDisabled={submitting || invalid}
          secondaryButtonLabel={formatMessage({ id: 'acquisition-chain.form.cancel.button' })}
          secondaryButtonTouchClick={onBack}
        />
      </CardActions>
    )
  }

  renderFileInfoItemLabel = item => item.comment || this.context.intl.formatMessage({ id: 'acquisition-chain.form.fileInfos.list.item.title' })

  render() {
    const {
      chain, onSubmit, handleSubmit,
    } = this.props
    const { intl: { formatMessage } } = this.context

    const infoMessage = (
      <span>
        {formatMessage({ id: 'acquisition-chain.form.informations-1' })}
        <ul>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-2' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-3' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-4' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-5' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-6' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-7' })}</li>
          <li>{formatMessage({ id: 'acquisition-chain.form.informations-8' })}</li>
        </ul>
      </span>
    )

    const title = !chain ?
      formatMessage({ id: 'acquisition-chain.form.create.title' }) :
      formatMessage({ id: 'acquisition-chain.form.edit.title' }, { name: get(chain, 'content.label', '') })

    const ingestProcessingChainConfig = {
      text: 'name',
      value: 'name',
    }

    const datasetsConfig = {
      text: 'label',
      value: 'ipId',
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
              <Tab label={formatMessage({ id: 'acquisition-chain.form.general.section.title' })} >
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
                  key="mode"
                  name="mode"
                  fullWidth
                  component={RenderSelectField}
                  hintText={formatMessage({ id: 'acquisition-chain.form.general.section.mode' })}
                  floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.mode' })}
                  validate={required}
                >
                  {map(DataProviderDomain.AcquisitionProcessingChainModes, (mode, key) => (
                    <MenuItem
                      className={`selenium-pick-mode-${mode}`}
                      value={mode}
                      key={key}
                      primaryText={formatMessage({ id: `acquisition-chain.form.general.section.mode.${mode}` })}
                    />
                  ))}
                </Field>
                <Field
                  name="session"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={formatMessage({ id: 'acquisition-chain.form.general.section.session' })}
                />
                <Field
                  name="periodicity"
                  fullWidth
                  component={RenderTextField}
                  type="number"
                  label={formatMessage({ id: 'acquisition-chain.form.general.section.periodicity' })}
                />
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
                <Field
                  name="datasetIpId"
                  fullWidth
                  component={RenderPageableAutoCompleteField}
                  floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.dataset.select' })}
                  hintText={formatMessage({ id: 'acquisition-chain.form.general.section.dataset.select.hint' })}
                  pageSize={50}
                  entitiesFilterProperty="label"
                  entityActions={datasetActions}
                  entitiesPayloadKey={datasetEntitiesKey}
                  entitiesConfig={datasetsConfig}
                  validate={required}
                />
              </Tab>
              <Tab label={formatMessage({ id: 'acquisition-chain.form.fileInfos.section' })} >
                <FieldArray
                  name="fileInfos"
                  component={RenderArrayObjectField}
                  elementLabel={this.renderFileInfoItemLabel}
                  fieldComponent={AcquisitionFileInfoComponent}
                  getEmptyObject={this.getEmptyMetaFile}
                  duplicationTransfromation={this.duplicateMetaFile}
                  canBeEmpty={false}
                  listHeight="600px"
                  validate={required}
                />
              </Tab>
              <Tab label={formatMessage({ id: 'acquisition-chain.form.plugins.section' })} >
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

function validate(fieldValues) {
  const errors = {}
  if (!fieldValues.checkAcquisitionPluginConf) {
    errors.checkAcquisitionPluginConf = 'required !'
  }
  return errors
}

const connectedReduxForm = reduxForm({
  form: 'acquisition-chain-form',
  validate,
})(AcquisitionProcessingChainFormComponent)

export default withI18n(messages)(withModuleStyle(styles)(connectedReduxForm))
