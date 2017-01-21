/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { map } from 'lodash'
import { Link } from 'react-router'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
//import BoardItemShape from './BoardItemShape'
//import styles from './styles/styles'
import ActionHome from 'material-ui/svg-icons/action/home'
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download'
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset'
import FileUpload from 'material-ui/svg-icons/file/file-upload'

const styles = {
   board: {
    section: {
      classes: ['row'].join(' '),
      styles: {},
    },
    items: {
      classes: ['col-xs-50', 'col-sm-40', 'col-lg-33'].join(' '),
      styles: {
        padding: '10px 0',
        //textAlign: 'center',
        marginBottom: '30px',
      },
      contentStyles: {
        minHeight: '170px',
      },
    },
    action: {
      classes: ['row'].join(' '),
      styles: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      },
    },
  }
}

const iconStyles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
}

const cardActionsStyles = {
  display: 'flex',
  justifyContent: 'space-around',
}

/**
 * React component to display a board item.
 * Every BoardItem as a list of BoardAction
 */
class SexyBoardItemComponent extends React.Component {

  /*
  static propTypes = {
    item: BoardItemShape.isRequired,
  }
  */

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    //const boardItemStyles = styles(this.context.muiTheme)
    //const { item } = this.props
    return (
      <div className={styles.board.items.classes}>
        <Card
          style={styles.board.items.styles}
          containerStyle={styles.board.items.contentStyles}
        >
          <CardMedia
            overlay={<CardTitle title="Rs-Gateway" subtitle="Short description of the microservice" />}
          >
            <div style={{whidth:400,height:200,backgroundColor:this.context.muiTheme.palette.primary1Color}} />
          </CardMedia>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions style={cardActionsStyles}>
            <IconButton
               iconStyle={iconStyles.smallIcon}
               style={iconStyles.small}
           >
             <ActionHome />
           </IconButton>
           <IconButton
              iconStyle={iconStyles.smallIcon}
              style={iconStyles.small}
            >
              <FileCloudDownload />
            </IconButton>
            <IconButton
             iconStyle={iconStyles.smallIcon}
             style={iconStyles.small}
             >
               <HardwareVideogameAsset />
             </IconButton>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default SexyBoardItemComponent
