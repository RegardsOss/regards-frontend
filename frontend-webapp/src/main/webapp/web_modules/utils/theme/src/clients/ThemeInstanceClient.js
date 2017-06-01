/*
 * LICENSE_PLACEHOLDER
 */
import { AccessInstanceClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const REDUX_ACTION_NAMESPACE = 'common/themes'

const themeInstanceActions = AccessInstanceClient.ThemeActions(REDUX_ACTION_NAMESPACE)

export default {
  themeInstanceActions,
}
