## Divblox Data models
A Divblox data model describes the data structure of your project in a json file. It is important to note that
the file is case-sensitive and that all keys and values must be provided in camelCase. 
The structure of the file is described below.

### Structure
#### Entities
The file must contain an object with the highest-level keys/properties being the names of "Entities".
Entities directly translate to database tables when the data model is synchronized with your database.

```
{
  "entityOne": {
    ...
  },
  "entityTwo": {
    ...
  },
  "entityThree": {
    ...
  }
}
```

#### Modules
Each entity must have a property called "module" that contains the name of the module in which this entity belongs.
Modules are essentially individual databases that the Divblox Data Layer will connect to. It is important to
know in which module an entity resides, in order to connect to the correct database when executing sql queries relating
to the specific entity.

```
{
  "entityOne": {
    "module": "main"
    ...
  },
  "entityTwo": {
    "module": "secondary"
    ...
  },
  "entityThree": {
    "module": "main"
    ...
  },
}
```

#### Attributes
Each entity must have a property called "attributes". The value of this field must be an object containing each separate
attribute as a property. An attribute directly translates to a database table column when the data model is synchronized
with your database. Therefore, the value of each attribute property must be an object containing its configuration for 
the database table.

```
{
  "entityOne": {
    ...
    "attributes": {
      "attributeOne": {
        "type": "A valid mysql database table type, e.g INT, VARCHAR, DATETIME, etc",
        "lengthOrValues": [null|string|int] "If column type is "enum" or "set", please enter the values using this format: 'a','b','c'",
        "default": [null|value|"CURRENT_TIMESTAMP"] "The default value for the column.",
        "allowNull": "Whether to allow null or not for the column"
      },
      "attributeTwo": {
        ...
      },
      "attributeThree": {
        ...
      },
    }
  }
}
```

#### Indexes

#### Relationships

#### Optional settings


