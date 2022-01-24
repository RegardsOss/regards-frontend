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
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'authentication.username': 'Utilisateur ou adresse e-mail',
  'authentication.password': 'Mot de passe',
  'authentication.button': 'Connexion',
  'authentication.cancel': 'Annuler',
  'authentication.message': 'Veuillez saisir vos identifiants pour vous connecter',
  'authentication.external.title': 'Ou se connecter avec...',
  'authentication.external.message': 'Se connecter avec un compte affilié',
  'authentication.external.button.label': 'Connexion avec {name}',
  'authentication.external.button.unlock.label': 'Déverouiller votre session sur {name}',
  'authentication.error.ACCOUNT_UNKNOWN': 'L\'adresse e-mail et / ou le mot de passe sont inconnus',
  'authentication.error.ACCOUNT_PENDING': 'Votre compte utilisateur REGARDS n\'a pas encore été validé. Vous serez notifié par e-mail de tout changement',
  'authentication.error.ACCOUNT_INACTIVE': 'Votre compte utilisateur est désactivé, veuillez contacter l\'administrateur du système',
  'authentication.error.ACCOUNT_INACTIVE_PASSWORD': 'Votre mot de passe est expiré. Veuillez le renouveler.',
  'authentication.error.ACCOUNT_LOCKED': 'Votre compte est bloqué. Pour le débloquer, cliquez sur "Compte bloqué ?"',
  'authentication.error.USER_UNKNOWN': 'Vous n\'avez pas accès à ce projet. Pour demander l\'accès, cliquez sur "Nouvel utilisateur ?", avec l\'option "J\'ai déjà accès à un autre projet"',
  'authentication.error.USER_WAITING_ACCESS': 'Votre demande d\'accès au projet est en cours de traitement. Vous recevrez un e-mail en cas de changement',
  'authentication.error.USER_WAITING_EMAIL_VERIFICATION': 'Vous n\'avez pas encore validé votre compte, veuillez suivre le lien d\'activation fourni par e-mail',
  'authentication.error.USER_ACCESS_DENIED': 'Votre demande d\'accès au projet a été rejetée',
  'authentication.error.USER_ACCESS_INACTIVE': 'Vos droits d\'accès au projet sont désactivés, veuillez contacter l\'administrateur du projet',
  'authentication.error.INSTANCE_ACCESS_DENIED': 'Vous n\'avez pas les droits suffisants pour accéder au panneau d\'administration d\'instance du système REGARDS',
  'authentication.error.UNKNOWN_ERROR': 'Le serveur est actuellement indisponible. Merci de réessayer plus tard.',
  'authentication.error.CONNEXION_ERROR': 'Impossible de se connecter',
  'authentication.goto.reset.password': 'Mot de passe oublié ?',
  'authentication.goto.ask.access': 'Nouvel utilisateur ?',
  'authentication.goto.unlock.account': 'Compte bloqué ?',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'Adresse e-mail',
  'account.request.form.back': 'Retour',
  'account.request.form.send': 'Envoyer',

  // reset account password request form
  'ask.reset.password.form.message': 'Entrez votre adresse e-mail, un lien de ré-initialisation du mot de passe vous sera envoyé',
  'ask.reset.password.form.title': 'Ré-initialisation du mot de passe',
  'ask.reset.password.form.send.failed': '{status, plural, '
    + '=404 {L\'adresse e-mail saisie est inconnue}'
    + 'other {Une erreur inconnue s\'est produite (#)}}',

  // unlock account request form
  'ask.unlock.account.form.message': 'Entrez votre adresse e-mail pour demander le déverrouillage du compte',
  'ask.unlock.account.form.title': 'Déverrouillage du compte utilisateur',
  'ask.unlock.account.form.send.failed': '{status, plural, '
    + '=403 {Le compte lié à ce mail n\'est pas bloqué}'
    + '=404 {L\'adresse e-mail saisie est inconnue.}'
    + 'other {Une erreur inconnue s\'est produite (#)}}',

  // ask project access form
  'ask.project.access.request.title': 'Demander un accès projet',
  'ask.project.access.request.message': 'Renseignez ci-dessous vos données personnelles pour obtenir un accès au projet ou renseignez l\'adresse e-mail de votre compte REGARDS si vous en avez déjà un.',
  'ask.project.access.using.existing.account': 'J\'ai déjà accès à un autre projet',
  'ask.project.access.mail': 'Adresse e-mail (*)',
  'ask.project.access.first.name': 'Prénom (*)',
  'ask.project.access.last.name': 'Nom (*)',
  'ask.project.access.new.password': 'Mot de passe (*)',
  'ask.project.access.confirm.password': 'Confirmation du mot de passe (*)',
  'ask.project.access.send': 'Envoyer',
  'ask.project.access.form.back': 'Retour',
  'ask.project.access.request.submitting': 'Soumission',
  'ask.create.account.error.409': 'Cette adresse e-mail est déjà utilisée par un compte REGARDS existant',
  'ask.create.account.error.unknown': 'Une erreur inconnue s\'est produite  ({status})',
  'ask.create.user.error.404': 'Il n\'existe aucun compte REGARDS pour l\'adresse e-mail saisie',
  'ask.create.user.error.409': 'Vous avez déjà demandé l\'accès à ce projet',
  'ask.create.user.error.unknown': 'Une erreur inconnue s\'est produite  ({status})',

  // reset password operation
  'ask.reset.password.sent.title': 'Demande de ré-initialisation envoyée',
  'ask.reset.password.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail contenant le lien de ré-initialisation',
  'ask.reset.password.sent.option': 'Retour',
  'ask.reset.password.token.expired.title': 'Échec de la ré-initialisation',
  'ask.reset.password.token.expired.message': 'Votre requête a expiré, renouvelez la demande de réinitialisation du mot de passe',
  'ask.reset.password.token.expired.option': 'Retour',
  'reset.password.done.title': 'Mot de passe mis à jour',
  'reset.password.done.message': 'Votre mot de passe a été mis à jour, vous pouvez accéder à l\'application',
  'reset.password.done.option': 'Connexion',

  // Ask project access
  'ask.project.access.sent.title': 'Demande d\'accès envoyée',
  'ask.project.access.sent.message': 'Votre demande d\'accès au projet a été émise. Vous recevrez un e-mail vous prévenant de son acceptation',
  'ask.project.access.sent.option': 'Retour',

  // New account operation
  'create.account.sent.title': 'Demande de compte envoyée',
  'create.account.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail pour activer votre compte',
  'create.account.sent.option': 'Retour',
  'new.account.validated.title': 'Compte activé',
  'new.account.validated.message': 'Votre compte utilisateur a été activé',
  'new.account.validated.option': 'Connexion',
  'new.account.token.expired.title': 'Échec de la création du compte',
  'new.account.token.expired.message': 'Votre compte utilisateur n\'a pas pu être validé, veuillez renouveler votre demande',
  'new.account.token.expired.option': 'Retour',

  // Validating new account
  'new.acount.validating.title': 'Validation du compte',
  'new.acount.validating.message': 'Nous traitons la requête de validation du compte, veuillez patienter',

  // unlock account operation
  'ask.unlock.account.sent.title': 'Demande de déverrouillage envoyée',
  'ask.unlock.account.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail lorsque le compte sera déverrouillé',
  'ask.unlock.account.sent.option': 'Retour',
  'ask.unlock.account.token.expired.title': 'Échec du déverrouillage',
  'ask.unlock.account.token.expired.message': 'Votre requête a expiré, veuillez renouveler la demande déverrouillage du compte',
  'ask.unlock.account.token.expired.option': 'Retour',
  'unlock.account.done.title': 'Compte déverrouillé',
  'unlock.account.done.message': 'Votre compte utilisateur a été déverrouillé, vous pouvez accéder à l\'application',
  'unlock.account.done.option': 'Connexion',

  // reset password update (after receiving mail)
  'reset.password.update.request.title': 'Ré-initialisation du mot de passe',
  'change.password.update.request.title': 'Changer votre mot de passe',
  'reset.password.update.request.message': 'Entrez votre nouveau mot de passe pour finaliser la mise à jour de votre compte utilisateur. {passwordRules}',
  'change.password.update.request.message': 'Entrez votre ancien et nouveau mot de passe. {passwordRules}',
  'change.password.update.old.password': 'Mot de passe actuel',
  'reset.password.update.new.password': 'Nouveau mot de passe',
  'reset.password.update.confirm.password': 'Confirmation du mot de passe',
  'reset.password.update.send': 'Envoyer',
  'reset.password.update.error': 'Impossible de changer votre mot de passe. Vérifiez les informations saisies.',
  'reset.password.update.cancel': 'Annuler',

  // finish unlock account loading pane
  'finish.unlock.account.title': 'Déverrouillage du compte',
  'finish.unlock.account.message': 'Nous débloquons votre compte, veuillez patienter...',

  'session.locked.title': 'Session verrouillée',
  'session.locked.subtitle': 'Entrez votre mot de passe pour la déverrouiller',
  'ext.session.locked.subtitle': 'Votre session a expirée',
  'session.locked.password': 'Mot de passe',
  'session.locked.button': 'Déverrouiller',
  'session.locked.error': 'Identifiants invalides',

  ...Locales.fr,
  ...MetadataLocales.fr,
}

export default messages
