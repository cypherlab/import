# `@cypherlab/import`


🔧 ESM import utility

<a href="https://www.npmjs.com/package/@cypherlab/import">
  <img alt="npm" src="https://img.shields.io/npm/v/@cypherlab/import">
</a>


## Usage 

It's a utility that can import an ES file from different sources, with a fallback mechanism.  
The main usage is by specifying your local/dev sources first, and fallback sources after.  
Sources can be localhost or external, but always use http protocol.

You can specify a second argument to choose what is returned from the module.  
By default it returns the `default` export, but you can pass either a `string` or a function `(module) => module.myExportedKey`.


Import ES modules :

```js
<script async type="module">
  import Import from 'https://unpkg.com/@cypherlab/import'

  const MyComponent = await Import.esm([
      `http://localhost/dist/index.js`            // local import
    , 'https://unpkg.com/@cypherlab/react-table'  // external import
  ], m => m.default)
</script>
```

You can also import basic `<script>` tag into web page :

```js
<script async type="module">
  import Import from 'https://unpkg.com/@cypherlab/import'

  await Import.script([
      `http://localhost/dist/index.js`            // local import
    , 'https://unpkg.com/@cypherlab/react-table'  // external import
  ], true)
</script>
```