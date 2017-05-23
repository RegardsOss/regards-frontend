/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import MenuItem from 'material-ui/MenuItem'
import Chip from 'material-ui/Chip'
import AddSvg from 'material-ui/svg-icons/content/add'
import Avatar from 'material-ui/Avatar'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import { FormattedMessage } from 'react-intl'
import { I18nProvider } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'

/**
 * Component to display an entity list as chips.
 * @author Sébastien binda
 */
class ChipList extends React.Component {

  static propTypes = {
    availableEntities: PropTypes.arrayOf(PropTypes.object),
    selectedEntities: PropTypes.arrayOf(PropTypes.object),
    onRemoveEntity: PropTypes.func.isRequired,
    onAddEntity: PropTypes.func.isRequired,
    getEntityLabel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      popoverOpen: false,

    }
  }

  componentWillMount() {
    this.style = {
      chipBackground: this.context.muiTheme.palette.primary1Color,
      avatarBackground: this.context.muiTheme.palette.primary2Color,
      renderChipInput: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 4,
      },
      chip: {
        margin: 4,
        display: 'inline-flex',
      },
      groupsLabel: {
        color: this.context.muiTheme.textField.floatingLabelColor,
        fontFamily: this.context.muiTheme.fontFamily,
        fontSize: '0.9em',
        marginTop: 21,
        marginBottom: 7,
      },
    }
  }

  handlePopoverOpen = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      popoverOpen: true,
      popoverAnchor: event.currentTarget,
    })
  }

  handlePopoverClose = () => {
    this.setState({
      popoverOpen: false,
    })
  }

  renderNewChipButton = () => (
    <I18nProvider messageDir={'components/src/list/i18n'}>
      <div>
        <Chip style={this.style.chip} onTouchTap={this.handlePopoverOpen} backgroundColor={this.style.chipBackground}>
          <Avatar
            backgroundColor={this.style.avatarBackground}
            size={32}
            icon={<AddSvg />}
          />
          <FormattedMessage id="chip.add.button" />
        </Chip>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.popoverAnchor}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          animation={PopoverAnimationVertical}
          onRequestClose={this.handlePopoverClose}
        >
          <Menu>
            {map(this.props.availableEntities, (entity) => {
              const key = this.props.getEntityLabel(entity)
              return (<ShowableAtRender key={key} show={!find(this.props.selectedEntities, o => isEqual(o, entity))}>
                <MenuItem
                  key={key}
                  primaryText={key}
                  onTouchTap={() => {
                    this.props.onAddEntity(entity)
                    this.handlePopoverClose()
                  }}
                />
              </ShowableAtRender>)
            })}
          </Menu>
        </Popover>
      </div>
    </I18nProvider>
    )

  renderChipList = () => (
    <div>
      {map(this.props.selectedEntities, (entity) => {
        const key = this.props.getEntityLabel(entity)
        return (
          <Chip
            onRequestDelete={() => this.props.onRemoveEntity(entity)}
            style={this.style.chip}
            key={key}
          >
            {key}
          </Chip>
        )
      })}
    </div>
    )

  render() {
    return (
      <div>
        {this.renderChipList()}
        {this.renderNewChipButton()}
      </div>
    )
  }

}

export default ChipList
