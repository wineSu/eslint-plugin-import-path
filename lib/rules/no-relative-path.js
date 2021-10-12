/**
 * no import-relative-path
 */

function isRelativeOrAbsolutePath(path) {
  return /^(?:\/.+|\..*\/.+)/.test(path);
}

const getImportDepth = (path) => {
  // 这里传入的 path 不止是 Literal 的, 还有很多其他情况 例如 TemplateLiteral 等其他值, require(`foo`)
  if (typeof path === 'string' && isRelativeOrAbsolutePath(path)) {
    const matches = path.match(/\/([^/]+)$/);
    if (matches) {
      return matches[1];
    }
  }
  return '';
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
            return fixer.replaceText(node, `'${matchName}'`);
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
