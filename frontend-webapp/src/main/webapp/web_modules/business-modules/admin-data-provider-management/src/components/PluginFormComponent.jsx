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

  static listLabelStyle = { minWidth: '220px' }

  state = {
    selectedPluginMetaData: null,
  }

  getPluginSelector = () => {
    const {
      ingestPluginType, pluginConf, selectLabel, title,
    } = this.props
    const storePath = ['admin', 'acquisition', 'processing-chain-management', 'pluginConfigurator']
    return (
      <PluginListContainer
        key="selector"
        title={title}
        selectLabel={selectLabel}
        labelStyles={PluginFormComponent.listLabelStyle}
        microserviceName={STATIC_CONF.MSERVICES.DATA_PROVIDER}
        pluginType={ingestPluginType}
        storePath={storePath}
        selectedPluginId={pluginConf ? pluginConf.pluginId : null}
        handleSelect={this.handleSelectPluginMetaData}
        displayTitle={false}
      />
    )
  }

  getPluginConfigurator = () => {
    const {
      reduxFormInitialize, reduxFormGetField, reduxFormChange, fieldNamePrefix, pluginConf,
    } = this.props
    if (this.state.selectedPluginMetaData) {
      return (
        <PluginConfigurator
          key="configurator"
          microserviceName={STATIC_CONF.MSERVICES.DATA_PROVIDER}
          pluginMetaData={this.state.selectedPluginMetaData}
          pluginConfiguration={pluginConf}
          formMode={this.props.pluginConf && this.props.pluginConf.pluginId === this.state.selectedPluginMetaData.pluginId ? 'edit' : 'create'}
          reduxFormChange={reduxFormChange}
          reduxFormGetField={reduxFormGetField}
          reduxFormfieldNamePrefix={fieldNamePrefix}
          reduxFormInitialize={reduxFormInitialize}
          newPluginConfLabel={`chain-${fieldNamePrefix}`}
          hideGlobalParameterConf
        />
      )
    }
    return null
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
    return [this.getPluginSelector(), this.getPluginConfigurator()]
  }
}
export default PluginFormComponent
