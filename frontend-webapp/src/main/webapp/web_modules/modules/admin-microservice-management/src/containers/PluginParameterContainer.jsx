/**
 * LICENSE_PLACEHOLDER
 **/
import { chain } from 'lodash'
import { ListItem } from 'material-ui/List'
import MenuItem from 'material-ui/MenuItem'
import { Toggle, SelectField } from 'redux-form-material-ui'
import { connect } from '@regardsoss/redux'
import { PluginParameter, PluginParameterType, PluginConfigurationList } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import PluginMetaDataSelectors from '../model/PluginMetaDataSelectors'
import PluginMetaDataActions from '../model/PluginMetaDataActions'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'
import PluginConfigurationActions from '../model/PluginConfigurationActions'
import moduleStyles from '../styles/styles'

// validation functions
const required = value => value == null ? 'Required' : undefined

/**
 * Renders a field in view or edit mode based on a pluginParameter and it's type.
 * For example, a parameter of type java.lang.String will be rendered as a {@link TextField},
 * and a paramater of type java.lang.Boolean will be rendered as a {@link Toggle}.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterContainer extends React.Component {

  static propTypes = {
    // from router or parent
    // params: React.PropTypes.shape({
    //   microserviceName: React.PropTypes.string,
    // }),
    pluginParameter: PluginParameter,
    pluginParameterType: PluginParameterType,
    mode: React.PropTypes.oneOf(['view', 'edit']),
    // form mapStateToProps
    // pluginConfigurationList: PluginConfigurationList,
    // from mapDispatchToProps
    // fetchPluginMetaDataList: React.PropTypes.func,
    // fetchPluginConfigurationList: React.PropTypes.func,
  }

  static defaultProps = {
    mode: 'view',
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'view',
    }
  }

  componentWillMount() {
    // const { params: { microserviceName }, pluginParameterType } = this.props
    // if (pluginParameterType.paramType === 'PRIMITIVE') {
    //   this.props.fetchPluginConfigurationList(microserviceName, pluginParameterType.type)
    // }
  }

  render() {
    const styles = moduleStyles(this.context.muiTheme)
    const { pluginParameter, pluginParameterType, mode } = this.props
    // const { pluginParameter, pluginParameterType, mode, pluginConfigurationList } = this.props
    const { name, value } = pluginParameter
    const pluginConfigurationList =  [
      {
        "id": 0,
        "label": "Cool configuration",
        "version": "2.0.0",
        "priorityOrder": 0,
        "active": true,
        "pluginClassName": "Kerberos",
        "pluginId": "0",
        "parameters": [
          {
            "id": 0,
            "name": "suffix",
            "value": "_thesuffix",
            "dynamic": false
          },
          {
            "id": 1,
            "name": "coeff",
            "value": "9",
            "dynamic": false
          },
          {
            "id": 2,
            "name": "isActive",
            "value": "true",
            "dynamic": false
          },
          {
            "id": 3,
            "name": "plgInterface",
            "value": "0",
            "dynamic": false
          }
        ]
      },
      {
        "id": 1,
        "label": "Not cool configuration",
        "version": "1.1.1",
        "priorityOrder": 1,
        "active": true,
        "pluginClassName": "Kerberos",
        "pluginId": "0",
        "parameters": [
          {
            "id": 0,
            "name": "suffix",
            "value": "_theothersuffix",
            "dynamic": false
          },
          {
            "id": 1,
            "name": "coeff",
            "value": "2",
            "dynamic": false
          },
          {
            "id": 2,
            "name": "isActive",
            "value": "false",
            "dynamic": false
          }
        ]
      },
      {
        "id": 2,
        "label": "Random configuration",
        "version": "0.0.1",
        "priorityOrder": 2,
        "active": false,
        "pluginClassName": "Kerberos",
        "pluginId": "0",
        "parameters": [
          {
            "id": 0,
            "name": "suffix",
            "value": "_thesuffix",
            "dynamic": false
          },
          {
            "id": 1,
            "name": "coeff",
            "value": "9",
            "dynamic": false
          },
          {
            "id": 2,
            "name": "isActive",
            "value": "true",
            "dynamic": false
          }
        ]
      },
      {
        "id": 3,
        "label": "Other random configuration",
        "version": "v12",
        "priorityOrder": 3,
        "active": true,
        "pluginClassName": "Kerberos",
        "pluginId": "0",
        "parameters": [
          {
            "id": 0,
            "name": "suffix",
            "value": "_çasuffix",
            "dynamic": false
          },
          {
            "id": 1,
            "name": "coeff",
            "value": "3",
            "dynamic": false
          },
          {
            "id": 2,
            "name": "isActive",
            "value": "true",
            "dynamic": false
          }
        ]
      }
    ]

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value.toString()}</ListItem>
      case 'edit':
        switch (pluginParameterType.paramType) {
          case 'PRIMITIVE':
            switch (pluginParameterType.type) {
              case 'java.lang.String':
              case 'java.lang.Character':
                return (
                  <Field
                    name={name}
                    fullWidth
                    component={RenderTextField}
                    type={'text'}
                    label={name}
                  />
                )
              case 'java.lang.Byte':
              case 'java.lang.Integer':
              case 'java.lang.Long':
              case 'java.lang.Float':
              case 'java.lang.Double':
              case 'java.lang.Short':
                return (
                  <Field
                    name={name}
                    fullWidth
                    component={RenderTextField}
                    type={'number'}
                    label={name}
                  />
                )
              case 'java.lang.Boolean':
                return (
                  <Field
                    name={name}
                    component={Toggle}
                    type={'boolean'}
                    style={styles.pluginConfiguration.form.toggle}
                    label={name}
                  />
                )
              default:
                return (
                  <Field
                    name={name}
                    fullWidth
                    component={RenderTextField}
                    type={'text'}
                    label={name}
                  />
                )
            }
          case 'PLUGIN':
          default:
            return (
              <Field
                name={name}
                component={SelectField}
                hintText={`${name} - ${pluginParameterType.type}`}
                floatingLabelText={`${name} - ${pluginParameterType.type}`}
                validate={required}
                fullWidth
                autoWidth
              >
                {chain(pluginConfigurationList)
                  .filter(pluginConfiguration => pluginConfiguration.active)
                  .sort(pluginConfiguration => pluginConfiguration.priorityOrder)
                  .map(pluginConfiguration => (
                    <MenuItem value={pluginConfiguration.id} primaryText={pluginConfiguration.label}/>
                  ))
                  .value()}
                {chain(pluginConfigurationList)
                  .filter(pluginConfiguration => !pluginConfiguration.active)
                  .sort(pluginConfiguration => pluginConfiguration.priorityOrder)
                  .map(pluginConfiguration => (
                    <MenuItem value={pluginConfiguration.id} primaryText={pluginConfiguration.label}/>
                  ))
                  .value()}
              </Field>
            )
        }
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  // pluginConfigurationList: PluginConfigurationSelectors.getListByPluginClassName(state, ownProps.pluginParameterType.type),
})

const mapDispatchToProps = dispatch => ({
  // fetchPluginConfigurationList: (microserviceName, pluginClassName) => dispatch(PluginConfigurationActions.fetchPagedEntityListByPluginClassName(0, 100, {
  //   microserviceName,
  //   pluginClassName,
  // })),
})

export default PluginParameterContainer
// export default connect(mapStateToProps, mapDispatchToProps)(PluginParameterContainer)
