/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import get from 'lodash/get'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import Subheader from 'material-ui/Subheader'
import { DataManagementShapes } from '@regardsoss/shape'
import TextField from 'material-ui/TextField'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { List, ListItem } from 'material-ui/List'
import { getFullQualifiedAttributeName } from '@regardsoss/domain/dam'
import DatasetStepperContainer from '../containers/DatasetStepperContainer'
import DatasetSubsettingTesterIconButton from './DatasetSubsettingTesterIconButton'

/**
 * React component to list datasets.
 */
export class DatasetFormSubsettingComponent extends React.Component {

  static propTypes = {
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    currentDataset: DataManagementShapes.Dataset,
    onSubmit: PropTypes.func.isRequired,
    handleTestSubsetting: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      subsetting: get(props.currentDataset, 'content.openSearchSubsettingClause', ''),
    }
  }

  onSubsettingChange = (event, value) => {
    this.setState({
      subsetting: value,
    })
  }

  getTitle = () => {
    const { isEditing } = this.props
    if (!isEditing) {
      return this.context.intl.formatMessage({ id: 'dataset.create.title' })
    }
    return this.context.intl.formatMessage({ id: 'dataset.edit.title' }, { name: this.props.currentDataset.content.label })
  }


  render() {
    const styleButton = {
      display: 'flex',
      justifyContent: 'flex-end',
    }
    const { subsetting } = this.state
    const { currentDataset, modelAttributeList, handleBack, onSubmit, handleTestSubsetting } = this.props
    return (
      <Card>
        <CardTitle
          title={this.getTitle()}
          subtitle={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.subtitle' })}
        />
        <DatasetStepperContainer
          stepIndex={1}
          currentDatasetIpId={get(currentDataset, 'content.ipId', '')}
          currentDatasetId={get(currentDataset, 'content.id', '')}
          isEditing={this.props.isEditing}
        />
        <CardText>
          <div className="row">
            <div className="col-sm-30">
              <List>
                <Subheader><FormattedMessage id="dataset.form.subsetting.attributes" /></Subheader>
                {map(modelAttributeList, (modelAttribute, id) => (
                  <ListItem
                    primaryText={`properties.${getFullQualifiedAttributeName(modelAttribute.content.attribute)}`}
                    key={id}
                    disabled
                  />
                  ))}
              </List>
            </div>
            <div className="col-sm-70">
              <TextField
                hintText={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.opensearch' })}
                floatingLabelText={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.opensearch' })}
                type="text"
                value={subsetting}
                onChange={this.onSubsettingChange}
                multiLine
                fullWidth
              />
              <div style={styleButton}>
                <DatasetSubsettingTesterIconButton
                  currentDataset={currentDataset}
                  subsetting={subsetting}
                  handleTestSubsetting={handleTestSubsetting}
                />
              </div>
            </div>
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.action.next' })}
            mainButtonTouchTap={() => { onSubmit(this.state.subsetting) }}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.subsetting.action.cancel' })}
            secondaryButtonTouchTap={handleBack}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetFormSubsettingComponent

