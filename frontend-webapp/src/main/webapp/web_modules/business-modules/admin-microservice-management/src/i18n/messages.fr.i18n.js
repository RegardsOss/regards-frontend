import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'microservice-management.rs-access-project.description': 'Configuration du service de gestion de l\'interface utilisateur',
  'microservice-management.rs-access-instance.description': 'Configuration du service de gestion de l\'interface portail',
  'microservice-management.rs-admin.description': 'Configuration du service d\'administration du système',
  'microservice-management.rs-cloud.description': 'Configuration du service de configuration',
  'microservice-management.rs-dam.description': 'Configuration du service de gestion des données',
  'microservice-management.rs-gateway.description': 'Configuration de la passerelle',
  'microservice-management.rs-catalog.description': 'Configuration du service de catalogage des donées',
  'microservice-management.rs-authentication.description': 'Configuration du service d\'authentification au système',

  'microservice-management.configuration.tooltip': 'Configurer',
  'microservice-management.plugins.tooltip': 'Plugins',
  'microservice-management.maintenance.tooltip.on': 'Désactiver le mode maintenance',
  'microservice-management.maintenance.tooltip.off': 'Activer le mode maintenance',
  'microservice-management.maintenance.switch.mode.on.confirm': 'Attention, vous allez passer le microservice {name} en mode maintenance.',
  'microservice-management.maintenance.switch.mode.off.confirm': 'Attention, vous allez désactiver le mode maintenance du microservice {name} ?',

  'microservice-management.plugin.list.title': 'Plugins',
  'microservice-management.plugin.list.filter.tooltip': 'Filtrer',
  'microservice-management.plugin.list.filter.title': 'Types',
  'microservice-management.plugin.list.configurations': 'Configurations',

  'microservice-management.plugin.configuration.list.add': 'Ajouter',

  'microservice-management.plugin.configuration.copy': 'Dupliquer',
  'microservice-management.plugin.configuration.increment.priorityOrder': 'Augmenter la priorité',
  'microservice-management.plugin.configuration.decrement.priorityOrder': 'Baisser la priorité',
  'microservice-management.plugin.configuration.delete': 'Supprimer',
  'microservice-management.plugin.configuration.delete.confirmation.title': 'Suppression de la configuration de plugin {name}',
  'microservice-management.plugin.configuration.delete.confirmation.text': 'Etes vous sûr de vouloir supprimer la configuration de plugin ?',
  'microservice-management.plugin.configuration.delete.cancel': 'Annuler',
  'microservice-management.plugin.configuration.edit': 'Editer',
  'microservice-management.plugin.configuration.priorityOrder': 'Priorité',
  'microservice-management.plugin.configuration.parameters': 'Paramètres',

  'microservice-management.plugin.configuration.form.create.title': 'Ajouter une configuration',
  'microservice-management.plugin.configuration.form.edit.title': 'Editer la configuration',
  'microservice-management.plugin.configuration.form.pluginClassName': 'Classe du plugin (chemin complet)',
  'microservice-management.plugin.configuration.form.label': 'Label',
  'microservice-management.plugin.configuration.form.version': 'Version',
  'microservice-management.plugin.configuration.form.priorityOrder': 'Priorité',
  'microservice-management.plugin.configuration.form.active': 'Activée',
  'microservice-management.plugin.configuration.form.inactive': 'Désactivée',
  'microservice-management.plugin.configuration.form.action.submit.add': 'Ajouter',
  'microservice-management.plugin.configuration.form.action.submit.save': 'Sauvegarder',
  'microservice-management.plugin.configuration.form.action.cancel': 'Annuler',

  'microservice-management.plugin.parameter.list.title': 'Paramètres',
  'microservice-management.plugin.parameter.dynamicvalue.add': 'Ajouter une valeur possible',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.title': 'Ajouter une valeur possible',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.placeholder': 'Valeur',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.cancel': 'Annuler',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.submit': 'Ajouter',
  'microservice-management.plugin.parameter.dynamicvalue.setdefault': 'Par défaut',
  'microservice-management.plugin.parameter.dynamicvalue.remove': 'Supprimer',

  'microservice-management.plugin.parameter.plugin.choose': 'Choisir un plugin',
  'microservice-management.plugin.parameter.plugin.empty.menu.item': 'Aucun',

}, Locales.fr)

export default messages
