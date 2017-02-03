/**
 * LICENSE_PLACEHOLDER
 **/

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { Plugin } from '@regardsoss/model'

/**
 * React component to display static informations from loaded plugin
 * @author Sébastien Binda
 */
class PluginDefinitionComponent extends React.Component {

  static propTypes = {
    handlePluginValid: React.PropTypes.func.isRequired,
    plugin: Plugin,
  }

  componentWillMount() {
    this.props.handlePluginValid(this.props.plugin)
  }

  render() {
    const { info } = this.props.plugin
    const title = `${info.name} - version ${info.version}`
    const subtitle = `${info.author} - ${info.company}`
    return (
      <Card>
        <CardHeader
          title={title}
          subtitle={subtitle}
        />
        <CardText>
          {info.description}
        </CardText>
      </Card>
    )
  }
}
export default PluginDefinitionComponent
