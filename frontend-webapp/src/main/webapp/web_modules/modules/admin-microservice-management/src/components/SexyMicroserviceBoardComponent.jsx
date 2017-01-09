/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { i18nContextType } from '@regardsoss/i18n'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

/**
 * React component displaying the configurable microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
const microserviceNameList = [
  'rs-access',
  'rs-admin',
  'rs-cloud',
  'rs-dam',
  'rs-gateway',
]

class SexyMicroserviceBoardComponent extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const items = map(microserviceNameList, microserviceName => (
      <Card>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="images/jsa-128.jpg"
        />
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    ))
    return (
      <div>
        {items}
      </div>
    )
  }
}

export default SexyMicroserviceBoardComponent
