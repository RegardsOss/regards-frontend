/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { themeContextType } from '@regardsoss/theme'

class SubSectionCard extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    marginLeft: PropTypes.number,
    arrowMarginLeft: PropTypes.number,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    marginLeft: 15,
    arrowMarginLeft: 10,
  }

  static sectionStyle = {
    border: '1px solid',
    borderRadius: '5px',
    padding: '15px',
    marginRight: '5px',
  }

  static titleStyle = {
    borderBottom: '1px solid',
    fontSize: '1.1em',
    marginBottom: '15px',
    paddingBottom: '4px',
  }

  static pointerStyle = {
    border: 'solid 10px transparent',
    width: '10px',
    marginTop: '-20px',
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount() {
    const { muiTheme } = this.context
    this.pointerStyle = Object.assign({}, SubSectionCard.pointerStyle, {
      borderBottomColor: muiTheme.palette.primary1Color,
      marginLeft: `${this.props.marginLeft + this.props.arrowMarginLeft}px`,
    })
    this.sectionStyle = Object.assign({}, SubSectionCard.sectionStyle, {
      borderColor: muiTheme.palette.primary1Color,
      marginLeft: `${this.props.marginLeft}px`,
    })
    this.titleStyle = Object.assign({}, SubSectionCard.titleStyle, {
      color: muiTheme.palette.textColor,
      borderBottomColor: muiTheme.palette.primary1Color,
    })
  }

  render() {
    return (
      <div>
        <div style={this.pointerStyle} />
        <div style={this.sectionStyle}>
          {this.props.title ? <div style={this.titleStyle}>{this.props.title}</div> : null}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default SubSectionCard
