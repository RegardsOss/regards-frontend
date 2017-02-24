/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { ShowableAtRender, PageableListContainer } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { map, xorWith, find } from 'lodash'
import { AccessGroup, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DatasetLineComponent from './DatasetLineComponent'
import DatasetActions from '../model/DatasetActions'
import DatasetSelectors from '../model/DatasetSelectors'
import AccessRightFormComponent from './AccessRightFormComponent'
/**
 * Display edit and create accessright form
 */
export class AccessRightComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    accessGroupList: React.PropTypes.objectOf(AccessGroup),
    pluginConfigurationList: React.PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: React.PropTypes.objectOf(PluginMetaData),
    onSubmit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedDataset: [],
      selectedAccessGroupName: '',
      // If the user click first on an access right already existing, save it and send it to the form
      firstAccessRightSelected: undefined,
    }
  }

  onAccessGroupChange = (event, id, accessGroupName) => {
    this.setState({
      selectedAccessGroupName: accessGroupName,
    })
  }

  onDatasetSelection = (dataset) => {
    const { selectedDataset } = this.state
    const newSelectedDatasets = xorWith(selectedDataset, [dataset])
    const updatedState = {
      selectedDataset: newSelectedDatasets,
    }
    // keep the reference to the first access right when user starts to pick dataset
    if (selectedDataset.length === 0) {
      const firstAccessRight = find(this.props.accessGroupList[this.state.selectedAccessGroupName].content.accessRights, accessRight => accessRight.dataSet.id === dataset.id)
      updatedState.firstAccessRightSelected = firstAccessRight
    }
    // also remove the reference to the first access right when the user deselect the last dataset
    if (newSelectedDatasets.length === 0 && selectedDataset.length === 1) {
      updatedState.firstAccessRightSelected = undefined
    }
    this.setState(updatedState)
  }

  onFormSubmit = (values) => {
    const { selectedDataset, selectedAccessGroupName } = this.state
    this.props.onSubmit(selectedAccessGroupName, selectedDataset, values)
      .then(() => {
        // Everything is done we can reinit the form
        this.unselectAllModels()
      })
  }

  onAccessRightDelete= (accessRight) => {
    const { selectedAccessGroupName } = this.state
    this.props.onDelete(selectedAccessGroupName, accessRight)
  }

  unselectAllModels = () => {
    this.setState({
      selectedDataset: [],
      firstAccessRightSelected: undefined,
    })
  }

  render() {
    const { accessGroupList, pluginMetaDataList, pluginConfigurationList } = this.props
    const { selectedAccessGroupName, selectedDataset, firstAccessRightSelected } = this.state
    const style = this.context.muiTheme.layout.cardEspaced
    return (
      <div>
        <Card>
          <CardTitle
            title={<FormattedMessage id="accessright.title" />}
            subtitle={<FormattedMessage id="accessright.subtitle" />}
          />
          <CardText>
            <SelectField
              floatingLabelText={<FormattedMessage id="accessright.form.accessGroup" />}
              onChange={this.onAccessGroupChange}
              value={selectedAccessGroupName}
              fullWidth
            >
              {map(accessGroupList, accessGroup => (
                <MenuItem
                  key={accessGroup.content.id}
                  value={accessGroup.content.name}
                  primaryText={accessGroup.content.name}
                />
              ))}
            </SelectField>
          </CardText>
        </Card>
        <ShowableAtRender show={selectedAccessGroupName.length > 0}>
          <div className="row">
            <div className="col-md-30 col-xs-50">
              <Card style={style}>
                <PageableListContainer
                  title={this.context.intl.formatMessage({ id: 'accessright.form.dataset.title' })}
                  entityIdentifier="id"
                  searchIdentifier="label"
                  searchText={this.context.intl.formatMessage({ id: 'accessright.form.dataset.input' })}
                  nbEntityByPage={10}
                  entitiesActions={DatasetActions}
                  entitiesSelector={DatasetSelectors}
                  lineComponent={DatasetLineComponent}
                  displayCheckbox
                  onEntityCheck={this.onDatasetSelection}
                  onUnselectAll={this.unselectAllModels}
                  onReset={this.unselectAllModels}
                  selectedEntities={selectedDataset}
                  additionalPropToLineComponent={{
                    onDelete: this.onAccessRightDelete,
                    accessRights: selectedAccessGroupName ? accessGroupList[selectedAccessGroupName].content.accessRights : null,
                  }}
                />
              </Card>
            </div>
            <div className="col-md-68 col-md-offset-2 col-xs-48 col-xs-offset-2">
              <ShowableAtRender show={selectedDataset.length > 0}>
                <Card style={style}>
                  <AccessRightFormComponent
                    onSubmit={this.onFormSubmit}
                    pluginConfigurationList={pluginConfigurationList}
                    pluginMetaDataList={pluginMetaDataList}
                    currentAccessRight={firstAccessRightSelected}
                    nbSelectedDataset={selectedDataset.length}
                  />
                </Card>
              </ShowableAtRender>
            </div>
          </div>
        </ShowableAtRender>
      </div>
    )
  }
}


export default AccessRightComponent

