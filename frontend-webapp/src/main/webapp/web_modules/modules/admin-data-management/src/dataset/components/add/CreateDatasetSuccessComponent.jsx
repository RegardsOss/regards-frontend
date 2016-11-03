
import { Card, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import CardTitle from 'material-ui/Card/CardTitle'
import { CardActionsComponent } from '@regardsoss/components'
/*
interface CreateDatasetSuccessProps {
  handleNextStep: () => void
}*/
/**
 */
export default class CreateDatasetSuccessComponent extends React.Component {


  handleNextButton = () => {
    this.props.handleNextStep()
  }

//  view headline

  render() {
    return (
      <Card
        initiallyExpanded
      >
        <CardTitle
          title={
            <FormattedMessage
              id="datamanagement.dataset.add.header"
            />
          }
          children={this.props.children}
        />
        <CardText>
          <h3>Succès ! Le jeu de données a bien été créé</h3>
          <CardActionsComponent
            mainButtonTouchTap={this.props.handleNextStep}
            mainButtonLabel={<FormattedMessage id="datamanagement.dataset.add.3.action.next" />}
          />
        </CardText>
      </Card>
    )
  }
}

/*
 const mapStateToProps = (state: any, ownProps: any) => {
 }
 const mapDispatchToProps = (dispatch: any) => ({
 })
 export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
 */
