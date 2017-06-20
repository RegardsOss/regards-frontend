/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import Search from 'material-ui/svg-icons/action/search'
import Locked from 'material-ui/svg-icons/action/lock'
import { ShowableAtRender } from '@regardsoss/components'

/**
 * Component to display an attribute configuration.
 * @author Sébastien binda
 */
class AttributeConfigurationComponent extends React.Component {

  static propTypes = {
    allowFacettes: PropTypes.bool.isRequired,
    attribute: PropTypes.oneOfType([
      DataManagementShapes.StandartAttributeModel,
      DataManagementShapes.AttributeModel,
    ]).isRequired,
    filter: PropTypes.string,
    conf: AccessShapes.AttributeConfigurationContent,
    onChange: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getTitle = attribute => {
    console.error("SEB",attribute)
    return attribute.fragment && attribute.fragment.name &&
    attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT ? `${attribute.fragment.name} - ${attribute.label}` : attribute.label
  }

  constructor(props) {
    super(props)
    this.state = {
      conf: this.props.conf,
    }
  }

  shouldComponentUpdate(nextProps) {
    const { conf } = this.state
    const nextConf = nextProps.conf
    if (conf.order !== nextConf.order ||
      conf.visibility !== nextConf.visibility ||
      conf.facetable !== nextConf.facetable ||
      conf.initialSort !== nextConf.initialSort ||
      conf.filter !== nextProps.filter) {
      // Props can be updated by upper container. (Handle the use case of only one attribut can have the initialSort to true)
      // If props changed, change the current state to the new props values.
      this.setState({
        conf: nextProps.conf,
      })
      return true
    }
    return false
  }

  changeVisibility = () => {
    const newConf = merge({}, this.state.conf, { visibility: !this.state.conf.visibility })
    this.setState({ conf: newConf })
    this.props.onChange(DamDomain.AttributeModelController.getAttributeAccessPath(this.props.attribute), newConf)
  }

  changeFacetable = () => {
    const newConf = merge({}, this.state.conf, { facetable: !this.state.conf.facetable })
    this.setState({ conf: newConf })
    this.props.onChange(DamDomain.AttributeModelController.getAttributeAccessPath(this.props.attribute), newConf)
  }

  changeInitialSort = () => {
    const newConf = merge({}, this.state.conf, { initialSort: !this.state.conf.initialSort })
    this.setState({ conf: newConf })
    this.props.onChange(DamDomain.AttributeModelController.getAttributeAccessPath(this.props.attribute), newConf)
  }

  changeAttributeOrder = (event, value) => {
    const newConf = merge({}, this.state.conf, { order: parseInt(value, this) })
    this.setState({ conf: newConf })
    this.props.onChange(DamDomain.AttributeModelController.getAttributeAccessPath(this.props.attribute), newConf)
  }

  formatOrder = value => value ? parseInt(value, this) : undefined

  render() {
    const { allowFacettes, filter = '', attribute: { content: { label, description, fragment } } } = this.props
    let display = !filter.length || label.match(new RegExp(`^${this.props.filter}.*$`, 'i'))
    if (!display && fragment && fragment.name) {
      display = display || fragment.name.match(new RegExp(`^${this.props.filter}.*$`, 'i'))
    }

    const cardStyle = { width: 300, margin: 5 }
    const cardHeaderStyle = {
      paddingTop: 0,
      paddingBottom: 0,
    }
    const cardContentStyle = { paddingTop: 0 }
    const searchFiledStyle = { maxWidth: 150 }
    const visibilityOffIcon = <VisibilityOff />
    const visibilityOnIcon = <Visibility />
    const searchOnIcon = <Search />
    const searchOffIcon = <Locked />

    return (
      <ShowableAtRender
        show={display}
      >
        <Card
          style={cardStyle}
        >
          <CardHeader
            title={AttributeConfigurationComponent.getTitle(this.props.attribute.content)}
            subtitle={description}
            style={cardHeaderStyle}
          />
          <CardText
            style={cardContentStyle}
          >
            <TextField
              id="search"
              type="number"
              floatingLabelText={this.context.intl.formatMessage({ id: 'form.attributes.order' })}
              value={this.formatOrder(this.state.conf.order)}
              onChange={this.changeAttributeOrder}
              style={searchFiledStyle}
            />
            <Checkbox
              label={this.context.intl.formatMessage({ id: 'form.attributes.visibility.label' })}
              checked={this.state.conf.visibility}
              checkedIcon={visibilityOnIcon}
              uncheckedIcon={visibilityOffIcon}
              onCheck={this.changeVisibility}
            />
            <ShowableAtRender show={allowFacettes}>
              <Checkbox
                label={this.context.intl.formatMessage({ id: 'form.attributes.facetable.label' })}
                checked={this.state.conf.facetable}
                checkedIcon={searchOnIcon}
                uncheckedIcon={searchOffIcon}
                onCheck={this.changeFacetable}
              />
              <Checkbox
                label={this.context.intl.formatMessage({ id: 'form.attributes.initialSort.label' })}
                checked={this.state.conf.initialSort}
                onCheck={this.changeInitialSort}
              />
            </ShowableAtRender>
          </CardText>
        </Card>
      </ShowableAtRender>
    )
  }
}

export default AttributeConfigurationComponent
