/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Locales } from '@regardsoss/form-utils'

const messages = {
  'microservice-management.rs-access-project.description': 'Configuration du service de gestion de l\'interface utilisateur',
  'microservice-management.rs-access-instance.description': 'Configuration du service de gestion de l\'interface portail',
  'microservice-management.rs-admin.description': 'Configuration du service d\'administration du système',
  'microservice-management.rs-cloud.description': 'Configuration du service de configuration',
  'microservice-management.rs-dam.description': 'Configuration du service de gestion des données',
  'microservice-management.rs-gateway.description': 'Configuration de la passerelle',
  'microservice-management.rs-catalog.description': 'Configuration du service de catalogage des données',
  'microservice-management.rs-authentication.description': 'Configuration du service d\'authentification au système',
  'microservice-management.rs-storage.description': 'Configuration du service de stockage des données physiques.',
  'microservice-management.rs-ingest.description': 'Configuration du service de gestion d\'ajouts de données aux travers des SIPs',
  'microservice-management.rs-order.description': 'Configuration du service de gestion des commandes utilisateur',
  'microservice-management.rs-dataprovider.description': 'Configuration du service d\'ajout automatique de données. Ce service génère des SIPs depuis un emplacement de fourniture de données. Les SIPs ainsi générés, sont ensuite envoyés au microservice rs-ingest.',
  'microservice-management.rs-fem.description': 'Catalogue d\'entités GeoJSON avec gestion optionelle du stockage des fichiers',
  'microservice-management.rs-notifier.description': ' Service de notifiation destiné à la production',
  'microservice-management.rs-processing.description': 'Configuration du service de gestion des traitements',
  'microservice-management.rs-worker-manager.description': 'Configuration du service de gestion des workers',
  'microservice-management.rs-lta-manager.description': 'Configuration du service de gestion des demandes de pérenisation/suppression (LTA)',

  'microservice-management.configuration.tooltip': 'Configurer',
  'microservice-management.plugins.tooltip': 'Plugins',
  'microservice-management.maintenance.tooltip.on': 'Désactiver le mode maintenance',
  'microservice-management.maintenance.tooltip.off': 'Activer le mode maintenance',
  'microservice-management.maintenance.switch.mode.on.confirm': 'Passer le microservice {name} en mode maintenance ?',
  'microservice-management.maintenance.switch.mode.off.confirm': 'Sortir le microservice {name} du mode maintenance ?',

  'microservice-management.plugin.list.title': 'Plugins',
  'microservice-management.plugin.list.clear.cache.tooltip': 'Vider le cache des plugins',
  'microservice-management.plugin.list.filter.tooltip': 'Filtrer',
  'microservice-management.plugin.list.filter.title': 'Types',
  'microservice-management.plugin.list.configurations': 'Configurations',

  'microservice-management.plugin.configuration.list.add': 'Ajouter',
  'microservice-management.plugin.configuration.list.back': 'Retour',

  'microservice-management.plugin.configuration.copy': 'Dupliquer',
  'microservice-management.plugin.configuration.increment.priorityOrder': 'Augmenter la priorité',
  'microservice-management.plugin.configuration.decrement.priorityOrder': 'Baisser la priorité',
  'microservice-management.plugin.configuration.delete': 'Supprimer',
  'microservice-management.plugin.configuration.delete.confirmation.title': 'Suppression de la configuration de plugin {name}',
  'microservice-management.plugin.configuration.delete.confirmation.text': 'Supprimer la configuration de plugin ?',
  'microservice-management.plugin.configuration.delete.cancel': 'Annuler',
  'microservice-management.plugin.configuration.edit': 'Éditer',
  'microservice-management.plugin.configuration.priorityOrder': 'Priorité',
  'microservice-management.plugin.configuration.parameters': 'Paramètres',

  'microservice-management.plugin.configuration.form.create.title': 'Ajouter une configuration',
  'microservice-management.plugin.configuration.form.edit.title': 'Éditer la configuration',
  'microservice-management.plugin.configuration.form.pluginClassName': 'Classe du plugin (chemin complet)',
  'microservice-management.plugin.configuration.form.label': 'Label *',
  'microservice-management.plugin.configuration.form.version': 'Version *',
  'microservice-management.plugin.configuration.form.priorityOrder': 'Priorité *',
  'microservice-management.plugin.configuration.form.icon': 'Icône (lien http)',
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

  'microservice-management.plugin.configurations.empty': 'Aucune configuration définie',

  'renderer.fileField.button.select.label': 'Sélectionner un fichier JSON',
  'microservice.conf-backup.title': 'Import et téléchargement de configuration de {name}',
  'microservice.conf-backup.action.export': 'Télécharger',
  'microservice.conf-backup.action.back': 'Retour',
  'microservice.conf-backup.export': 'Télécharger la configuration de ce microservice',
  'microservice.conf-backup.import': 'Importer une configuration de ce microservice',
  'microservice.conf-backup.error.only-error': 'Tous les imports ont ils échoués: ',
  'microservice.conf-backup.error.only-error.true': 'Oui',
  'microservice.conf-backup.error.only-error.false': 'Non',
  'microservice.conf-backup.error.module-conf': 'Erreur lors de l\'import des configurations du module ',
  'microservice-management.backup-conf.tooltip': 'Gérer les backups',

  'plugin.description.more': 'Description détaillée ...',
  ...Locales.fr,
}

export default messages
