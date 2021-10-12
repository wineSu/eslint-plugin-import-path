const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-relative-path');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020, sourceType: 'module' } });

ruleTester.run('no-relative-path', rule, {
  valid: [
    "import whatever from '@whatever/test';",
    "require('inner');",
    "import foo from '.bar'",
    "import foo from '..bar'",
  ],
  invalid: [
    {
      code: "import whatever from '../../../../whatever';",
      errors: [
        {
          messageId: 'avoidMethod',
          data: { oldName: '../../../../whatever', newName: 'whatever' },
        },
      ],
      output: "import whatever from 'whatever';",
    },
    {
      code: "import whatever from './whatever';",
      errors: [
        {
          messageId: 'avoidMethod',
          data: { oldName: './whatever', newName: 'whatever' },
        },
      ],
      output: "import whatever from 'whatever';",
    },
    {
      code: "require('../inner');",
      errors: [
        {
          messageId: 'avoidMethod',
          data: { oldName: '../inner', newName: 'inner' },
        },
      ],
      output: "require('inner');",
    },
    {
      code: "import inner from '../whatever/inner';",
      errors: [
        {
          messageId: 'avoidMethod',
          data: { oldName: '../whatever/inner', newName: 'inner' },
        },
      ],
      output: "import inner from 'inner';",
    },
    {
      code: "import inner from '/foo/bar/baz/whatever/inner';",
      errors: [
        {
          messageId: 'avoidMethod',
          data: { oldName: '/foo/bar/baz/whatever/inner', newName: 'inner' },
        },
      ],
      output: "import inner from 'inner';",
    },
    {
      code: "import inner from '/inner';",
      errors: [
        {
          messageId: 'avoidMethod',
          data: { oldName: '/inner', newName: 'inner' },
        },
      ],
      output: "import inner from 'inner';",
    },
  ],
});
