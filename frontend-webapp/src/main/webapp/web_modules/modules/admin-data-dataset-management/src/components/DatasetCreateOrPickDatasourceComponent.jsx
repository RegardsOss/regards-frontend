/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import { map } from 'lodash'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Clear from 'material-ui/svg-icons/content/clear'
import { Datasource } from '@regardsoss/model'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import DatasetStepperComponent from './DatasetStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasetCreateOrPickDatasourceComponent extends React.Component {

  static propTypes = {
    datasourceList: React.PropTypes.objectOf(Datasource),
    createDatasourceUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    handleDone: React.PropTypes.func.isRequired,
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

  render() {
    const style = Object.assign({}, this.context.muiTheme.layout.cardEspaced, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })
    const { currentDatasource } = this.state
    const styleButton = {
      margin: '30px 0',
    }
    const { datasourceList, createDatasourceUrl, handleDone, backUrl } = this.props
    console.log(datasourceList, currentDatasource === undefined)
    return (
      <div>
        <Card>
          <CardTitle
            title={<FormattedMessage id="dataset.form.create.title" />}
            subtitle={<FormattedMessage id="dataset.form.create.subtitle" />}
          />
          <DatasetStepperComponent stepIndex={0} />
          <CardText>
            <SelectField
              floatingLabelText={<FormattedMessage id="dataset.form.create.datasource" />}
              onChange={this.handleChange}
              value={currentDatasource}
              fullWidth
            >
              {map(datasourceList, (datasource, id) => (
                <MenuItem
                  value={datasource.content.id}
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
              secondaryButtonLabel={<FormattedMessage id="dataset.form.create.action.cancel" />}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
        <Card>
          <div style={style}>
            <RaisedButton
              label={<FormattedMessage id="dataset.form.create.action.datasource" />}
              secondary
              style={styleButton}
              href={createDatasourceUrl}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default DatasetCreateOrPickDatasourceComponent

