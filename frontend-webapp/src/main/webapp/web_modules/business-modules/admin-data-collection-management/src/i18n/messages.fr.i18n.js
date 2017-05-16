import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'collection.list.action.add': 'Ajouter',
  'collection.list.action.cancel': 'Annuler',
  'collection.list.title': 'Liste des collections',
  'collection.list.subtitle': 'Les collections sont des regroupements de données par thématique',
  'collection.list.delete.message': 'Etes vous sûr de vouloir supprimer la collection {name} ?',
  'collection.form.links.component.subtitle': 'Lien de la collection courante',
  'collection.form.links.remainingcollection.subtitle': 'Collection disponibles',
  'collection.form.links.collection.subtitle': 'Collection liées',
  'collection.form.links.subtitle': 'Les collections disposent de lien entre elles afin de simplifier la recherche',
  'collection.form.links.title': 'Mise à jour des liens entre collections',
  'collection.form.links.action.done': 'Terminer',
  'collection.form.links.action.cancel': 'Retour',
  'collection.form.links.remainingcollection.search': 'Filtrer les collections sur leur nom',
  'collection.list.table.label': 'Label',
  'collection.list.table.actions': 'Actions',
  'collection.list.table.model': 'Modele',
  'collection.form.action.next': 'Suivant',
  'collection.form.action.cancel': 'Annuler',
  'collection.form.model': 'Modèles de collection',
  'collection.form.label': 'Libellé',
  'collection.form.table.value': 'Valeur fixe',
  'collection.form.table.label': 'Attribut du modèle',
  'collection.form.table.fragment': 'Fragment',
  'collection.form.table.input': 'Valeur de l\'attribut',
  'collection.form.subtitle': 'Gestion des attributs d\'une collection',
  'collection.edit.title': 'Edition de la collection {name}',
  'collection.create.title': 'Création d\'une nouvelle collection',
  'collection.duplicate.title': 'Dupliquer la collection {name}',
  'invalid.max_128_carac': 'Le label d\'une collection ne peut dépasser 128 caractères',
  'collection.stepper.links': 'Edition des liens avec les autres collections',
  'collection.stepper.attributes': 'Saisie des attributs d\'une collection',

  'collection.form.descriptionUrl': 'URL de la page décrivant le jeu de données',
  'collection.form.descriptionFileContent': 'Uploader un fichier Markdown ou PDF',
  'collection.form.descriptionFileContentReuploadToOverride': 'Uploader un fichier Markdown ou PDF contenant la description si vous voulez écraser celle déjà présente',
  'collection.form.datasource': 'Source de données',
  'collection.form.radio.descriptionUrl': 'Donner l\'URL contenant la description',
  'collection.form.radio.descriptionFileContent': 'Uploader un fichier contenant la description',
  'collection.form.radio.none': 'Pas de description',
}, Locales.fr)

export default messages

