export default {
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "auto",
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: ["**/*.scss", "*.scss"],
      options: {
        singleQuote: false,
      },
    },
  ],
};