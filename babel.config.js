var removeConsolePlugin = [];
if (process.env.VUE_APP_BASE_URL != 'http://localhost:3333/api') {
  removeConsolePlugin.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: removeConsolePlugin
}
