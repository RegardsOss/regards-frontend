/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages French language
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'plugin.form.title.create': 'Ajouter un plugin',
  'plugin.form.title.update': 'Mise à jour du plugin {name}',
  'plugin.form.subtitle': 'Entrez le chemin d\'accès vers votre plugin et lancez la recherche pour le valider avant ajout',
  'plugin.form.name': 'Nom',
  'plugin.form.type': 'Type',
  'plugin.form.sourcesPath': 'Chemin d\'accès au fichier javascript du plugin',
  'plugin.form.submit.button': 'Ajouter',
  'plugin.form.update.button': 'Mettre à jour',
  'plugin.form.cancel.button': 'Annuler',
  'plugin.form.submit.error.invalid.plugin': ' Le plugin ne correspond pas à un plugin valide',
  'plugin.form.submit.error': 'Erreur durant la sauvegarde du plugin',
  'plugins.list.delete.message': 'Suppression du plugin {name}',
  'plugins.list.title': 'Plugins',
  'plugins.list.subtitle': 'Définissez des critères de recherche ou des services avec ces plugins',
  'plugins.list.table.name': 'Nom',
  'plugins.list.table.actions': 'Actions',
  'plugins.list.action.add': 'Ajouter un plugin',
  'plugins.list.action.cancel': 'Retour',
  'plugin.description.url': 'Visualiser la description du plugin',
}, Locales.fr)

export default messages
