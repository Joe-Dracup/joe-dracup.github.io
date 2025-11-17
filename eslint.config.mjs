import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({
  typescript: {
    tsconfigPath: 'tsconfig.json',
    overridesTypeAware: {
      'ts/strict-boolean-expressions': 'off',
    },
  },
}, {
  rules: {
    'vue/no-restricted-block': ['error', {
      element: 'style',
      message: 'Do not use <style> block in this project. Use TailwindCSS classes instead.',
    }],
  },
  // this rule is an old Vue 2 rule that is enabled for server components which we dont use... https://github.com/nuxt/eslint/issues/457
})).removeRules('vue/no-multiple-template-root')
