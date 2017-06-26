/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import DissatisfiedIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { i18nContextType } from '@regardsoss/i18n'
import DatasourceStepperComponent from './DatasourceStepperComponent'

export class DatasourceFormMappingEmptyDatabaseComponent extends React.Component {

  static propTypes = {
    handleBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { handleBack } = this.props
    return (
      <form>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'datasource.form.mapping.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'datasource.form.mapping.subtitle' })}
          />
          <DatasourceStepperComponent stepIndex={2} />
          <NoContentComponent
            title={this.context.intl.formatMessage({ id: 'datasource.form.mapping.emptyDatabase.title' })}
            message={this.context.intl.formatMessage({ id: 'datasource.form.mapping.emptyDatabase.message' })}
            Icon={DissatisfiedIcon}
          />
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.mapping.action.cancel' })}
              mainButtonTouchTap={handleBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default DatasourceFormMappingEmptyDatabaseComponent
