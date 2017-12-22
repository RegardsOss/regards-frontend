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
import forEach from 'lodash/forEach'
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { reduxForm, Field } from 'redux-form'
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import RenderPluginConfField from '../form-utils/RenderPluginConfField'
import PluginFormUtils from '../tools/PluginFormUtils'
import messages from '../i18n'

/**
 * Display a form to configure (edition or creation) a Pluginconfiguration for a given PluginMetaData.
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class PluginFormComponent extends React.Component {
  static propTypes = {
    pluginConfiguration: CommonShapes.PluginConfiguration,
    pluginMetaData: CommonShapes.PluginMetaData.isRequired,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    microserviceName: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isEditing: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  // Redux-form field name for current plugin configuration
  static confFieldName = 'pluginConfiguration'

  constructor(props) {
    super(props)
    this.handleInitialize()
  }

  onSubmit = (values) => {
    // 1. Check if there is MapParameter to reformat before sending
    const formatedValues = PluginFormUtils.formatPluginConfForReduxFormSubmit(values[PluginFormComponent.confFieldName], this.props.pluginMetaData)
    this.props.onSubmit(formatedValues)
  }


  /**
   * Initialize redux-form values with the given pluginConfiguration if any or with an new empty one.
   */
  handleInitialize = () => {
    const {
      pluginConfiguration, pluginMetaData, initialize, isEditing,
    } = this.props
    // The values are serialized by the backend. So deseralize it all here

    const formatedConf = pluginConfiguration ?
      PluginFormUtils.formatPluginConfForReduxFormInit(pluginConfiguration, pluginMetaData, true) : null

    let initialValues
    if (isEditing) {
      // Edition mode
      initialValues = formatedConf
    } else if (formatedConf) {
      // Duplication mode
      // Deep copy pluginConfiguration
      initialValues = formatedConf
      // In copy mode remove id of the duplicated pluginConfiguration
      delete initialValues.id
      // In copy mode remove id of each pluginParameters
      if (initialValues.parameters && initialValues.parameters.length > 0) {
        forEach(initialValues.parameters, (parameter, key) => {
          delete initialValues.parameters[key].id
        })
      }
    } else {
      // Creation mode
      initialValues = {
        active: true,
        pluginId: pluginMetaData.pluginId,
        pluginClassName: pluginMetaData.pluginClassName,
        version: pluginMetaData.version,
        priorityOrder: 1,
        parameters: [],
      }
    }
    initialize({ [PluginFormComponent.confFieldName]: initialValues })
  }

  /**
   * Returns React component
   * @returns {XML}
   */
  render() {
    const {
      pluginConfiguration, microserviceName, handleSubmit, submitting, invalid, isEditing, backUrl, pluginMetaData,
    } = this.props
    const { intl: { formatMessage } } = this.context

    const title = isEditing ?
      formatMessage({ id: 'plugin.configuration.form.edit.title' }, { name: pluginConfiguration.label }) :
      formatMessage({ id: 'plugin.configuration.form.create.title' })

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Card>
          <CardTitle title={title} />
          <CardText>
            <Field
              name={PluginFormComponent.confFieldName}
              component={RenderPluginConfField}
              microserviceName={microserviceName}
              pluginMetaData={pluginMetaData}
            />
          </CardText>

          <CardActions>
            <CardActionsComponent
              mainButtonLabel={isEditing ?
                formatMessage({ id: 'plugin.configuration.form.action.submit.save' }) :
                formatMessage({ id: 'plugin.configuration.form.action.submit.add' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'plugin.configuration.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'plugin-configuration-form',
})(withI18n(messages)(PluginFormComponent))

