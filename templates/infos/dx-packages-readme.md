## Divblox Packages

Divblox packages can either be local packages or packages managed by npm. Each Divblox package must contain at least the following:

-   A `data-model.json` file that will contain the data model that describes the package's data structure.
    Read more about [divblox data models](data-models.md)
-   A file `index.js` That will contain the package's base class that facilitates its base logic
-   A file `endpoint.js` That will contain any api operations supported by the package

### Local Divblox Packages

When a local divbloxjs package is created, it must be added to the dynamic-config.json file of your divblox project in order
for divbloxjs to know about it. Rather than doing all of this manually, packages can easily by created by
running the divblox-package generator script:

`npx divbloxjs-package-generator`

### Remote Divblox Packages

Remote Divblox packages work in the same way as local ones, except that you can install them via your package manager (npm).

For ease of use, remote packages can be installed with the Divblox register-package script `npm run register-package`,
which will attempt to install the package using npm and then register it within the divbloxjs available remote packages
automatically. This is the recommended approach.

You can also manually install a Divblox package and then take care of the registration of the package. When you install
remote packages using npm (`npm i <package>`), ensure that you run `npm run register-package` to register the
package in your local divbloxjs dynamic-config.json file. If you don't run this script, your newly installed package
will not be available in your divbloxjs project.

_Note: If you did not use the Divblox Application generator to generate your app, the register-package script will not
be available and you will have to manually update dynamic-config.json to make divbloxjs
aware of your package_
