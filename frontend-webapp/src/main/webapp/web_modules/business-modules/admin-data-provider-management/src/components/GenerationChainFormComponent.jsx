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
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'
import { connect } from '@regardsoss/redux'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { formValueSelector } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { DataProviderShapes } from '@regardsoss/shape'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, HelpMessageComponent } from '@regardsoss/components'
import { Field, FieldArray, RenderTextField, RenderPageableAutoCompleteField, RenderCheckbox, reduxForm, ValidationHelpers } from '@regardsoss/form-utils'
import { datasetActions, datasetEntitiesKey } from '../clients/DatasetClient'
import GenerationChainFormPluginsComponent from './GenerationChainFormPluginsComponent'
import MetaProductFormComponent from './MetaProductFormComponent'
import MetaFilesListFormComponent from './MetaFilesListFormComponent'
import styles from '../styles'
import messages from '../i18n'

const {
  required, validStringSize,
} = ValidationHelpers
const validString255 = [validStringSize(0, 255)]
const validRequiredString255 = [required, validStringSize(1, 255)]

/**
* Component to display a form of GenerationChain entity
* @author Sébastien Binda
*/
class GenerationChainFormComponent extends React.Component {
  static propTypes = {
    chain: DataProviderShapes.GenerationChain,
    mode: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    // from reduxForm
    change: PropTypes.func,
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    getField: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentDidMount() {
    const { chain, mode } = this.props
    if (chain) {
      if (mode === 'duplicate') {
        const duplicatedChain = omit(chain.content, ['id', 'metaProduct', 'metaFiles'])
        duplicatedChain.metaProduct = omit(chain.content.metaProduct, ['id'])
        duplicatedChain.metaFiles = map(chain.content.metaFiles, mf => omit(mf, ['id']))
        this.props.initialize(duplicatedChain)
      } else {
        this.props.initialize(chain.content)
      }
    } else {
      const initialValues = {
        active: true,
        metaProduct: {
          checksumAlgorithm: '',
          cleanOriginalFile: false,
          metaFiles: [
            {
              fileNamePattern: '',
              scanDirectory: '',
            },
          ],
        },
      }
      this.props.initialize(initialValues)
    }
  }

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
      chain, onSubmit, handleSubmit, change, initialize, getField,
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
                  name="comment"
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  validate={validString255}
                  label={formatMessage({ id: 'generation-chain.form.create.input.comment' })}
                />
                <Field
                  name="dataSetIpId"
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
                <Field
                  name="periodicity"
                  fullWidth
                  component={RenderTextField}
                  type="number"
                  label={formatMessage({ id: 'generation-chain.form.create.input.periodicity' })}
                />
                <MetaProductFormComponent />
                <Field
                  name="active"
                  fullWidth
                  component={RenderCheckbox}
                  label={formatMessage({ id: 'generation-chain.form.create.input.active' })}
                />
                <br />
                <Divider />
                <br />
              </Tab>
              <Tab label={formatMessage({ id: 'generation-chain.form.create.metafiles.section' })} >
                <FieldArray
                  name="metaProduct.metaFiles"
                  component={MetaFilesListFormComponent}
                  validate={required}
                />
              </Tab>
              <Tab label={formatMessage({ id: 'generation-chain.form.create.plugins.section' })} >
                <GenerationChainFormPluginsComponent
                  chain={chain}
                  change={change}
                  initialize={initialize}
                  getField={getField}
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
  return errors
}

const selector = formValueSelector('plugin-configuration-form')
const mapStateToProps = state => ({
  getField: field => selector(state, field),
})

const ConnectedComponent = connect(mapStateToProps)(GenerationChainFormComponent)

const connectedReduxForm = reduxForm({
  form: 'generation-chain-form',
  validate,
})(ConnectedComponent)

export default withI18n(messages)(withModuleStyle(styles)(connectedReduxForm))
