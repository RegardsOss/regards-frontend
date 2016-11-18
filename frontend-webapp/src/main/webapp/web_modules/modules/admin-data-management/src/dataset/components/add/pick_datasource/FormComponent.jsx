import { Card, CardText, CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { CardActionsComponent } from '@regardsoss/components'

/**
 */
class FormComponent extends React.Component {

  state = {
    datasourceId: null,
  }

  getBackUrl = () => (
    this.props.handleGetBack()
  )

  handleNextButton = () => (
    this.props.handleNextStep()
    )

  handleNewDatasource = () => (
    this.props.goToNewDatasource()
    )

  handleDatasourceChange = (event, index, value) => {
    this.setState({
      datasourceId: value,
    })
    this.props.save(value)
  }

  render() {
    const { datasourceId } = this.state
    const isNextButtonVisible = datasourceId >= 0
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={<FormattedMessage id="datamanagement.dataset.add.header" />}
          children={this.props.children}
        />
        <CardText>
          <div>
            <SelectField
              floatingLabelText="Choix d'une source de données"
              value={datasourceId}
              onChange={this.handleDatasourceChange}
            >
              <MenuItem value={1} primaryText="CDPP Datasource" />
              <MenuItem value={2} primaryText="PER2 Datasource" />
              <MenuItem value={3} primaryText="TV78 Datasource" />
            </SelectField>
            <FlatButton
              label="Ajouter une nouvelle source de données"
              primary
              onTouchTap={this.handleNewDatasource}
            />
          </div>

          <CardActionsComponent
            secondaryButtonLabel={<FormattedMessage id="datamanagement.dataset.add.2.action.back" />}
            secondaryButtonTouchTap={this.getBackUrl}
            mainButtonLabel={<FormattedMessage id="datamanagement.dataset.add.2.action.next" />}
            mainButtonTouchTap={this.handleNextButton}
            isMainButtonVisible={isNextButtonVisible}
          />

        </CardText>
      </Card>
    )
  }
}
FormComponent.propTypes = {
  handleNextStep: React.PropTypes.func.isRequired,
  handleGetBack: React.PropTypes.func.isRequired,
  goToNewDatasource: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
}
export default FormComponent
