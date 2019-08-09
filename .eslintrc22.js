module.exports = {
    "env": {
        // "browser": false,
        "es6": true,
        // "node":true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};