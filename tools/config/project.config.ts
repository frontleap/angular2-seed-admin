import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  ENABLE_SASS = true;
  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
       {src: 'lodash/lodash.min.js', inject: 'libs'},

    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      //  {src: `${this.CSS_SRC}/node_modules/normalize-css/normalize.css`, inject: true, vendor: true},
    ];

    // Add packages (e.g. lodash)
    // let additionalPackages2: ExtendPackages[] = [{
    //   name: 'ng2-bootstrap',
    //   path: `${this.APP_BASE}node_modules/ng2-bootstrap/ng2-bootstrap.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // }];

    // or
    //
    let additionalPackages: ExtendPackages[] = [];

    additionalPackages.push({
      name: 'lodash',
      path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    },

    {
      name: 'ng2-bootstrap',
      path: `${this.APP_BASE}node_modules/ng2-bootstrap/ng2-bootstrap.js`,
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    },
    {
      name: 'moment',
      path: `${this.APP_BASE}node_modules/moment/moment.js`,
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    },
    // {
    //   name: 'theme',
    //   path: `${this.APP_BASE}node_modules/theme/index.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // },
    {
      name: '@angularclass/hmr',
      path: `${this.APP_BASE}node_modules/@angularclass/hmr/dist/index.js`,
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }
    // {
    //   name: 'normalize-css',
    //   path: `${this.APP_BASE}node_modules/normalize-css/normalize.css`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // }
  );

    // let additionalPackages2: ExtendPackages[] = [];
    //
    // additionalPackages.push({
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/ng2-bootstrap/ng2-bootstrap.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // });

    this.addPackagesBundles(additionalPackages);
    // this.addPackagesBundles(additionalPackages2);


    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
