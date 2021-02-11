/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @author Sébastien Binda
 */
const messages = {
  'dataaccess.services.list.title': 'Configuration des services applicables aux données du catalogue',
  'dataaccess.services.list.subtitle': 'Cette section vous permet de configurer les services applicables aux données du catalogue.',
  'dataaccess.services.list.header.id.label': 'Identifiant',
  'dataaccess.services.list.header.name.label': 'Libellé',
  'dataaccess.services.list.header.type.label': 'Type de service',
  'dataaccess.services.list.header.active.label': 'Activer',
  'dataaccess.services.list.edit.button': 'Éditer la configuration',
  'dataaccess.services.list.duplicate.button': 'Dupliquer la configuration',
  'dataaccess.services.list.active.on.button': 'Activer ce service',
  'dataaccess.services.list.active.off.button': 'Désactiver ce service',
  'dataaccess.services.list.confirm.title': 'Suppression du service {name} ?',
  'dataaccess.services.list.back.button': 'Retour',
  'dataaccess.services.list.empty.title': 'Aucun service défini',
  'dataaccess.services.list.add.button': 'Ajouter un service',

  'dataaccess.services.form.create.title': 'Ajout d\'un nouveau service',
  'dataaccess.services.form.edit.title': 'Édition du service "{name}"',
  'dataaccess.services.form.create.subtitle': 'Après avoir sélectionné le type de service, veuillez renseigner les paramètres de configuration associés.',
  'dataaccess.services.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'dataaccess.services.form.type.select.title': 'Type de service',
  'dataaccess.services.form.type.select.label': 'Sélectionnez un type ...',
  'dataaccess.services.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'dataaccess.services.form.back.button': 'Annuler',
  ...Locales.fr,
}

export default messages
