module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@models": "./src/models",
          "@controllers": "./src/controllers",
          "@routes": "./src/routes",
          "@interfaces": "./src/interfaces",
          "@configs": "./src/configs",
          "@infra": "./src/infra",
          "@providers": "./src/providers",
          "@services": "./src/services",
          "@sns": "./src/sns",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
