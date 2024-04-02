/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import get from 'lodash/get'
import map from 'lodash/map'
import omit from 'lodash/omit'
import MenuItem from 'material-ui/MenuItem'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { RenderSelectField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { modelActions } from '../clients/ModelClient'
import styles from '../styles'
import messages from '../i18n'

export class RenderModelParameterField extends React.Component {
    static propTypes = {
      pluginParameterType: CommonShapes.PluginParameterType.isRequired, // Parameter definition to configure
      disabled: PropTypes.bool, // Disable all fields
      // from mapDispatchToProps
      fetchModelList: PropTypes.func.isRequired,
      // From redux field
      input: PropTypes.shape(fieldInputPropTypes).isRequired,
      meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    }

    /** Name of properties to not report onto the RenderSelectField field */
    static NON_REPORTED_PROPERTIES = [
      'fetchModelList',
      'pluginParameterType',
      'microserviceName',
    ]

    static mapDispatchToProps = (dispatch) => ({
      fetchModelList: () => dispatch(modelActions.fetchEntityList()),
    })

    static defaultProps = {
      disabled: false,
    }

    static contextTypes = {
      ...themeContextType,
      ...i18nContextType,
    }

    state = {
      modelList: [],
    }

    componentDidMount() {
      const {
        fetchModelList,
      } = this.props

      // 2. Retrieve all models available
      fetchModelList().then((actionResults) => {
        if (!actionResults.error) {
          this.setState({
            modelList: get(actionResults, 'payload.entities.model', []),
          })
        }
      })
    }

    render() {
      const {
        disabled, input, pluginParameterType,
      } = this.props
      const { modelList } = this.state

      const validators = []
      if (pluginParameterType && !pluginParameterType.optional) {
        validators.push(ValidationHelpers.required)
      }

      const reportedProps = omit(this.props, RenderModelParameterField.NON_REPORTED_PROPERTIES)

      return (
        <Field
          name={`${input.name}`}
          fullWidth
          component={RenderSelectField}
          validate={validators}
          disabled={disabled}
          label={pluginParameterType.label}
          {...reportedProps}
        >
          {map(modelList, (model, id) => (
            <MenuItem
              value={model.content.name}
              key={id}
              primaryText={model.content.name}
            />
          ))}
        </Field>
      )
    }
}

export default compose(connect(null, RenderModelParameterField.mapDispatchToProps), withI18n(messages, true), withModuleStyle(styles, true))(RenderModelParameterField)
