module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extends',
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'block-no-empty': null,
    'declaration-property-value-no-unknown': true,
    // 'unit-allowed-list': ["%","deg", 'px', 'rem', "ms", 's'],

    // stylelint-order rules
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
  },
};
