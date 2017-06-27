/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'service.list.title': 'Liste des plugins IHM service',
  'service.list.open.tooltip': 'Configurations',

  'service.listconf.title': 'Liste des configurations du service {value}',
  'service.listconf.subtitle': 'Vous pouvez definir plusieurs configurations différentes pour chaque service',
  'service.listconf.action.add': 'Ajouter',
  'service.listconf.action.back': 'Retour',
  'service.listconf.table.label': 'Nom de la configuration',
  'service.listconf.table.status': 'Etat',
  'service.listconf.table.default': 'Activé sur tous les jeux',
  'service.listconf.table.actions': 'Actions',
  'service.listconf.tooltip.edit': 'Editer',
  'service.listconf.tooltip.delete': 'Supprimer',
  'service.listconf.tooltip.duplicate': 'Dupliquer',

  'service.listconf.plugin.title': 'Information du plugin',
  'service.listconf.plugin.description': 'Description: {value}',
  'service.listconf.plugin.version': 'Version: {value}',
  'service.listconf.plugin.author': 'Auteur: {value}',
  'service.listconf.plugin.company': 'Editeur: {value}',
  'service.listconf.plugin.email': 'Contact e-mail: {value}',
  'service.listconf.plugin.license': 'License: {value}',
  'service.listconf.plugin.url': 'Url: {value}',

  'service.form.create.title': 'Creation d\'une configuration de service',
  'service.form.edit.title': 'Edition de la configuration de service {name}',
  'service.form.duplicate.title': 'Duplication à partir de la configuration de service {name}',
  'service.form.subtitle': 'Les services ont deux types de variable en entrée: celle que vous fixez ici même dans ce formulaire (variables statiques) et les variables fixées par l\'utilisateur final (variables dynamiques). Pour les variables dynamiques, vous pouvez saisir la valeur par défaut',
  'service.form.label': 'Label de la configuration (uniquement pour les administrateurs)',
  'service.form.staticField': 'Valeur de la variable statique "{name}"',
  'service.form.dynamicField': 'Valeur par défaut de la variable dynamique "{name}"',
  'service.form.isActive': 'Activer cette configuration',
  'service.form.isDefault': 'Associer automatiquement ce service avec la configuration courante sur TOUS les jeux',
  'service.form.action.save': 'Sauvegarder',
  'service.form.action.back': 'Retour',
}, Locales.fr)

export default messages
