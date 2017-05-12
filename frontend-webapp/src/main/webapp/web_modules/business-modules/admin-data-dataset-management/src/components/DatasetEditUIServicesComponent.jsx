/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import { filter, map, pull, includes } from 'lodash'
import Checkbox from 'material-ui/Checkbox'
import { PluginDefinition as UIPluginDefinition, PluginConf as UIPluginConfiguration, Dataset } from '@regardsoss/model'
import DatasetStepperComponent from './DatasetStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasetEditUIServicesComponent extends React.Component {

  static propTypes = {
    backUrl: PropTypes.string.isRequired,
    uiPluginConfigurationList: PropTypes.objectOf(PropTypes.shape({
      content: UIPluginConfiguration,
    })),
    uiPluginDefinitionList: PropTypes.objectOf(UIPluginDefinition),
    currentDataset: Dataset,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      uiPluginConfigurationActiveList: props.currentDataset.content.uiPluginConfIdList,
    }
  }

  getConfigurationListItems = (uiPluginDefinition) => {
    const { uiPluginConfigurationList } = this.props
    // Retrieve the list of configuration for the current UIPlugiNDefinition
    const uiPluginCurrentConfigurationList = filter(uiPluginConfigurationList, (uiPluginConf, id) => (
      uiPluginConf.content.pluginId === uiPluginDefinition.content.id
    ))
    return map(uiPluginCurrentConfigurationList, (uiPluginConfiguration, id) => (
      <ListItem
        key={id}
        primaryText={uiPluginConfiguration.content.conf.label}
        leftCheckbox={
          <Checkbox
            onCheck={() => { this.handleCheck(uiPluginConfiguration) }}
            checked={this.isPluginConfigurationActivated(uiPluginConfiguration)}
          />
        }
      />
    ))
  }

  /**
   * Handle the click on the checkbox to toggle the association between the dataset and the UIPlugin
   * @param uiPluginConfiguration
   */
  handleCheck = (uiPluginConfiguration) => {
    const uiPluginConfigurationActiveList = this.state.uiPluginConfigurationActiveList
    if (this.isPluginConfigurationActivated(uiPluginConfiguration)) {
      pull(uiPluginConfigurationActiveList, uiPluginConfiguration.content.id)
    } else {
      uiPluginConfigurationActiveList.push(uiPluginConfiguration.content.id)
    }
    this.setState({
      uiPluginConfigurationActiveList,
    })
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.uiPluginConfigurationActiveList)
  }
  /**
   * Return true if the dataset is associated with the UIPluginConfiguration
   * @param uiPluginConfiguration
   * @returns {*}
   */
  isPluginConfigurationActivated = uiPluginConfiguration => includes(this.state.uiPluginConfigurationActiveList, uiPluginConfiguration.content.id)

  render() {
    const { backUrl, uiPluginDefinitionList } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="dataset.form.uiservices.title" />}
          subtitle={<FormattedMessage id="dataset.form.uiservices.subtitle" />}
        />
        <DatasetStepperComponent stepIndex={4} />
        <CardText>
          <List>
            {map(uiPluginDefinitionList, (uiPluginDefinition, id) => (
              <ListItem
                key={id}
                primaryText={uiPluginDefinition.content.name}
                initiallyOpen
                primaryTogglesNestedList
                nestedItems={
                    this.getConfigurationListItems(uiPluginDefinition)
                  }
              />
              ),
            )}
          </List>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={<FormattedMessage id="dataset.form.uiservices.action.next" />}
            mainButtonTouchTap={this.handleSubmit}
            secondaryButtonLabel={<FormattedMessage id="dataset.form.uiservices.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditUIServicesComponent

