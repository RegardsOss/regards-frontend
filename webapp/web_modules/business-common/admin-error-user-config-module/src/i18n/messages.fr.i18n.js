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
  'error.message.module.title': 'Erreurs de configuration détectées !',
  'error.message.module.subtitle': 'Ces corrections doivent être traitées pour assurer le bon fonctionnement de REGARDS.',
  'error.message.module.subtitle.one': 'Nous listons ici les attributs non recherchables utilisés dans les modules du type \'search-result\' et \'search-graph\' du projet.',
  'error.message.module.subtitle.two': 'Deux solutions permettent de régler ce(s) problème(s) de configuration : soit vous rendez l\'attribut recherchable depuis le formulaire d\'édition de l\'attribut, soit vous supprimez cet attribut de la configuration du module associé.',
  'error.message.module.subtitle.three': 'Toute modification de la partie recherchable d\'un attribut sur REGARDS doit être suivi d\'une réinitialisation de l\'index afin que ces changements soient pris en compte par ElasticSearch.',
  'error.message.module.subtitle.four': 'Enfin, il est également listé les configurations qui utilisent dans le cadre du Volet de recherche des attributs de type INTEGER ou LONG. Vous devez les enlever.',
  'error.message.module.name': 'Le module [{value}] présente les erreurs suivantes :',
  'error.message.module.filters': 'Onglet Filtres : utilisation des attributs suivants alors qu\'ils ne sont pas recharchable : [{values}]',
  'error.message.module.criteriaGroup.title': 'Onglet Volet de recherche :',
  'error.message.module.criteriaGroup': ' - Groupe [{value}] : utilisation des attributs suivants alors qu\'ils ne sont pas recharchable ou d\'un type INTEGER/LONG : [{values}]',
  'error.message.module.button.refresh': 'Actualiser les erreurs de configurations',
  'error.message.module.button.close': 'Ignorer',

  ...Locales.fr,
}

export default messages
