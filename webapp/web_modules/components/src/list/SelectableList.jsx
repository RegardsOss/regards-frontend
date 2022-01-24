/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { List, makeSelectable } from 'material-ui/List'

const SelectableList = makeSelectable(List)
/**
 * see Material-ui documentation http://www.material-ui.com/#/components/list
 * @param {*} ComposedComponent
 */
function wrapState(ComposedComponent) {
  return class SelectableListComponent extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      onSelect: PropTypes.func,
      style: PropTypes.objectOf(PropTypes.string),
    }

    static defaultProps = {
      defaultValue: 0,
    }

    UNSAFE_componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.defaultValue !== nextProps.defaultValue) {
        this.setState({ selectedIndex: nextProps.defaultValue })
      }
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      })
      if (this.props.onSelect) {
        this.props.onSelect(index)
      }
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          style={this.props.style}
        >
          {this.props.children}
        </ComposedComponent>
      )
    }
  }
}

export default wrapState(SelectableList)
