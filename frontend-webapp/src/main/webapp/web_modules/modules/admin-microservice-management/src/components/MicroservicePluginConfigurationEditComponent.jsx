/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { GridList, GridTile } from 'material-ui/GridList'
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  gridList: {
    //width: 500,
    height: 450,
    overflowY: 'auto',
  },
}

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
]

/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
class MicroservicePluginConfigurationEditComponent extends React.Component {

  static propTypes = {
    microserviceName: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { microserviceName } = this.props

    return (
      <Paper>
        <AppBar
          title={`${microserviceName} > Plugins > Authentication > LDAP #4`}
          iconElementLeft={<IconButton><Close /></IconButton>}
        />
        <div style={styles.root}>
          <Subheader>December</Subheader>
          <GridList
            cellHeight={'auto'}
            cols={3}
            padding={20}
            style={styles.gridList}
          >


            {tilesData.map((tile) => (
              <GridTile
                key={tile.img}
                //title={tile.title}
                //subtitle={<span>by <b>{tile.author}</b></span>}
                //actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
              >
                <Card style={{ margin: 20 }}>
                  <CardTitle
                    title="Without Avatar"
                    subtitle="Subtitle"
                  />
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
                    volutpat. Nulla facilisi.
                  </CardText>
                  <CardActions>
                    <FlatButton label="Action1"/>
                    <FlatButton label="Action2"/>
                  </CardActions>
                </Card>
              </GridTile>
            ))}


            <Divider />
            <Subheader>December</Subheader>
            {tilesData.map((tile) => (
              <GridTile key={tile.img}>
                <Card style={{ margin: 20 }}>
                  <CardTitle
                    title="Without Avatar"
                    subtitle="Subtitle"
                  />
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                  </CardText>
                  <CardActions>
                    <FlatButton label="Action1"/>
                    <FlatButton label="Action2"/>
                  </CardActions>
                </Card>
              </GridTile>
            ))}


          </GridList>
        </div>
      </Paper>
    )
  }
}

export default MicroservicePluginConfigurationEditComponent
