module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["prismjs", {
      "languages": [
        "js",
        "css",
        "markup",
        "jsx",
        "html",
        "xml",
        "ts",
        'go',
        "php"],
      "plugins": ["line-numbers",'toolbar','normalize-whitespace','match-braces'],
      "theme": "okaidia",
      "css": true
    }]
  ]
}
