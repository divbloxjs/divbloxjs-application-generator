## Divblox Packages

Divblox packages can either be local packages or packages managed by npm. Each Divblox package must contain at least the following: 

- A `data-model.json` file that will contain the data model that describes the package's data structure
- A file `index.js` That will contain the package's base class that facilitates its base logic
- A file `endpoint.js` That will contain any api operations supported by the package

### Local Divblox Packages
When a local divbloxjs package is created, it must be added to the dxconfig.json file of your divblox project in order 
for divbloxjs to know about it. Rather than doing all of this manually, packages can easily by created by 
running the divblox-package generator script: 

`npx github:divbloxjs/divbloxjs-package-generator`

### Remote Divblox Packages
Remote Divblox packages work in the same way as local ones, except that you need to manually register them in
order for divbloxjs to know about them.

When you install remote packages using npm (`npm install --save <package>`), ensure that you run `npm run register-package` to register the
package in your local divbloxjs dxconfig.json file. If you don't run this script, your newly installed package
will not be available in your divbloxjs project.

*Note: If you did not use the Divblox Application generator to generate your app, the register-package script
will not be available and you will have to manually update dxconfig.json to make divbloxjs aware of your package*
