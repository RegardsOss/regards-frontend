import * as React from "react"
import { Card, CardText, CardTitle } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"
import { CardActionsComponent } from "@regardsoss/components"

interface FormProps {
  handleNextStep: () => void
  handleGetBack: () => void
  goToNewDatasource: () => void
  save: (value: any) => void
}
/**
 */
class FormComponent extends React.Component<FormProps, any> {

  state: any = {
    datasourceId: null
  }

  getBackUrl = () => {
    return this.props.handleGetBack()
  }

  handleNextButton = () => {
    return this.props.handleNextStep()
  }

  handleNewDatasource = () => {
    this.props.goToNewDatasource()
  }

  handleDatasourceChange = (event: React.FormEvent, index: number, value: any) => {
    this.setState({
      datasourceId: value
    })
    this.props.save(value)
  }

  render (): JSX.Element {
    const { datasourceId } = this.state
    const isNextButtonVisible = datasourceId >= 0
    return (
      <Card
        initiallyExpanded={true}>
        <CardTitle
          title={<FormattedMessage id="datamanagement.dataset.add.header"/>}
          children={this.props.children}
        />
        <CardText>
          <div>
            <SelectField
              floatingLabelText="Choix d'une source de données"
              value={datasourceId}
              onChange={this.handleDatasourceChange}
            >
              <MenuItem value={1} primaryText="CDPP Datasource"/>
              <MenuItem value={2} primaryText="PER2 Datasource"/>
              <MenuItem value={3} primaryText="TV78 Datasource"/>
            </SelectField>
            <FlatButton
              label="Ajouter une nouvelle source de données"
              primary={true}
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

export default FormComponent
