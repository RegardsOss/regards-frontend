/**
 * LICENSE_PLACEHOLDER
 **/
import { map, find } from 'lodash'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { PluginParameter, PluginParameterType } from '@regardsoss/model'
import PluginParameterContainer from '../containers/PluginParameterContainer'

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

  render() {
    const { pluginParameterList, pluginParameterTypeList } = this.props
    const fields = map(pluginParameterList, (pluginParameter, index) =>
      <PluginParameterContainer
        key={index}
        pluginParameter={pluginParameter}
        pluginParameterType={find(pluginParameterTypeList, pluginParameterType => pluginParameterType.name === pluginParameter.name)}
        mode={'edit'}
      />,
    )

    return (
      <Card style={{ marginTop: 20 }}>
        <CardTitle title={'Parameters'}/>
        <CardText>
          {fields}
        </CardText>
      </Card>
    )
  }
}

export default PluginParameterListSubFormComponent
