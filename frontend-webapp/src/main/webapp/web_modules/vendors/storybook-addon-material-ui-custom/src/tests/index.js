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
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import { stub } from 'sinon'
const { describe, it } = global

import PanelContainer from '../containers/PanelContainer'
import MuiTheme from '../containers/MuiTheme'
import { muiTheme } from '../muiTheme'


describe('### storybook-addon-material-ui ###\n\n', () => {
  describe('muiTheme decorator', () => {
    const decorator = muiTheme()
    const MuiThemeComponent = decorator(() => ({}))
    const props = MuiThemeComponent.props

    it('should have props', () => {
      expect(props).to.have.all.keys(
        'themesAppliedListInit',
        'themesRenderedList',
        'onThemeOverride',
        'story',
        'initState',
        'onChangeState',
        'themeListRender',
        'channel',
      )
      expect(props.themesAppliedListInit).to.have.length(2)
      expect(props.themesRenderedList).to.have.length(2)
      expect(props.initState).to.have.all.keys(
        'themeInd',
        'isSideBarOpen',
        'isFullTheme',
        'collapseList',
        'currentThemeOverride',
      )
    })
  })
  describe('PanelContainer', () => {
    const channel = {
      callback: () => { },
      on: (id, callback) => {
        this.callback = callback
      },
      emit: (id, data) => {
        console.log(data)
      },
    }
    const PanelContainerWrapper = shallow(<PanelContainer channel={channel} api={{}} />)

    it('should have init text', () => {
      const div = PanelContainerWrapper.find('div')
      expect(div.text()).to.be.equal('waiting for muiTheme decorator...')
    })
  })
})
