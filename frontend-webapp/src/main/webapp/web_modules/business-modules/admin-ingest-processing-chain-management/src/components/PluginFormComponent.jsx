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
import { PluginConfigurator, PluginListContainer } from '@regardsoss/microservice-plugin-configurator'
import { CommonShapes } from '@regardsoss/shape'
/**
 * Component to display a PluginConfigurator for one of the configurable plugins of an ingest processing chain.
 * Every ingest processing chain contains many plugins to configure. @see IngestProcessingPluginType
 * @author Sébastien Binda
 */
export class PluginFormComponent extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    ingestPluginType: PropTypes.string.isRequired,
    pluginConf: CommonShapes.PluginConfigurationContent,
    fieldNamePrefix: PropTypes.string,
    reduxFormChange: PropTypes.func.isRequired,
    reduxFormGetField: PropTypes.func.isRequired,
    reduxFormInitialize: PropTypes.func.isRequired,
  }

  state = {
    selectedPluginMetaData: null,
  }

  handleSelectPluginMetaData = (selectedPluginMetaData) => {
    this.setState({
      selectedPluginMetaData,
    })
    // Plugin configuration removed from chain
    if (selectedPluginMetaData === null) {
      this.props.reduxFormChange(this.props.fieldNamePrefix, null)
    }
  }

  render() {
    const { reduxFormInitialize, reduxFormGetField, reduxFormChange, fieldNamePrefix, ingestPluginType, pluginConf, selectLabel, title } = this.props
    const styles = {
      display: 'flex',
      alignItems: 'baseline',
    }
    const storePath = ['admin', 'acquisition', 'processing-chain-management', 'pluginConfigurator']
    return (
      <div>
        <div style={styles}>
          <PluginListContainer
            title={title}
            selectLabel={selectLabel}
            microserviceName={'rs-ingest'}
            pluginType={ingestPluginType}
            storePath={storePath}
            selectedPluginId={pluginConf ? pluginConf.pluginId : null}
            handleSelect={this.handleSelectPluginMetaData}
            displayTitle={false}
          />
        </div>
        {this.state.selectedPluginMetaData ?
          <PluginConfigurator
            microserviceName={'rs-ingest'}
            pluginMetaData={this.state.selectedPluginMetaData}
            pluginConfiguration={pluginConf}
            formMode={this.props.pluginConf && this.props.pluginConf.pluginId === this.state.selectedPluginMetaData.pluginId ? 'edit' : 'create'}
            reduxFormChange={reduxFormChange}
            reduxFormGetField={reduxFormGetField}
            reduxFormfieldNamePrefix={fieldNamePrefix}
            reduxFormInitialize={reduxFormInitialize}
            newPluginConfLabel={`chain-${fieldNamePrefix}`}
            hideGlobalParameterConf
          /> : null}
      </div>
    )
  }

}
export default PluginFormComponent