/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
