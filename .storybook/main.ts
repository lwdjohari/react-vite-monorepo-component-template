import type { StorybookConfig } from "@storybook/react-vite";
import { withoutVitePlugins } from "@storybook/builder-vite";

const config: StorybookConfig = {
  stories: ["../@scope/*/stories/**/*.mdx", "../@scope/*/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    return {
      ...config,
      plugins: await withoutVitePlugins(config.plugins, [
        "vite:lib-inject-css",
      ]),
    };
  },
};

export default config;