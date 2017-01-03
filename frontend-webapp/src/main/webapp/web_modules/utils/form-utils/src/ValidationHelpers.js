export default {
  isValidEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  },
  isValidUrl(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i.test(url)
  },
  isValidAlphaNumericUnderscore(value) {
    return /^[A-Z0-9_]+$/i.test(value)
  },
}
