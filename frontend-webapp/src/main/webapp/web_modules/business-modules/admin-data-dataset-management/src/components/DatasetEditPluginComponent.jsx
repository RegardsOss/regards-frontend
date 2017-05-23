/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import filter from 'lodash/filter'
import cloneDeep from 'lodash/cloneDeep'
import remove from 'lodash/remove'
import includes from 'lodash/includes'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { PluginConfiguration, PluginMetaData, LinkPluginDataset } from '@regardsoss/model'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import DatasetStepperComponent from './DatasetStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasetEditPluginComponent extends React.Component {

  static propTypes = {
    linkPluginDataset: LinkPluginDataset.isRequired,
    pluginConfigurationFiltersList: PropTypes.objectOf(PluginConfiguration),
    pluginConfigurationConvertersList: PropTypes.objectOf(PluginConfiguration),
    pluginConfigurationServicesList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataFiltersList: PropTypes.objectOf(PluginMetaData),
    pluginMetaDataConvertersList: PropTypes.objectOf(PluginMetaData),
    pluginMetaDataServicesList: PropTypes.objectOf(PluginMetaData),
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentLinkPluginDataset: cloneDeep(props.linkPluginDataset),
    }
  }

  onCheck = (type, pluginConfiguration, isInputChecked) => {
    const { currentLinkPluginDataset } = this.state
    if (isInputChecked) {
      currentLinkPluginDataset.content[type].push(pluginConfiguration.content.id)
    } else {
      currentLinkPluginDataset.content[type] = remove(currentLinkPluginDataset.content[type], id =>
        id !== pluginConfiguration.content.id,
      )
    }
    this.setState({
      currentLinkPluginDataset,
    })
  }

  getItemMetaData = (type, pluginMetaData, pluginConfigurationList) => {
    const pluginConfigurationAssociated = filter(pluginConfigurationList, pluginConfiguration =>
      pluginConfiguration.content.pluginId === pluginMetaData.content.pluginId,
    )
    return (
      <ShowableAtRender
        show={pluginConfigurationAssociated.length > 0}
        key={pluginMetaData.content.pluginId}
      >
        <ListItem
          primaryText={pluginMetaData.content.pluginId}
          secondaryText={pluginMetaData.content.version}
          disabled
          open
          autoGenerateNestedIndicator={false}
          nestedItems={
            map(pluginConfigurationAssociated, (pluginConfiguration, id) => (
              <ShowableAtRender
                show={pluginConfiguration.content.active}
                key={`plugin-configuration-${id}`}
              >
                <ListItem
                  primaryText={pluginConfiguration.content.label}
                  secondaryText={pluginConfiguration.content.version}
                  disabled
                  leftCheckbox={
                    <Checkbox
                      checked={this.isCheckboxChecked(type, pluginConfiguration)}
                      onCheck={(event, isInputChecked) => { this.onCheck(type, pluginConfiguration, isInputChecked) }}
                    />
                  }
                />
              </ShowableAtRender>
            ))
          }
        />
      </ShowableAtRender>)
  }

  isCheckboxChecked = (type, pluginConfiguration) => {
    const { currentLinkPluginDataset } = this.state
    return includes(currentLinkPluginDataset.content[type], pluginConfiguration.content.id)
  }

  render() {
    const {
      pluginConfigurationFiltersList,
      pluginConfigurationConvertersList,
      pluginConfigurationServicesList,
      pluginMetaDataFiltersList,
      pluginMetaDataConvertersList,
      pluginMetaDataServicesList,
      backUrl,
    } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="dataset.form.plugin.title" />}
          subtitle={<FormattedHTMLMessage id="dataset.form.plugin.subtitle" />}
        />
        <DatasetStepperComponent stepIndex={3} />
        <CardText>
          <div className="row">
            <div className="col-sm-33">
              <List>
                <Subheader><FormattedMessage id="dataset.form.plugin.filters" /></Subheader>
                <Divider />
                {map(pluginMetaDataFiltersList, (pluginMetaData, id) => (
                  this.getItemMetaData('filters', pluginMetaData, pluginConfigurationFiltersList)
                ))}
              </List>
            </div>
            <div className="col-sm-33">
              <List>
                <Subheader><FormattedMessage id="dataset.form.plugin.converters" /></Subheader>
                <Divider />
                {map(pluginMetaDataConvertersList, (pluginMetaData, id) => (
                  this.getItemMetaData('converters', pluginMetaData, pluginConfigurationConvertersList)
                ))}
              </List>
            </div>
            <div className="col-sm-33">
              <List>
                <Subheader><FormattedMessage id="dataset.form.plugin.services" /></Subheader>
                <Divider />
                {map(pluginMetaDataServicesList, (pluginMetaData, id) => (
                  this.getItemMetaData('services', pluginMetaData, pluginConfigurationServicesList)
                ))}
              </List>
            </div>
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={
              <FormattedMessage
                id="dataset.form.plugin.action.next"
              />
            }
            mainButtonTouchTap={() => { this.props.onSubmit(this.state.currentLinkPluginDataset) }}
            secondaryButtonLabel={<FormattedMessage id="dataset.form.plugin.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditPluginComponent

