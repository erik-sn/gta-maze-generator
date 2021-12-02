<h1 align="center">fivem-ts-boilerplate</h1>

Forked from [fivem-ts-boilerplate](https://github.com/d0p3t/fivem-ts-boilerplate) with more recent package updates.

## Usage
1. Clone repository into your `resources/[local]` folder.
2. `npm i` the dependencies.
3. Start development.

### Development
Use `npm run watch` to watch files during development.

### Production
Build your production ready code with `npm run build`.

This will build the client and server script with the `--mode production` flag.

### Automatic Builds (Optional)
The `fxmanifest.lua` is not setup to automatically build upon first FXServer start. If you'd like to setup automatic builds you must add the following to your `fxmanifest.lua`.

```lua
dependency 'yarn'
dependency 'webpack'

webpack_config 'webpack.config.js'
```

However, due to the speed performance of the pre-packaged webpack/yarn of cfx-server-data, we suggest you don't do this and build manually as described previously ("Production").

## License
This product is MIT licensed. Please make sure you give credit and include this license in your product.