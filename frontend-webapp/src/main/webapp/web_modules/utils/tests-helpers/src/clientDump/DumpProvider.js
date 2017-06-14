/**
 * LICENSE_PLACEHOLDER
 **/
import { normalize } from 'normalizr'
import keys from 'lodash/keys'
import cloneDeep from 'lodash/cloneDeep'
import DumpDictionary from './DumpDictionary'

/**
 * Define a class that receive a constant defining the type of entity dump that you want
 * to use inside containers tests, components tests, storybook tests,...
 * Its job is to find the right client dump and the normalizr configuration and return the result
 * @author Léo Mieulet
 **/


class DumpProvider {

  dumpDictionary = DumpDictionary

  static getContent(json, isPageable) {
    if (isPageable) {
      return json.content
    }
    return json
  }

  /**
   * Return a valid entity list
   * @param microserviceName
   * @param entityName
   * @returns {*}
   */
  get(microserviceName, entityName) {
    const conf = cloneDeep(this.dumpDictionary[microserviceName][entityName])
    if (!conf) {
      throw new Error(`The entityName you've provided ${entityName} does not exists`)
    }
    if (conf.isSignal) {
      return conf.dump
    }
    return normalize(DumpProvider.getContent(conf.dump, conf.isPageable), conf.ENTITY_ARRAY).entities[conf.normalizrKey]
  }

  /**
   * Return a valid entity
   * @param microserviceName
   * @param entityName
   * @returns {*}
   */
  getFirstEntity(microserviceName, entityName) {
    return this.getNthEntity(microserviceName, entityName, 0)
  }


  /**
   * Return a valid entity
   * @param microserviceName
   * @param entityName
   * @returns {*}
   */
  getNthEntity(microserviceName, entityName, n) {
    const entityListResult = this.get(microserviceName, entityName)
    return entityListResult[keys(entityListResult)[n]]
  }

  /**
   * Return a valid entity
   * @param microserviceName
   * @param entityName
   * @returns {*}
   */
  getFirstEntityKey(microserviceName, entityName) {
    const entityListResult = this.get(microserviceName, entityName)
    return keys(entityListResult)[0]
  }

  getFirstEntityContent(microserviceName, entityName) {
    const entityResult = this.getFirstEntity(microserviceName, entityName)
    if (!entityResult.content) {
      throw new Error("DumpProvider doesn't have an entity to return, so it can't return the content")
    }
    return entityResult.content
  }
}

const instance = new DumpProvider()
export default instance
