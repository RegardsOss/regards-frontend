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
import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import SvgButton from '../material-desktop/SvgButton'
import IconNew from 'material-ui/svg-icons/file/create-new-folder'
import IconDnLoad from 'material-ui/svg-icons/file/file-download'
import IconClean from 'material-ui/svg-icons/action/delete-forever'

import SclToggle from '../material-desktop/SclToggle'

const propTypes = {
  themesNameList: PropTypes.arrayOf(PropTypes.string).isRequired,
  defautThemeInd: PropTypes.number.isRequired,
  onThemeSelect: PropTypes.func.isRequired,
  onToggleSideBar: PropTypes.func.isRequired,
  isSideBarOpen: PropTypes.bool.isRequired,
  themeJSON: PropTypes.string,
  onChangeTheme: PropTypes.func.isRequired,
  onCloneTheme: PropTypes.func.isRequired,
  onDnLoadTheme: PropTypes.func.isRequired,
  onCleanTheme: PropTypes.func.isRequired,
}

const defaultProps = {
  themesNameList: ['BaseLight', 'BaseDark'],
  defautThemeInd: 0,
  onThemeSelect: () => {},
  onToggleSideBar: () => {},
  isSideBarOpen: false,
  onCloneTheme: () => {},
  onDnLoadTheme: () => {},
  onCleanTheme: () => {},
}

const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default class ThemePanel extends React.Component {

  constructor(props) {
    super(props)

    this.menuItems = props.themesNameList.map(
            (val, ind) => (<MenuItem value={ind} key={ind} primaryText={val} />),
        )
    this.state = {
      value: props.defautThemeInd,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, index, value) {
    this.setState({ value }, this.props.onThemeSelect(value))
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          backgroundColor: this.context.muiTheme.palette.canvasColor,
        }}
      >
        <div
          style={{
            minWidth: 160,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            iconStyle={{ fill: this.context.muiTheme.palette.textColor }}
            style={{ width: '100%' }}
          >
            {this.menuItems}
          </DropDownMenu>
          <div
            style={{
//                    width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0 16px',
            }}
          >

            <SvgButton
              icon={<IconDnLoad />}
              tooltip="Download Theme"
              tooltipPosition="top-right"
              width={48}
              onTouchTap={this.props.onDnLoadTheme}
            />
            <SvgButton
              icon={<IconNew />}
              tooltip="this option is in development..."
              tooltipPosition="top-right"
              width={48}
              onTouchTap={this.props.onCloneTheme}
            />
            <SvgButton
              icon={<IconClean />}
              tooltip="this option is in development..."
              tooltipPosition="top-right"
              width={48}
              onTouchTap={this.props.onCleanTheme}
            />

          </div>
        </div>
        <div style={{ width: 200, minWidth: 150, flexGrow: 1, padding: 16 }} >
          <textarea
            style={{ width: '100%', height: '100%' }}
            value={this.props.themeJSON}
            onChange={this.props.onChangeTheme}
          />

        </div>
        <div style={{ width: 200, paddingTop: 16 }} >
          <SclToggle
            label="Show Theme Editor"
            labelPosition="left"
            toggled={this.props.isSideBarOpen}
            onToggle={() => this.props.onToggleSideBar(!this.props.isSideBarOpen)}
          />
        </div>

      </div>
    )
  }
}

ThemePanel.propTypes = propTypes
ThemePanel.defaultProps = defaultProps
ThemePanel.contextTypes = contextTypes
