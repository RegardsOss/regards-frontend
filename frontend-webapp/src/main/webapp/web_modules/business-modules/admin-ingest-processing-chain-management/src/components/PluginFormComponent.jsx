import { PluginConfigurator, PluginListContainer } from '@regardsoss/microservice-plugin-configurator'
import { CommonShapes } from '@regardsoss/shape'

export class PluginFormComponent extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    ingestPluginType: PropTypes.string.isRequired,
    pluginConf: CommonShapes.PluginConfigurationContent,
    fieldNamePrefix: PropTypes.string,
    reduxFormChange: PropTypes.func.isRequired,
  }

  state = {
    selectedPluginMetaData: null,
  }

  handleSelectPluginMetaData = (selectedPluginMetaData) => {
    this.setState({
      selectedPluginMetaData,
    })
  }

  render() {
    const { reduxFormChange, fieldNamePrefix, ingestPluginType, pluginConf, title } = this.props
    const styles = {
      display: 'flex',
      alignItems: 'baseline',
    }
    const storePath = ['admin', 'acquisition', 'processing-chain-management', 'pluginConfigurator']
    return (
      <div>
        <div style={styles}>
          <span>{title}</span>
          <PluginListContainer
            microserviceName={'rs-ingest'}
            pluginType={ingestPluginType}
            storePath={storePath}
            selectedPluginId={pluginConf ? pluginConf.pluginId : null}
            handleSelect={this.handleSelectPluginMetaData}
            displayTitle={false}
            fieldNamePrefix={fieldNamePrefix}
          />
        </div>
        {this.state.selectedPluginMetaData ?
          <PluginConfigurator
            microserviceName={'rs-ingest'}
            pluginMetaData={this.state.selectedPluginMetaData}
            pluginConfiguration={pluginConf}
            formMode={this.props.pluginConf ? 'edit' : 'create'}
            reduxFormChange={reduxFormChange}
            fieldNamePrefix={fieldNamePrefix}
            newPluginConfLabel={`chain-${fieldNamePrefix}`}
            hideGlobalParameterConf
          /> : null}
      </div>
    )

    // TODO : Ajouter le nom de la chaine dans le plugin label
  }

}
export default PluginFormComponent
