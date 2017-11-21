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
import { Card, CardActions } from 'material-ui/Card'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { reduxForm } from '@regardsoss/form-utils'
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import moduleStyles from '../styles/styles'
import PluginConfigurationComponent from './PluginConfigurationComponent'

/**
 * Display edit and create fragment form
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormComponent extends React.Component {

  static propTypes = {
    pluginConfiguration: CommonShapes.PluginConfiguration,
    pluginMetaData: CommonShapes.PluginMetaData,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    microserviceName: PropTypes.string.isRequired,
    displayTitle: PropTypes.bool,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    getField: PropTypes.func,
  }

  static defaultProps = {
    formMode: 'create',
    displayTitle: true,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.formMode === 'create',
      isEditing: props.formMode === 'edit',
      isCopying: props.formMode === 'copy',
    }
  }

  /**
   * Returns React component
   *
   * @returns {XML}
   */
  render() {
    const { microserviceName, displayTitle, pluginMetaData, pluginConfiguration, handleSubmit, submitting, invalid, backUrl, change, formMode } = this.props

    const styles = moduleStyles(this.context.muiTheme)

    return (
      <form
        onSubmit={handleSubmit(this.props.onSubmit)}
      >
        <PluginConfigurationComponent
          microserviceName={microserviceName}
          displayTitle={displayTitle}
          pluginConfiguration={pluginConfiguration}
          pluginMetaData={pluginMetaData}
          formMode={formMode}
          reduxFormChange={change}
          reduxFormInitialize={this.props.initialize}
          reduxFormGetField={this.props.getField}
        />

        <Card style={styles.pluginConfiguration.form.section}>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.state.isEditing ?
                this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.action.submit.save' }) :
                this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.action.submit.add' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

const selector = formValueSelector('plugin-configuration-form')
const mapStateToProps = state => ({
  getField: field => selector(state, field),
})
const ConnectedComponent = connect(mapStateToProps)(PluginConfigurationFormComponent)

export default reduxForm({
  form: 'plugin-configuration-form',
})(ConnectedComponent)

