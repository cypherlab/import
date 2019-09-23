const log = console.log

const urlExists = (uri, isAsync = false) => {
  return new Promise((solv, ject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        // debug && log(xhr); 
        if(xhr.status != 404 && xhr.responseText) solv(uri)
        else ject(true)
      }
    }

    xhr.open('GET', uri, isAsync);
    xhr.send('');
  })
}


const insertScript = (src, isAsync = false) => {
  return new Promise(solv => {
    const tag  = document.createElement('script'),
    head = document.head || document.getElementsByTagName('head')[0];
    tag.src = src;
    tag.async = isAsync;
    tag.onload = solv;
    head.insertBefore(tag, head.firstChild)
  }) 
}



const scriptImport = async (paths, isAsync = true, debug=false) => {
  for (const p of paths) {
    let status = `import "${p}"`
    try { 
      if(!(await urlExists(p, isAsync))) return
      await insertScript(p, isAsync) 
      debug && log(`${status} - ok`)
      break
    }catch(e){ 
      debug && log(`${status} - failed`)
    }    
  }
}


console esmImport = async (paths=[], module, debug=false) => {
  if(typeof module == 'string'){
    const moduleString = module
    module = m => m[moduleString]
  }

  if(!module) module = m=>m.default

  let first

  for (const p of paths) {
    let status = `import "${p}"`
    try { 
      first = module(await import(p)) 
      debug && log(`${status} - ok`)
      break
    }catch(e){ 
      debug && log(`${status} - failed`)
    }    
  }

  return first
}


export default {
    esm: esmImport
  , script: scriptImport
}