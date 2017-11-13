/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'microservice-management.maintenance.switch.mode.on.confirm': 'Passer le microservice {name} en mode maintenance ?',
  'microservice-management.maintenance.switch.mode.off.confirm': 'Sortir le microservice {name} du mode maintenance ?',

  'microservice-management.plugin.list.title': 'Plugins',
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
  'microservice-management.plugin.configuration.edit': 'Editer',
  'microservice-management.plugin.configuration.priorityOrder': 'Priorité',
  'microservice-management.plugin.configuration.parameters': 'Paramètres',

  'microservice-management.plugin.configuration.form.create.title': 'Ajouter une configuration',
  'microservice-management.plugin.configuration.form.edit.title': 'Editer la configuration',
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

  'microservice-management.sips.title': 'SIPs',
  'microservice-management.sips.list.subtitle': 'Liste des SIPS pour la session sélectionnée',
  'microservice-management.sips.list.filters.chain.label': 'Chaîne de traitement',
  'microservice-management.sips.list.filters.chain.all': 'Toutes les chaînes',
  'microservice-management.sips.list.filters.status.label': 'Statut',
  'microservice-management.sips.list.filters.status.all': 'Tous les statuts',
  'microservice-management.sips.list.filters.status.errors': 'Erreurs',
  'microservice-management.sips.list.filters.status.errors.rsingest': 'Erreurs rs-ingest',
  'microservice-management.sips.list.filters.status.errors.rsstorage': 'Erreurs rs-storage',
  'microservice-management.sips.list.filters.status.done': 'Complété',
  'microservice-management.sips.list.filters.date.label': 'Depuis',
  'microservice-management.sips.list.filters.my-sips.label': 'Uniquement mes SIPs',
  'microservice-management.sips.list.table.headers.sip-id': 'SIP ID',
  'microservice-management.sips.list.table.headers.type': 'Type',
  'microservice-management.sips.list.table.headers.state': 'Statut',
  'microservice-management.sips.list.table.headers.date': 'Date',
  'microservice-management.sips.list.table.headers.actions': 'Actions',
  'microservice-management.sips.list.table.actions.delete': 'Supprimer session',
  'microservice-management.sips.list.table.actions.original-sip': 'Voir SIP original',
  'microservice-management.sips.list.table.actions.original-aip': 'Voir AIP généré',
  'microservice-management.sips.list.table.actions.retry': 'Réessayer',
  'microservice-management.sips.list.aip-details.title': 'AIPs',
  'microservice-management.sips.list.aip-details.table.headers.aip-id': 'AIP ID',
  'microservice-management.sips.list.aip-details.table.headers.state': 'Statut',
  'microservice-management.sips.list.aip-details.table.headers.actions': 'Actions',
  'microservice-management.sips.list.aip-details.table.actions.retry': 'Réessayer',
  'microservice-management.sips.list.aip-details.table.actions.files': 'Voir fichiers',
  'microservice-management.sips.list.aip-details.table.files.title': 'Fichiers',
  'microservice-management.sips.list.aip-details.table.files.headers.name': 'Nom',
  'microservice-management.sips.list.aip-details.table.files.headers.size': 'Taille',
  'microservice-management.sips.list.aip-details.table.files.headers.actions': 'Actions',
  'microservice-management.sips.list.sip-details.title': 'Détails du SIP',
  'microservice-management.sips.stepper.list': 'Afficher SIPs',
  'microservice-management.sips.stepper.session': 'Selectionner session',

  'microservice-management.sips.session.subtitle': 'Selectionner la session associée aux SIPs désirés',
  'microservice-management.sips.session.filter.name.label': 'Filtrer par nom',
  'microservice-management.sips.session.filter.date.label': 'Filtrer par date',
  'microservice-management.sips.session.filter.date.value': 'Il y a {numDays, number} {numDays, plural, one {jour} other {jours}}',
  'microservice-management.sips.session.table.headers.id': 'ID',
  'microservice-management.sips.session.table.headers.generated': 'Génération',
  'microservice-management.sips.session.table.headers.stored': 'Stockage',
  'microservice-management.sips.session.table.headers.indexed': 'Indexation',
  'microservice-management.sips.session.table.headers.errors': 'Nombre d\'erreurs',
  'microservice-management.sips.session.table.headers.date': 'Date',
  'microservice-management.sips.session.table.headers.actions': 'Actions',
  'microservice-management.sips.session.table.actions.delete': 'Supprimer les SIPs associés',
  'microservice-management.sips.session.table.actions.list': 'Lister les SIPs associés',

}, Locales.fr)

export default messages
