/**
 * LICENSE_PLACEHOLDER
 **/
import { map, find } from 'lodash'
import { Toggle } from 'redux-form-material-ui'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { PluginParameter, PluginParameterType } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import moduleStyles from '../styles/styles'

const styles = moduleStyles()
/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginParameterListSubFormComponent extends React.Component {

  static propTypes = {
    pluginParameterList: React.PropTypes.arrayOf(PluginParameter),
    pluginParameterTypeList: React.PropTypes.arrayOf(PluginParameterType),
  }

  /**
   * Builds the right {@link Field} component based on the passed plugin parameter.
   *
   * @param pluginParameter
   * @returns {XML}
   */
  getField = (pluginParameter) => {
    const key = pluginParameter.id
    const name = pluginParameter.name
    const type = find(this.props.pluginParameterTypeList, pluginParameterType => pluginParameterType.name === name)
    switch (type.type) {
      case 'java.lang.String':
      case 'java.lang.Character':
        return (
          <Field
            key={key}
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
            key={key}
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
            key={key}
            name={name}
            fullWidth
            component={Toggle}
            type={'boolean'}
            style={styles.pluginConfiguration.form.toggle}
            label={name}
          />
        )
      default:
        return (
          <Field
            key={key}
            name={name}
            fullWidth
            component={RenderTextField}
            type={'text'}
            label={name}
          />
        )
    }
  }

  render() {
    const { pluginParameterList } = this.props
    const fields = map(pluginParameterList, this.getField)

    return (
      <Card style={{ marginTop: 20 }}>
        <CardTitle title={'Parameters'} />
        <CardText>
          {fields}
        </CardText>
      </Card>
    )
  }
}

export default PluginParameterListSubFormComponent
