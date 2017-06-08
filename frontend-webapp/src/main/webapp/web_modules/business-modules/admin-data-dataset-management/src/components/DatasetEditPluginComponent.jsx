/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import filter from 'lodash/filter'
import cloneDeep from 'lodash/cloneDeep'
import remove from 'lodash/remove'
import some from 'lodash/some'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
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
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
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

  onCheck = (pluginConfiguration, isInputChecked) => {
    const { currentLinkPluginDataset } = this.state
    if (isInputChecked) {
      currentLinkPluginDataset.content.services.push(pluginConfiguration.content)
    } else {
      currentLinkPluginDataset.content.services = remove(currentLinkPluginDataset.content.services, service =>
        service.id !== pluginConfiguration.content.id,
      )
    }
    this.setState({
      currentLinkPluginDataset,
    })
  }

  getItemMetaData = (pluginMetaData, pluginConfigurationList) => {
    const pluginConfigurationAssociated = filter(pluginConfigurationList, pluginConfiguration =>
      pluginConfiguration.content.pluginClassName === pluginMetaData.content.pluginClassName,
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
                      checked={this.isCheckboxChecked(pluginConfiguration)}
                      onCheck={(event, isInputChecked) => { this.onCheck(pluginConfiguration, isInputChecked) }}
                    />
                  }
                />
              </ShowableAtRender>
            ))
          }
        />
      </ShowableAtRender>)
  }

  isCheckboxChecked = (pluginConfiguration) => {
    const { currentLinkPluginDataset } = this.state
    return some(currentLinkPluginDataset.content.services, service => service.id === pluginConfiguration.content.id)
  }

  render() {
    const {
      pluginConfigurationList,
      pluginMetaDataList,
      backUrl,
    } = this.props
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.form.plugin.title' })}
          subtitle={this.context.intl.formatHTMLMessage({ id: 'dataset.form.plugin.subtitle' })}
        />
        <DatasetStepperComponent stepIndex={3} />
        <CardText>
          <List>
            <Subheader><FormattedMessage id="dataset.form.plugin.services" /></Subheader>
            <Divider />
            {map(pluginMetaDataList, (pluginMetaData, id) => (
              this.getItemMetaData(pluginMetaData, pluginConfigurationList)
            ))}
          </List>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={
              <FormattedMessage
                id="dataset.form.plugin.action.next"
              />
            }
            mainButtonTouchTap={() => { this.props.onSubmit(this.state.currentLinkPluginDataset) }}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.plugin.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditPluginComponent

