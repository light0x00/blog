const isRegex = any => any instanceof RegExp;
const isBool = any => typeof any === 'boolean';
const isString = any => typeof any === 'string';
const isFunction = any => typeof any === 'function';

const toArray = any => Array.isArray(any) ? any : (any == null ? [] : [any]);
function toFunction(val) {
	if (isBool(val)) return _ => val;
	if (isRegex(val)) return str => val.test(str);
	if (isString(val)) return str => str.includes(val);
	if (isFunction(val)) return str => val(str);
}

const NMAE = "PostRoutesPlugin"
class ReplacePlugin {

    constructor({ include=false,exclude=false,replaceRules }) {
        const includeFnArr = toArray(include).map(toFunction);
		const excludeFnArr = toArray(exclude).map(toFunction);
        
        
        this.isMatch=str=> (str !== void 0) && includeFnArr.find(fn=>fn(str)===true) && !excludeFnArr.find(fn=>fn(str)===true)
        this.replaceRules=replaceRules //不做校验
    }

    apply(compiler) {
        const replaceRules = this.replaceRules
        const isMatch = this.isMatch;
        function doReplace(modules) {
			modules.forEach(mod => {
                if(!isMatch(mod.resource)){
                    return;
                }
                //替换
                for(let k in replaceRules){
                    mod._source._value = mod._source._value.replace(k, replaceRules[k]);
                }
			});
		}

        /* for more hooks https://webpack.js.org/api/compiler-hooks/ */
        compiler.hooks.beforeCompile.tap(NMAE, bundle => {
            bundle.hooks.buildModule.tap(NMAE, doReplace);
        });

     
    }
}


module.exports=ReplacePlugin