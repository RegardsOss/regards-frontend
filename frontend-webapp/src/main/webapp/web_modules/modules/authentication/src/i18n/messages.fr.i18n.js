/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'authentication.username': 'Addresse e-mail',
  'authentication.password': 'Mot de passe',
  'authentication.button': 'Connexion',
  'authentication.cancel': 'Annuler',
  'authentication.message': 'Veuillez saisir vos identifiants pour vous connecter',
  'authentication.error': 'Identifiant et/ou mot de passe invalide(s)',
  'authentication.error.500': 'Service indisponible',
  'authentication.goto.reset.password': 'Mot de passe oublié?',
  'authentication.goto.create.account': 'Nouvel utilisateur?',
  'authentication.goto.unlock.account': 'Compte bloqué?',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'Adresse e-mail',
  'account.request.form.back': 'RETOUR',
  'account.request.form.send': 'ENVOYER',

  // request account password request form
  'ask.reset.password.form.message': 'Veuillez entrer votre adresse mail, un lien de ré-initialisation du mot de passe vous sera envoyé',
  'ask.reset.password.form.title': 'Ré-initialisation du mot de passe',
  'ask.reset.password.form.send.failed': '{status, plural, ' +
    '=404 {L\'adresse e-mail saisie est inconnue}' +
    'other {Une erreur inconnue s\'est produite (#)}}',

  // unlock account request form
  'ask.unlock.account.form.message': 'Veuillez entrer votre adresse mail pour demander le dévérouillage du compte',
  'ask.unlock.account.form.title': 'Dévérouillage du compte utilisateur',
  'ask.unlock.account.form.send.failed': '{status, plural, ' +
    '=403 {Le compte lié à ce mail n\'est pas bloqué}' +
    '=404 {L\'adresse e-mail saisie est inconnue.}' +
    'other {Une erreur inconnue s\'est produite (#)}}',

  'create.account.request.title': 'Créer un compte',
  'create.account.request.message': 'Veuillez renseigner ci-dessous vos données personnelles. Votre compte REGARDS peut être utilisé avec tous les projets à cet adresse.',
  'create.account.mail': 'Adresse e-mail',
  'create.account.first.name': 'Prénom',
  'create.account.last.name': 'Nom',
  'create.account.new.password': 'Mot de passe',
  'create.account.confirm.password': 'Confirmation du mot de passe',
  'create.account.send': 'Créer',
  'create.account.form.back': 'Retour',

  // reset password operation
  'ask.reset.password.sent.title': 'Demande de ré-initialisation envoyée',
  'ask.reset.password.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail contenant le lien de ré-initialisation',
  'ask.reset.password.sent.option': 'Retour',
  'ask.reset.password.token.expired.title': 'Echec de la ré-initialisation',
  'ask.reset.password.token.expired.message': 'Votre requête a expiré, veuillez renouveller la demande de réinitialisation du mot de passe',
  'ask.reset.password.token.expired.option': 'Retour',
  'reset.password.done.title': 'Mot de passe mis à jour',
  'reset.password.done.message': 'Votre mot de passe a été mis à jour, vous pouvez accéder à l\'application',
  'reset.password.done.option': 'Connexion',

  // create account operation
  'create.account.sent.title': 'Demande de compte envoyée',
  'create.account.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail pour activer votre compte',
  'create.account.sent.option': 'Retour',
  'create.account.done.title': 'Compte activé',
  'create.account.done.message': 'Votre compte utilisateur a été activé',
  'create.account.done.option': 'Connexion',

  // unlock account operation
  'ask.unlock.account.sent.title': 'Demande de dévérouillage envoyée',
  'ask.unlock.account.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail lorsque le compte sera dévérouillé',
  'ask.unlock.account.sent.option': 'Retour',
  'ask.unlock.account.token.expired.title': 'Echec du dévérouillage',
  'ask.unlock.account.token.expired.message': 'Votre requête a expiré, veuillez renouveller la demande dévérouillage du compte',
  'ask.unlock.account.token.expired.option': 'Retour',
  'unlock.account.done.title': 'Compte dévérouillé',
  'unlock.account.done.message': 'Votre compte utilisateur a été dévérouillé, vous pouvez accéder à l\'application',
  'unlock.account.done.option': 'Connexion',

  // reset password update (after receiving mail)
  'reset.password.update.request.title': 'Ré-initialisation du mot de passe',
  'reset.password.update.request.message': 'Veuillez entrer votre nouveau mot de passe pour finaliser la mise à jour de votre compte utilisateur',
  'reset.password.update.new.password': 'Nouveau mot de passe',
  'reset.password.update.confirm.password': 'Confirmation du mot de passe',
  'reset.password.update.send': 'ENVOYER',

  // finish unlock account loading pane
  'finish.unlock.account.title': 'Dévérouillage du compte',
  'finish.unlock.account.message': 'Nous débloquons votre compte, veuillez patienter...',

}, Locales.fr)

export default messages
