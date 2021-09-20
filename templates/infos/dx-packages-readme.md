## Divblox Packages

Divblox packages can either be local packages or packages managed by npm. Each Divblox package must contain at least the following: 

- A `data-model.json` file that will contain the data model that describes the package's data structure
- A file `[packageName].js` That will contain the package's base class that facilitates its base logic
- A file `[packageNameEndPoint].js` That will contain any api operations supported by the package

When a package is created, it must be added to the dxconfig.json file of your divblox project in order for Divblox to know about it.
Packages can also easily by created by running the divblox-package generator script: 

`npx github:divbloxjs/divbloxjs-package-generator`

npm packages will have post install scripts that will update the dxconfig.json file with their info