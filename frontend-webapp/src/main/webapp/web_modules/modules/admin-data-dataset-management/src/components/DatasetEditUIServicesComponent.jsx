/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatasetStepperComponent from './DatasetStepperComponent'

/**
 * React component to list datasets.
 */
export class DatasetEditUIServicesComponent extends React.Component {

  static propTypes = {
    backUrl: React.PropTypes.string.isRequired,
    doneUrl: React.PropTypes.string.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { backUrl, doneUrl } = this.props
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="dataset.form.uiservices.title" />}
          subtitle={<FormattedMessage id="dataset.form.uiservices.subtitle" />}
        />
        <DatasetStepperComponent stepIndex={4} />
        <CardText>
          <div className="row">
            Work in progress
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={<FormattedMessage id="dataset.form.uiservices.action.next" />}
            mainButtonUrl={doneUrl}
            secondaryButtonLabel={<FormattedMessage id="dataset.form.uiservices.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetEditUIServicesComponent

