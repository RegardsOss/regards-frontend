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
  'invalid.require_max_more_than_min': ' La valeur maximale doit être strictement supérieure à la valeur minimale',
  'invalid.require_plugin_configuration': 'Vous devez sélectionner quelle configuration de plugin vous souhaitez utiliser',
  'accessright.table.dataset.label': 'Jeux de données',
  'accessright.table.actions': 'Actions',
  'accessright.title': 'Droits d\'accès aux jeux de données pour le groupe {name}',
  'accessright.subtitle': 'Configurez les droits d\'accès aux jeux de données pour le groupe {name}',
  'accessright.form.meta.accessLevel': 'Niveau d\'accès aux informations',
  'accessright.form.meta.accessLevel.NO_ACCESS': 'Aucun accès',
  'accessright.form.meta.accessLevel.RESTRICTED_ACCESS': 'Accès aux jeux',
  'accessright.form.meta.accessLevel.FULL_ACCESS': 'Accès aux jeux et objets',
  'accessright.form.data.accessLevel': 'Niveau d\'accès aux données',
  'accessright.form.data.accessLevel.NO_ACCESS': 'Refusé',
  'accessright.form.data.accessLevel.INHERITED_ACCESS': 'Autorisé',
  'accessright.form.data.accessLevel.CUSTOM_ACCESS': 'Accès autorisé par plugin',
  'accessright.form.data.accessLevel.NOT_APPLICABLE': 'Aucun accès',
  'accessright.form.accessGroup': 'Groupe d\'accès aux données',
  'accessright.form.dataset.title': 'Liste des datasets',
  'accessright.form.dataset.input': 'Recherche par nom de collection',
  'accessright.form.action.save': 'Sauvegarder',
  'accessright.form.action.cancel': 'Annuler',
  'accessright.form.action.back': 'Retour',
  'accessright.form.action.advanced.hide': 'Cacher',
  'accessright.form.action.advanced.show': 'Afficher les paramètres avancés',
  'accessright.form.title': 'Droits d\'accès',
  'accessright.form.subtitle': 'Mise en place des droits d\'acès pour {nbSelectedDataset} jeux de données',
  'accessright.form.quality': 'Qualité des données récupérées',
  'accessright.form.quality.min': 'Qualité minimale requise',
  'accessright.form.quality.max': 'Qualité maximale autorisée',
  'accessright.form.quality.level': 'Niveau de qualité',
  'accessright.form.quality.level.ACCEPTED': 'Jeux acceptés',
  'accessright.form.quality.level.ACCEPTED_WITH_WARNINGS': 'Jeux acceptés avec avertissement(s)',
  'accessright.form.quality.level.REJECTED': 'Jeux refusés',
  'accessright.form.error.message': 'Une erreur s\'est produite pendant la sauvegarde des droits d\'accès',
  'accessright.edit.tooltip': 'Configurer les droits d\'accès',
  'accessright.delete.tooltip': 'Retirer les droits d\'accès',
  'accessright.list.delete.message': 'Supprimer les droits d\'accès au jeu de données {name}?',
  'component.plugin-parameter.action.choose-plugin': 'Sélectionner un plugin',
  'component.plugin-parameter.action.reset': 'Désélectionner le plugin',
  'component.plugin-parameter.no-plugin-available': 'Aucun plugin disponible',
  'accessright.edit.multiples.button.label': 'Configurer l\'accès pour les jeux sélectionnés',
  'accessright.no.dataset.title': 'Pas de jeux de données',
  'accessright.no.dataset.subtitle': 'Créez votre premier jeu de données',
}, Locales.fr)

export default messages
