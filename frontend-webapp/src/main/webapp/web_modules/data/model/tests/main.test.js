/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import Models from '../src/main'


describe('[MODEL] Testing all models (aka shape in the react world)', () => {
  it('should exists', () => {
    assert.isDefined(Models)
  })
  describe('should define shapes of rs-', () => {
    const shallExist = model => function () {
      assert.isDefined(model)
      assert.isFunction(model, model)
    }
    describe('access', () => {
      it('check Plugin', shallExist(Models.Plugin))
      it('check PluginDefinition', shallExist(Models.PluginDefinition))
      it('check PluginInfo', shallExist(Models.PluginInfo))
      it('check PluginConf', shallExist(Models.PluginConf))
      it('check AccessProject', shallExist(Models.AccessProject))
      it('check Module', shallExist(Models.Module))
      it('check Layout', shallExist(Models.Layout))
      it('check LayoutContent', shallExist(Models.LayoutContent))
    })
    describe('admin', () => {
      it('check ProjectUser', shallExist(Models.ProjectUser))
      it('check Role', shallExist(Models.Role))
      it('check Project', shallExist(Models.Project))
      it('check Account', shallExist(Models.Account))
      it('check Resource', shallExist(Models.Resource))
      it('check ResourceList', shallExist(Models.ResourceList))
      it('check Endpoint', shallExist(Models.Endpoint))

      it('check PluginMetaData', shallExist(Models.PluginMetaData))
      it('check PluginMetaDataList', shallExist(Models.PluginMetaDataList))
      it('check PluginConfiguration', shallExist(Models.PluginConfiguration))
      it('check PluginConfigurationList', shallExist(Models.PluginConfigurationList))
      it('check PluginParameter', shallExist(Models.PluginParameter))
      it('check PluginParameterType', shallExist(Models.PluginParameterType))
      it('check PluginDynamicValue', shallExist(Models.PluginDynamicValue))
      it('check PluginDynamicValueList', shallExist(Models.PluginDynamicValueList))
    })
    describe('archival-storage', () => {
      it('check AIPStatus', shallExist(Models.AIPStatus))
      it('check StoragePlugin', shallExist(Models.StoragePlugin))
      it('check StoragePluginShape', shallExist(Models.StoragePluginShape))
    })
    describe('catalog', () => {
      it('check Entity', shallExist(Models.Entity))
      it('check LinkPluginDataset', shallExist(Models.LinkPluginDataset))
    })
    describe('dam', () => {
      it('check AttributeModel', shallExist(Models.AttributeModel))
      it('check Fragment', shallExist(Models.Fragment))
      it('check Model', shallExist(Models.Model))
      it('check ModelAttribute', shallExist(Models.ModelAttribute))
      it('check Collection', shallExist(Models.Collection))
      it('check Dataset', shallExist(Models.Dataset))
      it('check Datasource', shallExist(Models.Datasource))
      it('check AccessGroup', shallExist(Models.AccessGroup))
      it('check AccessRight', shallExist(Models.AccessRight))
      it('check Connection', shallExist(Models.Connection))
    })
    describe('common', () => {
      it('check locationShape', shallExist(Models.locationShape))
      it('check URL', shallExist(Models.URL))
      it('check Percent', shallExist(Models.Percent))
      it('check RangedNumber', shallExist(Models.RangedNumber))
      it('check relativeURLRegexp', shallExist(Models.relativeURLRegexp))
      it('check validURLRegexp', shallExist(Models.validURLRegexp))
    })
  })
})
