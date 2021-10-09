# no relative-path

no import-relative-path


## Rule Details

This rule aims to import path

Examples of **incorrect** code for this rule:

```js

import x from '../../x';
require('../inner');

```

Examples of **correct** code for this rule:

```js

import x from 'x';
require('inner');

```

## When Not To Use It

When you don't care about the path.

