/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages French language
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'plugin.form.title.create': 'Ajouter un nouveau plugin',
  'plugin.form.title.update': 'Mise à jour du plugin {name}',
  'plugin.form.subtitle': 'Entrez le chemin d\'accès vers votre plugin et lancer la recherche pour le valider avant ajout',
  'plugin.form.name': 'Nom',
  'plugin.form.type': 'Type',
  'plugin.form.sourcesPath': 'Chemin d\'accès au fichier javascript du plugin',
  'plugin.form.submit.button': 'Ajouter',
  'plugin.form.update.button': 'Mettre à jour',
  'plugin.form.cancel.button': 'Annuler',
  'plugins.list.delete.message': 'Suppression du plugin {name}',
  'plugins.list.title': 'Liste des plugins disponibles',
  'plugins.list.subtitle': 'Les plugins présentés ci-dessous permettent de définir des nouveaux Critères de recherche ou des nouveaux Services',
  'plugins.list.table.name': 'Nom',
  'plugins.list.table.actions': 'Actions',
  'plugins.list.action.add': 'Ajouter un nouveau plugin',
}, Locales.fr)

export default messages
