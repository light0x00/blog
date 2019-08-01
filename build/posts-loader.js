let { getOptions } = require('loader-utils');

module.exports=function loader(source) {
  const options = getOptions(this);

  for(let k in options){
      source = source.replace(k, options[k]);
  }
  return source
}