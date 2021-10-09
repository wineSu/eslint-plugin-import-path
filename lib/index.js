/**
 * @fileoverview no console time
 */
const rules = require('./rules/no-relative-path');

module.exports = {
  rules: {
    'no-relative-path': rules,
  },
  configs: {
    recommended: {
      rules: {
        'import-path/no-relative-path': 1,
      },
    },
  },
};
