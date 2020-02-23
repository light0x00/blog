export default {
    "articlesTrees":ARTICLES_TREES,
	"articlesRoutePrefix":ARTILES_ROUTE_PREFIX,
	
}

const activeProfile = PROFILE
const conf1 = require(`@/config/application.js`).default
const conf2 = require(`@/config/application-${activeProfile}.js`).default
window.APP_CONFIG = {
    activeProfile,
    ...conf1, ...conf2
}