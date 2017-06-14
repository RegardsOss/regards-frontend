/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * React component to list datasets.
 */
export class DatasetCreateOrPickDatasourceComponent extends React.Component {

  static propTypes = {
    datasourceList: DataManagementShapes.DatasourceList,
    createDatasourceUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    handleDone: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentDatasource: undefined,
    }
  }
  handleChange = (event, index, value) => {
    this.setState({
      currentDatasource: value,
    })
  }

  goToDatasource = () => {
    browserHistory.push(this.props.createDatasourceUrl)
  }

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20px',
    }

    const { currentDatasource } = this.state
    const styleButton = {
      margin: '30px 0',
    }
    const { datasourceList, handleDone, backUrl } = this.props
    return (
      <div>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'dataset.form.create.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'dataset.form.create.subtitle' })}
          />
          <CardText>
            <SelectField
              floatingLabelText={this.context.intl.formatMessage({ id: 'dataset.form.create.datasource' })}
              onChange={this.handleChange}
              value={currentDatasource}
              fullWidth
            >
              {map(datasourceList, (datasource, id) => (
                <MenuItem
                  value={datasource.content.pluginConfigurationId}
                  key={id}
                  primaryText={datasource.content.label}
                />
              ))}
            </SelectField>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonTouchTap={() => { handleDone(currentDatasource) }}
              mainButtonLabel={
                <FormattedMessage
                  id="dataset.form.create.action.next"
                />
              }
              isMainButtonDisabled={currentDatasource === undefined}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.form.create.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
        <Card>
          <div style={style}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'dataset.form.create.action.datasource' })}
              secondary
              style={styleButton}
              onTouchTap={this.goToDatasource}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default DatasetCreateOrPickDatasourceComponent

