module.exports = {
  '*.{css,scss}': ['stylelint --fix', 'prettier --write .'],
  '*.{less,html,json}': ['prettier --write .'],
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
};
