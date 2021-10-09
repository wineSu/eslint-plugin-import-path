const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-relative-path');

RuleTester.setDefaultConfig({
  parser: 'babel-eslint',
});

const ruleTester = new RuleTester();

ruleTester.run('no-relative-path', rule, {
  valid: ["import whatever from '@whatever/test';", "require('inner');"],
  invalid: [
    {
      code: "import whatever from '../../../../whatever';",
    },
    {
      code: "import whatever from './whatever';",
    },
    {
      code: "require('../inner');",
    },
  ],
});
