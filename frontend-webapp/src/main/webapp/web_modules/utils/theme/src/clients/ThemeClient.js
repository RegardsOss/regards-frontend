/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['common', 'theme', 'list']
const REDUX_ACTION_NAMESPACE = 'common/themes'

const themeReducers = AccessProjectClient.ThemeReducers(REDUX_ACTION_NAMESPACE)
const themeActions = AccessProjectClient.ThemeActions(REDUX_ACTION_NAMESPACE)
const themeSelectors = AccessProjectClient.ThemeSelectors(ENTITIES_STORE_PATH)

export default {
  themeReducers,
  themeActions,
  themeSelectors,
}
