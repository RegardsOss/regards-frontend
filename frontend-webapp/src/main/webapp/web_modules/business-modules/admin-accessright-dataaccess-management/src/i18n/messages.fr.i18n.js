/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'invalid.require_max_more_than_min': ' La valeur maximale doit être strictement supérieure à la valeur minimale',
  'invalid.require_plugin_configuration': 'Vous devez sélectionner quelle configuration de plugin vous souhaitez utiliser',
  'accessright.table.dataset.label': 'Jeux de données',
  'accessright.table.actions': 'Actions',
  'accessright.title': 'Gestions des droits d\'accès aux jeux de données pour le groupe {name}',
  'accessright.subtitle': 'Ci-dessous, vous pouvez configurer les droits d\'accès aux jeux de données pour le groupe {name}.',
  'accessright.form.meta.accessLevel': 'Niveau d\'accès aux informations',
  'accessright.form.meta.accessLevel.NO_ACCESS': 'Aucun accès',
  'accessright.form.meta.accessLevel.RESTRICTED_ACCESS': 'Accès aux jeux',
  'accessright.form.meta.accessLevel.FULL_ACCESS': 'Accès aux jeux et objects',
  'accessright.form.data.accessLevel': 'Niveau d\'accès aux données',
  'accessright.form.data.accessLevel.NO_ACCESS': 'Refusé',
  'accessright.form.data.accessLevel.INHERITED_ACCESS': 'Autorisé',
  'accessright.form.data.accessLevel.CUSTOM_ACCESS': 'Accès autorisé par plugin',
  'accessright.form.data.accessLevel.NOT_APPLICABLE': 'Aucun accès',
  'accessright.form.accessGroup': 'Groupe d\'accès aux données',
  'accessright.form.dataset.title': 'Liste des datasets',
  'accessright.form.dataset.input': 'Recherche par nom de collection',
  'accessright.form.action.save': 'Sauvegarder',
  'accessright.form.action.advanced.hide': 'Cacher',
  'accessright.form.action.advanced.show': 'Afficher les paramètres avancés',
  'accessright.form.title': 'Formulaire de saisie d\'un ou de plusieurs droits d\'accès',
  'accessright.form.subtitle': 'Mise en place des droits d\'acces pour {nbSelectedDataset} jeux de données',
  'accessright.form.quality': 'Qualité des données récupérées',
  'accessright.form.quality.min': 'Qualité minimale requise',
  'accessright.form.quality.max': 'Qualité maximale autorisée',
  'accessright.form.quality.level': 'Niveau de qualité',
  'accessright.form.quality.level.ACCEPTED': 'Jeux acceptés',
  'accessright.form.quality.level.ACCEPTED_WITH_WARNINGS': 'Jeux acceptés avec avertissement(s)',
  'accessright.form.quality.level.REJECTED': 'Jeux refusées',
  'accessright.form.error.message': 'Une erreur s\'est produite pendant la sauvegarde des droits d\'accès',
  'accessright.edit.tooltip': 'Configurer les droits d\'accès',
  'accessright.delete.tooltip': 'Supprimer les droits d\'accès',
  'accessright.list.delete.message': 'Etes vous sû de vouloir supprimer les droits d\'accès au jeu de données {name} ?',
  'component.plugin-parameter.action.choose-plugin': 'Sélectionner un plugin',
  'component.plugin-parameter.action.reset': 'Désélectionner le plugin',
  'accessright.edit.multiples.button.label': 'Configurer l\'accès pour les jeux sélectionnés',
}, Locales.fr)

export default messages
