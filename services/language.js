const { setLanguage } = require('./util/language')

module.exports = () => (req, _, next) => {
    setLanguage(req)
    return next()
}
