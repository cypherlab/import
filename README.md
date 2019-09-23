# `@cypherlab/import`


🔧 Import files/modules utility

<a href="https://www.npmjs.com/package/@cypherlab/import">
  <img alt="npm" src="https://img.shields.io/npm/v/@cypherlab/import">
</a>


## Usage 

It's a utility that can import an ES file from different sources, with a fallback mechanism.  
The main usage is by specifying your local/dev sources first, and fallback sources after.  
Sources can be localhost or external, but always use http protocol.

You can specify a second argument to choose what is returned from the module.  
By default it returns the `default` export, but you can pass either a `string` or a function `(module) => module.myExportedKey`.


```html
<html>
  <head>
    <script src="https://unpkg.com/@cypherlab/import" crossorigin></script>
    <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
  </head>
  <body>

    <div id="root"></div>

    <script async type="module">

      (async () => {

        const MyComponent = await ImportUtils.esm([ 
            `${document.location.origin}/dist/myscript.esm.js`
          , 'https://unpkg.com/@cypherlab/react-flow/dist/myscript.esm.js'
        ])

        ReactDOM.render(
            React.createElement(MyScript, {})
          , document.getElementById('root')
        )

      })();

    </script>
  </body>
</html>
```


## Import ES modules :
Make sure the files are `esm` builds.

```js
const MyComponent = await Import.esm([
    `http://localhost/dist/index.esm.js`         // local import
  , 'https://unpkg.com/myLib/dist/index.esm.js'  // external import
], m => m.default, 'boolean:debug')
```

## Import global `<script>` tag into `<head />` web page :
Make sure the files are `umd` builds, and exports a global name. (ex: window.myLib)

```js
await Import.script([
    `http://localhost/dist/index.umd.js`         // local import
  , 'https://unpkg.com/myLib/dist/index.umd.js'  // external import
], 'boolean:async')

myLib.someMethod()
```