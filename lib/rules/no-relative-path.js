/**
 * no import-relative-path
 */

const getImportDepth = (path) => {
  const regex = /^((\.*\/)+).*$/;
  if (path.match) {
    const matches = path.match(regex);
    if (matches) {
      return matches[0].replace(matches[1], '');
    }
  }
  return false;
};

module.exports = {
  meta: {
    docs: {
      description: 'no import-relative-path',
      category: 'Fill something',
      recommended: true,
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [],
    messages: {
      avoidMethod: "Relative path is not allowed, please use '{{newName}}' insted of '{{oldName}}'",
    },
  },

  create(context) {
    const report = (source, node) => {
      const matchName = getImportDepth(source);
      if (matchName) {
        context.report({
          node,
          messageId: 'avoidMethod',
          data: {
            oldName: source,
            newName: matchName,
          },
          fix(fixer) {
            return fixer.replaceText(node, `"${matchName}"`);
          },
        });
      }
    };

    return {
      ImportDeclaration: (_node) => {
        report(_node.source.value, _node.source);
      },
      CallExpression: (_node) => {
        if (_node.callee.name === 'require') {
          _node.arguments.forEach((ele) => {
            report(ele.value, ele);
          });
        }
      },
    };
  },
};
