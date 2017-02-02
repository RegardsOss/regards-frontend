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
  'authentication.goto.reset.password': 'Ré-initialiser le mot de passe',
  'authentication.goto.create.account': 'Créer un compte',
  'authentication.goto.unlock.account': 'Débloquer un compte',

  // common to account requests forms (reset password and unlock account
  'account.request.form.mail': 'Adresse e-mail',
  'account.request.form.back': 'RETOUR',
  'account.request.form.send': 'ENVOYER',
  'account.request.form.send.failed': 'Cette adresse mail est inconnue. Ce compte existe t\'il?',
  // request account password request form
  'reset.password.request.message': 'Veuillez entrer votre adresse mail, un lien de ré-initialisation du mot de passe vous sera envoyé',
  'reset.password.request.title': 'Ré-initialisation du mot de passe',
  // unlock account request form
  'unlock.account.request.message': 'Veuillez entrer votre adresse mail pour demander le dévérouillage du compte',
  'unlock.account.request.title': 'Dévérouillage du compte utilisateur',

  // account operations results
  'unlock.request.sent.title': 'Demande de dévérouillage envoyée',
  'unlock.request.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail lorsque le compte sera dévérouillé',
  'unlock.request.sent.option': 'Retour',

  'unlock.request.done.title': 'Compte dévérouillé',
  'unlock.request.done.message': 'Votre compte utilisateur a été dévérouillé, vous pouvez accéder à l\'appliction',
  'unlock.request.done.option': 'Accès à l\'application',

  'unlock.request.token.expired.title': 'Echec du dévérouillage',
  'unlock.request.token.expired.message': 'Votre requête a expiré, veuillez renouveller la demande dévérouillage du compte',
  'unlock.request.token.expired.option': 'Dévérouiller le compte',

  'reset.password.sent.title': 'Demande de ré-initialisation envoyée',
  'reset.password.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail contenant le lien de ré-initialisation',
  'reset.password.sent.option': 'Retour',

  'reset.password.token.expired.title': 'Echec de la ré-initialisation',
  'reset.password.token.expired.message': 'Votre requête a expiré, veuillez renouveller la demande de réinitialisation du mot de passe',
  'reset.password.token.expired.option': 'Ré-initialisation',

  'reset.password.done.title': 'Mot de passe mis à jour',
  'reset.password.done.message': 'Votre mot de passe a été mis à jour, vous pouvez accéder à l\'appliction',
  'reset.password.done.option': 'Accès à l\'application',

  'create.account.sent.title': 'Demande de création envoyée',
  'create.account.sent.message': 'Votre demande a été envoyée, vous recevrez un e-mail confirmant la création',
  'create.account.sent.option': 'Retour',

  // reset password update (after receiving mail)
  'reset.password.update.request.title': 'Ré-initialisation du mot de passe',
  'reset.password.update.request.message': 'Veuillez entrer votre nouveau mot de passe pour finaliser la mise à jour de votre compte utilisateur',
  'reset.password.update.new.password': 'Nouveau mot de passe',
  'reset.password.update.confirm.password': 'Confirmation du mot de passe',
  'reset.password.update.send': 'ENVOYER',
}, Locales.fr)

export default messages
