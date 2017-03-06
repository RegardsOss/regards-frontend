/**
 * LICENSE_PLACEHOLDER
 **/
import Disatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { Card, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'

/**
 * Render a react component to display a No result founds message.
 *
 * @author Sébastien Binda
 */
class NoResultsFoundComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    return (
      <Card style={{ backgroundColor: this.context.muiTheme.palette.disabledColor }}>
        <CardText>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Disatisfied style={{ marginRight: 20 }} />
        No results found !
          </div>
        </CardText>
      </Card>
    )
  }

}

export default NoResultsFoundComponent
