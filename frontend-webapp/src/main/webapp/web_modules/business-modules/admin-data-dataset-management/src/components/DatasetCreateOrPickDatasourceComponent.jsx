/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { map } from 'lodash'
import { Datasource } from '@regardsoss/model'
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
    datasourceList: PropTypes.objectOf(Datasource),
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
    const { datasourceList, createDatasourceUrl, handleDone, backUrl } = this.props
    return (
      <div>
        <Card>
          <CardTitle
            title={<FormattedMessage id="dataset.form.create.title" />}
            subtitle={<FormattedMessage id="dataset.form.create.subtitle" />}
          />
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

