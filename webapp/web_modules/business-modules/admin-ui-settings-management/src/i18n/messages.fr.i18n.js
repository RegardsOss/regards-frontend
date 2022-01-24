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
  ...Locales.fr, // append form messages

  'ui.admin.settings.title': 'Paramètres de l\'interface utilisateur',
  'ui.admin.settings.subtitle': 'Saisie des éléments de configuration communs, s\'appliquant à tous les modules utilisateurs.',
  'ui.admin.settings.data.presentation.title': 'Présentation des données',
  'ui.admin.settings.show.product.version.label': 'Afficher la version des produits',
  'ui.admin.settings.main.quicklook.group.key.label': 'Mot-clé du quicklook principal',
  'ui.admin.settings.main.quicklook.group.key.help.message': `Lorsque le mot-clé du quicklook principal est trouvé dans le champs "types" d'un fichier QUICKLOOK, 
   ce fichier est considéré comme appartenant au groupe principal de quicklook pour cette donnée. Le groupe principal est affiché par défaut, pour cette donnée, dans l'application utilisateur.`,
  'ui.admin.settings.quota.warning.title': 'Avertissements liés au quota',
  'ui.admin.settings.low.quota.warning.label': 'Avertissement de quota faible',
  'ui.admin.settings.low.quota.warning.help.message': `Le quota maximal d'un utilisateur désigne le nombre de fichiers de donnée brute stockés en interne par REGARDS qu'il peut télécharger. 
  Un avertissement est affiché pour l'utilisateur lorsque son quota restant est inférieur ou égal à la valeur d'avertissement saisie ici.
  Entrez la valeur '0' pour désactiver cette fonctionnalité.`,
  'ui.admin.settings.low.rate.warning.label': 'Avertissement de vitesse de téléchargement faible',
  'ui.admin.settings.low.rate.warning.help.message': `La vitesse maximale de téléchargement d'un utilisateur désigne le nombre de fichiers de donnée brute stockés en interne par REGARDS qu'il peut télécharger 
  simultanément. Un avertissement est affiché pour l'utilisateur lorsque le nombre de fichiers qu'il peut encore télécharger simultanément est inférieur ou égal à la valeur d'avertissement saisie ici.
  Entrez la valeur '0' pour désactiver cette fonctionnalité.`,
  'ui.admin.settings.models.title': 'Modèles de données et de documents',
  'ui.admin.settings.data.models.header': 'Modèles de données: {count}',
  'ui.admin.settings.no.data.model.title': 'Aucun modèle de donnée',
  'ui.admin.settings.add.to.document.models.title': 'Ajouter aux modèles de document',
  'ui.admin.settings.document.models.header': 'Modèles de documents sélectionés: {count}',
  'ui.admin.settings.no.document.model.title': 'Aucune sélection',
  'ui.admin.settings.no.document.model.message': 'Ajoutez ici les modèles des entités qui doivent affichées en tant que documents',
  'ui.admin.settings.add.to.data.models.title': 'Ajouter aux modèles de donnée',
  'ui.admin.settings.action.confirm': 'Confirmer',
  'ui.admin.settings.action.cancel': 'Annuler',
}

export default messages
