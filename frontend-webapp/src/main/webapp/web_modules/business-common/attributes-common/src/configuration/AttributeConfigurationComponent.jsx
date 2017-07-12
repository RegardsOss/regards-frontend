/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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

  static getTitle = attribute => attribute.fragment && attribute.fragment.name &&
    attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT ? `${attribute.fragment.name} - ${attribute.label}` : attribute.label

  constructor(props) {
    super(props)
    this.state = {
      conf: this.props.conf,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.conf.initialSort !== nextProps.conf.initialSort) {
      // Props can be updated by upper container. (Handle the use case of only one attribut can have the initialSort to true)
      // If props changed, change the current state to the new props values.
      const newState = merge({}, this.state.conf, {
        initialSort: nextProps.conf.initialSort,
      })
      this.setState({
        conf: newState,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.conf.order !== nextState.conf.order ||
      this.state.conf.visibility !== nextState.conf.visibility ||
      this.state.conf.facetable !== nextState.conf.facetable ||
      this.state.conf.initialSort !== nextState.conf.initialSort ||
      this.props.filter !== nextProps.filter) {
      return true
    }
    return false
  }

  updateAttributeConfiguration = (newFieldValues) => {
    const previousConf = this.state.conf
    const newConf = { ...previousConf, ...newFieldValues }
    // update this state locally
    this.setState({ conf: newConf })
    // fire updated event
    this.props.onChange(previousConf.attributeFullQualifiedName, newConf)
  }

  changeVisibility = () => this.updateAttributeConfiguration({ visibility: !this.state.conf.visibility })

  changeFacetable = () => this.updateAttributeConfiguration({ facetable: !this.state.conf.facetable })

  changeInitialSort = () => this.updateAttributeConfiguration({ initialSort: !this.state.conf.initialSort })

  changeAttributeOrder = (event, value) => this.updateAttributeConfiguration({ order: parseInt(value, this) })

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
