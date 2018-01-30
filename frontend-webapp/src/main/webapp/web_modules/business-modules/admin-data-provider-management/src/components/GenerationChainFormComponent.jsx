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
import map from 'lodash/map'
import omit from 'lodash/omit'
import { Tabs, Tab } from 'material-ui/Tabs'
import AutoComplete from 'material-ui/AutoComplete'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { reduxForm } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { DataProviderShapes } from '@regardsoss/shape'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, HelpMessageComponent } from '@regardsoss/components'
import {
  RenderTextField, RenderPageableAutoCompleteField, RenderAutoCompleteField,
  RenderArrayObjectField, RenderCheckbox, ValidationHelpers, Field, FieldArray,
} from '@regardsoss/form-utils'
import { DataProviderDomain } from '@regardsoss/domain'
import { datasetActions, datasetEntitiesKey } from '../clients/DatasetClient'
import { ingestProcessingChainActions, ingestProcessingChainEntitiesKey } from '../clients/IngestProcessingChainClient'
import GenerationChainFormPluginsComponent from './GenerationChainFormPluginsComponent'
import AcquisitionFileInfoComponent from './AcquisitionFileInfoComponent'
import styles from '../styles'
import messages from '../i18n'

const {
  required, validStringSize,
} = ValidationHelpers
const validRequiredString255 = [required, validStringSize(1, 255)]

/**
* Component to display a form of GenerationChain entity
* @author Sébastien Binda
*/
class GenerationChainFormComponent extends React.PureComponent {
  static propTypes = {
    chain: DataProviderShapes.GenerationChain,
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
        const duplicatedChain = omit(chain.content, ['id', 'running', 'lastDateActivation', 'fileInfos'])
        duplicatedChain.fileInfos = map(chain.content.fileInfos, this.duplicateFileInfo)
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

  duplicateFileInfo = fileInfo => omit(fileInfo, ['id'])

  renderActionButtons = () => {
    const { intl: { formatMessage } } = this.context
    const {
      chain, invalid, submitting, onBack,
    } = this.props
    const label = !chain ?
      formatMessage({ id: 'generation-chain.form.create.action.create' }) :
      formatMessage({ id: 'generation-chain.form.edit.action.save' })
    return (
      <CardActions>
        <CardActionsComponent
          mainButtonLabel={label}
          mainButtonType="submit"
          isMainButtonDisabled={submitting || invalid}
          secondaryButtonLabel={formatMessage({ id: 'generation-chain.form.create.action.cancel' })}
          secondaryButtonTouchTap={onBack}
        />
      </CardActions>
    )
  }

  render() {
    const {
      chain, onSubmit, handleSubmit,
    } = this.props
    const { intl: { formatMessage } } = this.context

    const infoMessage = (
      <span>
        {formatMessage({ id: 'generation-chain.form.informations-1' })}
        <ul>
          <li>{formatMessage({ id: 'generation-chain.form.informations-2' })}</li>
          <li>{formatMessage({ id: 'generation-chain.form.informations-3' })}</li>
          <li>{formatMessage({ id: 'generation-chain.form.informations-4' })}</li>
        </ul>
      </span>
    )

    const title = !chain ?
      formatMessage({ id: 'generation-chain.form.create.title' }) :
      formatMessage({ id: 'generation-chain.form.edit.title' }, { name: chain.name })

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
              <Tab label={formatMessage({ id: 'generation-chain.form.create.general.section' })} >
                <Field
                  name="label"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  validate={validRequiredString255}
                  label={formatMessage({ id: 'generation-chain.form.create.input.label' })}
                />
                <Field
                  name="active"
                  fullWidth
                  component={RenderCheckbox}
                  label={formatMessage({ id: 'generation-chain.form.create.input.active' })}
                />
                <Field
                  key="mode"
                  name="mode"
                  fullWidth
                  component={RenderAutoCompleteField}
                  hintText={formatMessage({ id: 'generation-chain.form.create.mode.hint' })}
                  floatingLabelText={formatMessage({ id: 'generation-chain.form.create.mode.label' })}
                  dataSource={DataProviderDomain.AcquisitionProcessingChainModes}
                  filter={AutoComplete.caseInsensitiveFilter}
                  validate={required}
                />
                <Field
                  name="session"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={formatMessage({ id: 'generation-chain.form.create.input.session' })}
                />
                <Field
                  name="periodicity"
                  fullWidth
                  component={RenderTextField}
                  type="number"
                  label={formatMessage({ id: 'generation-chain.form.create.input.periodicity' })}
                />
                <Field
                  name="ingestChain"
                  fullWidth
                  component={RenderPageableAutoCompleteField}
                  floatingLabelText={formatMessage({ id: 'generation-chain.form.create.input.ingestChain.select' })}
                  hintText={formatMessage({ id: 'generation-chain.form.create.input.ingestChain.select.hint' })}
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
                  floatingLabelText={formatMessage({ id: 'generation-chain.form.create.input.dataset.select' })}
                  hintText={formatMessage({ id: 'generation-chain.form.create.input.dataset.select.hint' })}
                  pageSize={50}
                  entitiesFilterProperty="label"
                  entityActions={datasetActions}
                  entitiesPayloadKey={datasetEntitiesKey}
                  entitiesConfig={datasetsConfig}
                  validate={required}
                />
              </Tab>
              <Tab label={formatMessage({ id: 'generation-chain.form.create.fileInfos.section' })} >
                <FieldArray
                  name="fileInfos"
                  component={RenderArrayObjectField}
                  elementLabel={formatMessage({ id: 'generation-chain.form.create.fileInfos.list.item.title' })}
                  fieldComponent={AcquisitionFileInfoComponent}
                  getEmptyObject={this.getEmptyMetaFile}
                  duplicationTransfromation={this.duplicateMetaFile}
                  canBeEmpty={false}
                  listHeight="600px"
                  validate={required}
                />
              </Tab>
              <Tab label={formatMessage({ id: 'generation-chain.form.create.plugins.section' })} >
                <GenerationChainFormPluginsComponent
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
  form: 'generation-chain-form',
  validate,
})(GenerationChainFormComponent)

export default withI18n(messages)(withModuleStyle(styles)(connectedReduxForm))
