/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { FieldsGroup } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LayerInfoItemComponent } from '../../../../src/components/admin/content/LayerInfoItemComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test LayerInfoItemComponent
 * @author Théo Lasserre
 */
describe('[ Module name] Testing LayerInfoItemComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LayerInfoItemComponent)
  })
  it('should render correctly with an empty layer', () => {
    const props = {
      name: 'any',
      mapEngine: 'CESIUM',
      getMenuItems: () => {},
      validateBackgroundURL: () => {},
      validateBackgroundConf: () => {},
      entity: {
        background: false,
        enabled: false,
        layerViewMode: 'MODE_3D',
      },
    }
    const enzymeWrapper = shallow(<LayerInfoItemComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.url`), 1,
      'Url field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.type`), 1,
      'Type field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.conf`), 1,
      'Conf field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.layersName`), 0,
      'Layer names field should not be shown')

    // Check fields group
    const groupWrapper = enzymeWrapper.find(FieldsGroup)
    assert.lengthOf(groupWrapper, 2)

    const commonFields = groupWrapper.findWhere((n) => n.props().name === `${props.name}.commonFields`)
    console.log(commonFields.debug({ verbose: true }))
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.layerName`), 1,
      'Layer name field should be shown')
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.enabled`), 1,
      'Enabled field should be shown')
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.background`), 1,
      'Background field should be shown')

    const layerViewModeFields = groupWrapper.findWhere((n) => n.props().name === `${props.name}.layerViewModeFields`)
    assert.lengthOf(layerViewModeFields.findWhere((n) => n.props().name === `${props.name}.layerViewMode`), 1,
      'Layer view mode field should be shown')
  })
  it('should render correctly with an OSM layer', () => {
    const props = {
      name: 'any',
      mapEngine: 'CESIUM',
      getMenuItems: () => {},
      validateBackgroundURL: () => {},
      validateBackgroundConf: () => {},
      entity: {
        background: true,
        enabled: true,
        layerName: 'Layer',
        layerViewMode: 'MODE_3D',
        type: 'OSM',
        url: 'https://c.tile.openstreetmap.org/',
      },
    }
    const enzymeWrapper = shallow(<LayerInfoItemComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.url`), 1,
      'Url field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.type`), 1,
      'Type field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.conf`), 1,
      'Conf field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.layersName`), 0,
      'Layer names field should not be shown')

    // Check fields group
    const groupWrapper = enzymeWrapper.find(FieldsGroup)
    assert.lengthOf(groupWrapper, 2)

    const commonFields = groupWrapper.findWhere((n) => n.props().name === `${props.name}.commonFields`)
    console.log(commonFields.debug({ verbose: true }))
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.layerName`), 1,
      'Layer name field should be shown')
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.enabled`), 1,
      'Enabled field should be shown')
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.background`), 1,
      'Background field should be shown')

    const layerViewModeFields = groupWrapper.findWhere((n) => n.props().name === `${props.name}.layerViewModeFields`)
    assert.lengthOf(layerViewModeFields.findWhere((n) => n.props().name === `${props.name}.layerViewMode`), 1,
      'Layer view mode field should be shown')
  })
  it('should render correctly with an WMS layer', () => {
    const props = {
      name: 'any',
      mapEngine: 'CESIUM',
      getMenuItems: () => {},
      validateBackgroundURL: () => {},
      validateBackgroundConf: () => {},
      entity: {
        background: false,
        enabled: false,
        layerName: 'Layer',
        layerViewMode: 'MODE_2D',
        type: 'WMS',
        url: 'http://hysope-proto.cst.cnes.fr:80/mapserver/',
        layersName: 'UC1-Classif_Seed_2017-2018',
      },
    }
    const enzymeWrapper = shallow(<LayerInfoItemComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.url`), 1,
      'Url field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.type`), 1,
      'Type field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.conf`), 1,
      'Conf field should be shown')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === `${props.name}.layersName`), 1,
      'Layer names field should be shown')

    // Check fields group
    const groupWrapper = enzymeWrapper.find(FieldsGroup)
    assert.lengthOf(groupWrapper, 2)

    const commonFields = groupWrapper.findWhere((n) => n.props().name === `${props.name}.commonFields`)
    console.log(commonFields.debug({ verbose: true }))
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.layerName`), 1,
      'Layer name field should be shown')
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.enabled`), 1,
      'Enabled field should be shown')
    assert.lengthOf(commonFields.findWhere((n) => n.props().name === `${props.name}.background`), 1,
      'Background field should be shown')

    const layerViewModeFields = groupWrapper.findWhere((n) => n.props().name === `${props.name}.layerViewModeFields`)
    assert.lengthOf(layerViewModeFields.findWhere((n) => n.props().name === `${props.name}.layerViewMode`), 1,
      'Layer view mode field should be shown')
  })
})
