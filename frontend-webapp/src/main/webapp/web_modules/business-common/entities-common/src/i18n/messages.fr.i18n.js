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

/**
 * Module message for FR local
 * @author Raphaël Mechali
 */
const messages = {
  // description
  'description.breadcrumb.root': 'Description: {entityLabel}',
  'entities.common.properties.tabs': 'Propriétés',
  'entities.common.description.tabs': 'Description',
  'entities.common.files.tabs': 'Fichiers',
  'entities.common.quicklook.tabs': 'Imagettes',
  'entities.common.file.subheader': 'Cliquez sur un des fichiers ci-dessous pour le télécharger',
  'entities.common.close.button': 'Fermer',
  'entities.common.properties.attributes': 'Attributs',
  'entities.common.properties.loading.attributes': 'Chargement des attributs',
  'entities.common.properties.no.attribute': 'Cette entité n\'a pas d\'attribut',
  'entities.common.properties.tags.entities': 'Mot-clefs liés',
  'entities.common.properties.documents.entities': 'Documents associés',
  'entities.common.properties.document.entities': 'Documents associés',
  'entities.common.properties.loading.tags': 'Chargement des mot-clefs',
  'entities.common.properties.loading.document': 'Chargement des documents',
  'entities.common.properties.no.tag': 'Cette entité n\'a pas de mot-clef',
  'entities.common.properties.no.document': 'Cette entité n\'a pas de document',
  'entities.common.properties.tag.search.tooltip': 'Rechercher les entités portant ce tag',
  'entities.common.properties.tag.show.description.tooltip': 'Afficher les détails de l\'entité',

  'entities.common.description.loading': 'Chargement de la description',
  'entities.common.description.no.value.title': 'Aucune description',
  'entities.common.description.no.value.message': 'Cette entité n\'a pas de description',
  'entities.common.document.files.no.value.title': 'Aucun fichier',
  'entities.common.document.files.no.value.message': 'Ce document n\'a pas de fichiers joints',

  // services
  'entities.common.services.error.title': 'Erreur de service',
  'entities.common.services.notice.title': 'Service exécuté',
  'entities.common.services.loading.plugin.information': 'Chargement du service',
  'entities.common.services.loading.plugin.failed': 'Le chargement du service a échoué',
  'entities.common.services.plugin.parameters.error': 'La configuration du service contient des erreurs',
  'entities.common.services.loading.results': 'Traitement en cours',
  'entities.common.services.parameter.required': '{label} (*)',
  'entities.common.services.parameter.description.dialog.title': 'Description du paramètre {parameter}',
  'entities.common.services.parameter.description.dialog.close': 'Fermer',
  'entities.common.services.plugin.run.failed': 'Le traitement du service a échoué',
  'entities.common.services.plugin.run.empty': 'Le traitement du service s\'est correctement terminé. Il n\'a produit aucun fichier',
  'entities.common.services.submit.parameters': 'Suivant',
  'entities.common.services.change.parameters': 'Précédent',
  'entities.common.services.close.service': 'Fermer',
  'entities.common.services.download.service.result': 'Télécharger',
  'entities.common.services.ui.plugin.running.error': 'Une erreur est survenue pendant l\'exécution du service',

  ...Locales.fr,
}

export default messages
