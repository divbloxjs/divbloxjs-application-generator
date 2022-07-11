## Divblox config

The file `dxconfig.json` is used to setup your divblox instance. It contains
important information regarding your environments, their database connections, etc.

The following is an example of a default `dxconfig.json` file that is created
when you use the Divblox Application Generator.

```
[dxConfigExample]
```

###Explanation

-   `appName`: The name of your app
-   `environment`: Specifies which environment to load when you run `npm start`
-   `environmentArray`: Contains the configuration for each available environment.
-   `environmentArray.development`: Contains the configuration for the 'development' environment.
-   `environmentArray.development.webServerPort`: Specifies the port to use when starting the Divblox web server. This web
    server wraps expressjs for its routing functionality.
-   `environmentArray.development.webServerCorsAllowedList`: Specifies the list of allowed origins for cors. If "\*"
    is provided it means that any origin is allowed. If the array is empty it will only allow same origin. This is used as the
    config for the expressjs cors package.
-   `environmentArray.development.webServerCorsOptions`: Specifies the cors options that the web server should use. E.g {"credentials": true}
    If it is an empty object, no additional cors options will be set. This is used as the config for cors options of the expressjs cors package.
-   `environmentArray.development.useHttps`: If set to `true`, the property `serverHttps` must be populated since divblox
    will attempt to start a https server rather than a http server for expressjs
-   `environmentArray.development.serverBaseUrl` The base url for our server. This is used when needing to access static resources
-   `environmentArray.development.uploadServePath` The path from our serverBaseUrl that will be used to serve uploaded resources
-   `environmentArray.development.serverHttps`: The paths to the keyfile and certificate when running in https mode.
    You can easily generate these files with

`openssl req -nodes -new -x509 -keyout server.key -out server.cert`

-   `environmentArray.development.serverHttps.keyPath`: The path to the keyfile
-   `environmentArray.development.serverHttps.certPath`: The path to the certificate
-   `environmentArray.development.serverHttps.allowHttp`: If set to `true` the webserver will also serve requests via http
-   `environmentArray.development.serverHttps.httpsPort`: The port on which to serve https requests

-   `environmentArray.development.modules.main`: Contains the database configuration for the module called 'main'. The 'ssl'
    property should be either `false` or the path to the ssl certificate that will be used to connect to the given database.
    Your Divblox project can have multiple modules and `environmentArray.development.modules` is where each database
    configuration for a module is defined.

-   `environmentArray.development.jwtSecret`: The secret that is used to sign and verify JWT tokens. Ensure that
    this is a string with sufficient length and randomness. Also, ensure that this secret is different for each environment.

-   `environmentArray.development.dataModelState`: Used to maintain the state of the data model vs the database.
    Divblox will use the information to alert the user when the underlying database needs to be synchronized with
    the provided data model.

    -   `environmentArray.development.dataModelState.currentDataModelHash`: A hash of the complete current data model that
        can be used to detect changes
    -   `environmentArray.development.dataModelState.lastDataModelChangeTimestamp`: A unix timestamp that refers to when the
        data model was last changed. Divblox will update this when a change is detected.
    -   `environmentArray.development.dataModelState.lastDataModelSyncTimestamp`: A unix timestamp that refers to when the
        database was last synchronized with the provided data model.

-   `environmentArray.developent.timeZone`: The timezone for your server. A list of standardized timezones can be found
    on wikipedia here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

-   `webServiceConfig`: Contains the configuration for the Divblox web service
-   `webServiceConfig.wwwRoot`: Specifies the root for the divblox public landing page
-   `webServiceConfig.staticRoot`: Specifies the root for static assets such as images, stylesheets, etc
-   `webServiceConfig.viewsRoot`: Specifies the root for all expressjs views
-   `webServiceConfig.additionalRoutes`: An array that contains additional routes that Divblox should set up. Each additional
    route is an object containing a `location` (The url path that will be reached) and a `router` (The path to the expressjs
    router that will handle requests)
-   `divbloxPackagesRootLocal`: Specifies the root path that will host all local divblox packages
-   `divbloxPackages`: Specifies all installed divblox packages. Packages can be either locally hosted or remotely.
-   `divbloxPackages.local`: An array containing the package names of every locally hosted divblox package
-   `divbloxPackages.remote`: An array containing the package names of every remotely hosted divblox package that has been installed
