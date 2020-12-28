/* eslint-disable no-console */
const { join } = require("path");
const { rollup, watch } = require("rollup");
const alias = require("@rollup/plugin-alias");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const inject = require("@rollup/plugin-inject");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");
const { terser } = require("rollup-plugin-terser");
const { ENV, PATH } = require("./helpers.js");

const formatDuration = (ms) =>
  Math.round((ms / 1000 + Number.EPSILON) * 100) / 100;

const getInputOptions = ({ isProd }) => {
  return {
    input: join(PATH.SRC, "scripts", "main.js"),
    plugins: [
      alias({
        entries: {
          base: join(PATH.SRC, "scripts", "base"),
          common: join(PATH.SRC, "scripts", "common"),
          handlebars: join(
            PATH.ROOT,
            "node_modules",
            "handlebars",
            "dist",
            "handlebars.min.js"
          ),
          helpers: join(PATH.SRC, "scripts", "helpers"),
          underscore: join(PATH.ROOT, "node_modules", "lodash", "index.js"),
        },
      }),
      nodeResolve({
        browser: true,
        extensions: [".js", ".json", ".tmpl"],
      }),
      commonjs({
        include: "node_modules/**",
        sourceMap: !isProd,
      }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      replace({
        exclude: "node_modules/**",
        __ENV__: JSON.stringify(isProd ? ENV.PROD : ENV.DEV),
      }),
      inject({
        jQuery: "jquery",
        $: "jquery",
      }),
      isProd && terser(),
    ],
    treeshake: !isProd,
  };
};

const getOutputOptions = ({ isProd }) => ({
  format: "iife",
  sourcemap: !isProd,
  file: join(PATH.DEST, "js", "bundle.js"),
});

async function buildScripts({ isProd }) {
  const bundle = await rollup(getInputOptions({ isProd }));

  return bundle.write(getOutputOptions({ isProd }));
}
exports.buildScripts = buildScripts;

function watchScripts() {
  const watcher = watch({
    ...getInputOptions({ isProd: false }),
    output: getOutputOptions({ isProd: false }),
  });

  return new Promise((_, reject) => {
    watcher.on("event", (event) => {
      // eslint-disable-next-line default-case
      switch (event.code) {
        case "START":
          console.log(`Rollup ${event.code}...`);
          break;

        case "BUNDLE_END":
          console.log(`Bundled after ${formatDuration(event.duration)} s`);
          event.result.close(); // make sure that bundles are properly closed after each run
          break;

        case "END":
          console.log(`Rollup ${event.code}`);
          break;

        case "ERROR":
          console.error(`Rollup ${event.code}:`);

          reject(event.result);
          break;
      }
    });
  });
}
exports.watchScripts = watchScripts;
