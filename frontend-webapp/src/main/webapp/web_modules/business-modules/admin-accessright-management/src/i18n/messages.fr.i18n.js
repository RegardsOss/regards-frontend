/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'invalid.require_max_more_than_min': ' La valeur maximale doit être strictement supérieure à la valeur minimale',
  'invalid.require_plugin_configuration': 'Vous devez sélectionner quelle configuration de plugin vous souhaitez utiliser',
  'accessright.title': 'Gestions des droits d\'accès aux jeux de données par groupe d\'accès',
  'accessright.subtitle': 'Sélectionnez un groupe de d\'accès, sélectionnez ensuite les jeux auquel il a accès puis configurez cet accès',
  'accessright.form.accesslevel': 'Niveau d\'accès aux meta-données des jeux de données',
  'accessright.form.accesslevel.NO_ACCESS': 'Aucun accès',
  'accessright.form.accesslevel.RESTRICTED_ACCESS': 'Accès réduit',
  'accessright.form.accesslevel.FULL_ACCESS': 'Accès complet',
  'accessright.form.dataAccessLevel': 'Niveau d\'accès aux données',
  'accessright.form.dataAccessLevel.NO_ACCESS': 'Aucun droit',
  'accessright.form.dataAccessLevel.INHERITED_ACCESS': 'Accès hérité',
  'accessright.form.dataAccessLevel.CUSTOM_ACCESS': 'Accès autorisé par plugin',
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
  'component.plugin-parameter.action.choose-plugin': 'Sélectionner un plugin',
  'component.plugin-parameter.action.reset': 'Désélectionner le plugin',
}, Locales.fr)

export default messages
