
import { Card, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import CardTitle from 'material-ui/Card/CardTitle'
import { CardActionsComponent } from '@regardsoss/components'

/**
 */
function CreateDatasetSuccessComponent({ children, handleNextStep }) { (
  <Card
    initiallyExpanded
  >
    <CardTitle
      title={
        <FormattedMessage
          id="datamanagement.dataset.add.header"
        />
          }
      children={children}
    />
    <CardText>
      <h3>Succès ! Le jeu de données a bien été créé</h3>
      <CardActionsComponent
        mainButtonTouchTap={handleNextStep}
        mainButtonLabel={<FormattedMessage id="datamanagement.dataset.add.3.action.next" />}
      />
    </CardText>
  </Card>
    ) }
CreateDatasetSuccessComponent.propsType = {
  handleNextStep: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
}

export default CreateDatasetSuccessComponent
/*
 const mapStateToProps = (state: any, ownProps: any) => {
 }
 const mapDispatchToProps = (dispatch: any) => ({
 })
 export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
 */
