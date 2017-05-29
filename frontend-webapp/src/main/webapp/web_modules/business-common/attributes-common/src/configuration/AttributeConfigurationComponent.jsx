/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import { AttributeModel, AttributeModelController, AttributeConfiguration } from '@regardsoss/model'
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
    attribute: PropTypes.oneOfType([PropTypes.shape({
      // for standard attributes
      content: PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        fragment: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    }), AttributeModel]).isRequired,
    filter: PropTypes.string,
    conf: AttributeConfiguration,
    onChange: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      conf: this.props.conf,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { conf } = this.props
    const nextConf = nextProps.conf
    if (conf.order !== nextConf.order ||
      conf.visibility !== nextConf.visibility ||
      conf.facetable !== nextConf.facetable ||
      conf.initialSort !== nextConf.initialSort ||
      conf.filter !== nextProps.filter) {
      return true
    }
    return false
  }

  changeVisibility = () => {
    const newConf = merge({}, this.state.conf, { visibility: !this.state.conf.visibility })
    this.setState({ conf: newConf })
    this.props.onChange(AttributeModelController.getAttributeFullyQualifiedName(this.props.attribute), newConf)
  }

  changeFacetable = () => {
    const newConf = merge({}, this.state.conf, { facetable: !this.state.conf.facetable })
    this.setState({ conf: newConf })
    this.props.onChange(AttributeModelController.getAttributeFullyQualifiedName(this.props.attribute), newConf)
  }

  changeInitialSort = () => {
    const newConf = merge({}, this.state.conf, { initialSort: !this.state.conf.initialSort })
    this.setState({ conf: newConf })
    this.props.onChange(AttributeModelController.getAttributeFullyQualifiedName(this.props.attribute), newConf)
  }

  changeAttributeOrder = (event, value) => {
    const newConf = merge({}, this.state.conf, { order: parseInt(value, this) })
    this.setState({ conf: newConf })
    this.props.onChange(AttributeModelController.getAttributeFullyQualifiedName(this.props.attribute), newConf)
  }

  formatOrder = value => value ? parseInt(value, this) : undefined

  render() {
    const { allowFacettes, filter = '', attribute: { content: { label, description } } } = this.props
    const display = !filter.length || label.match(new RegExp(`^${this.props.filter}.*$`, 'i'))

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
            title={label}
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
