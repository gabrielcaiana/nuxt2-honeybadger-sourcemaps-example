# Nuxt 2 Honeybadger Integration with Source Maps

This repository demonstrates integrating [Honeybadger](https://www.honeybadger.io/) with a Nuxt 2 project for error tracking, including support for uploading source maps in production. This allows Honeybadger to provide accurate stack traces for errors in minified code.

<img width="1439" alt="Screenshot 2024-11-06 at 23 18 09" src="https://github.com/user-attachments/assets/d7461618-33b7-4761-ad22-492096464a67">

## Prerequisites

- Nuxt 2
- Honeybadger account and API key

## Installation

1. **Clone this repository:**

    ```bash
    git clone https://github.com/your-username/nuxt2-honeybadger-sourcemaps
    cd nuxt2-honeybadger-sourcemaps
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of your project:

    ```env
    HONEYBADGER_API_KEY=your_honeybadger_api_key
    HONEYBADGER_ENVIRONMENT=production
    VERCEL_GIT_COMMIT_SHA=your_commit_sha
    ```

    - Replace `your_honeybadger_api_key` with your Honeybadger API key.
    - Set `HONEYBADGER_ENVIRONMENT` as needed, for example `production`.
    - Optionally, set `VERCEL_GIT_COMMIT_SHA` with your commit SHA if you are using Vercel.

## Configuration

### 1. Plugin Configuration

The Honeybadger Vue plugin is added in `plugins/honeybadger.js`:

```javascript
import HoneybadgerVue from "@honeybadger-io/vue";
import Vue from "vue";

export default ({ app, $config }, inject) => {
  const config = {
    apiKey: $config.honeybadgerApiKey,
    environment: $config.honeybadgerEnvironment,
    revision: "main",
  };

  Vue.use(HoneybadgerVue, config);

  inject("honeybadger", HoneybadgerVue);
};
```

### 2. Nuxt Config

```javascript
import HoneybadgerSourceMapPlugin from '@honeybadger-io/webpack';

export default {
  target: 'static',

  plugins: [{ src: '~/plugins/honeybadger.js', mode: 'client' }],

  build: {
    extend(config, { isDev, isClient }) {
      if (!isDev && isClient) {
        config.devtool = 'source-map';  // Enable source maps in production
        config.plugins.push(
          new HoneybadgerSourceMapPlugin({
            apiKey: process.env.HONEYBADGER_API_KEY,
            assetsUrl: 'https://nuxt2-honeybadger-sourcemaps-example.vercel.app/_nuxt',
            revision: process.env.VERCEL_GIT_COMMIT_SHA || new Date().toISOString(),
          })
        );
      }
    },
    transpile: ['@honeybadger-io/webpack'],
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[contenthash].js'),
    },
  },

  publicRuntimeConfig: {
    honeybadgerApiKey: process.env.HONEYBADGER_API_KEY,
    honeybadgerEnvironment: process.env.HONEYBADGER_ENVIRONMENT,
  }
};
```

### 3. Important Settings

- ```assetsUrl```: Set this to the URL where your assets are hosted in production.
- ```revision```: Unique identifier for your build, such as your commit SHA or a timestamp.

#### Usage
After setting up the configuration:

Deploy your application.
Verify errors and source map accuracy in the Honeybadger dashboard.
Running Locally
To start the application locally:

```bash
npm run dev
```

Visit http://localhost:3000.

#### License
This project is licensed under the MIT License.

```
This `README.md` should provide all necessary steps and information for someone to understand and use your project.
```

