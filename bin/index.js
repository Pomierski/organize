#!/usr/bin/env node
var e=require("fs"),i=require("fs-extra"),o=require("chalk"),r=require("path"),n=require("commander");function t(e){return e&&e.__esModule?e.default:e}var s;s=JSON.parse('{"initialPath":"./","prefix":"\\n[Organize]:","fileExtensions":{"Images":["jpg","jpeg","png","jp2","j2k","jpf","jpx","jpm","mj2","heif","heic","arw","cr2","nrw","k25","tiff","tif","bmp","dib","jpe","jif","jfif","jfi","gif","webp"],"Icons":["svg","svgz","ico"],"Documents":["txt","pdf","doc","docx","docm","dot","dotx","pages","uof","odt","xls","xlsx","xps","ods","ppt","pptx","odp","epub","gslides","key","keynote","pez","pot","pps","ppt","pptx","prz","sdd","show","sti","sxi"],"Music":["mp3","wav","m4a","flac","wma","aac","ogg","oga","mogg","opus","3gp"],"Videos":["webm","ogv","gifv","rm","amv","mpeg","mp4","mov"],"Movies":["vob","drc","rmvb","mkv","flv","wmv","amv","avi"],"Archives":["zip","rar","7z","bz2","gz","tar"]}}');const{prefix:a}=t(s);let c;var g;(g=c||(c={})).Info="info",g.Success="success",g.Warning="warning",g.Casual="casual";const l=(e,i)=>console.log(o.red.bgBlack.bold(`${e} ${i&&`: ${i}`}`)),p=(e,i)=>{switch(i){case c.Success:return console.log(`${a} ${o.green.bold(e)}`);case c.Info:return console.log(`${a} ${o.yellowBright.bold(e)}`);case c.Warning:return console.log(`${a} ${(0,o.red)(e)}`);case c.Casual:default:return console.log(`${a} ${(0,o.grey)(e)}`)}};let d;var f;(f=d||(d={})).OnMove="onMove",f.ReadDir="readDir",f.Parameter="parameter";const m=(e,i)=>{switch(e){case d.OnMove:return l("Error while moving file",i);case d.ReadDir:return l("Unable to scan directory",i);case d.Parameter:return l("Error, check if you entered parameter value correctly",i);default:return l("Unexpected error",i)}};var u=r.resolve(__dirname,"../src/options");const $=require(`${(0,r.join)(u,"../../package.json")}`),v=new(0,n.Command);v.version($.version).description(`${(0,o.green)("Organize")} your files \n${(0,o.magentaBright)("[Categories]")}: ${Object.keys(s.fileExtensions).join(", ")}\n      `),v.option("-i, --ignore [category or categories]",`Ignore files from one or many categories, e.g ${o.magentaBright.italic("organize -i 'videos'")} or ${o.magentaBright.italic("organize -i 'videos, movies, music'")}`),v.option("-o, --only [files group]",`Organize by only one category, e.g ${o.magentaBright.italic("organize -o 'videos'")}`),v.option("-e, --extension [file extension]",`Organize files with specified extension, e.g ${o.magentaBright.italic("organize -e 'webm'")}`),v.option("-c, --custom [new category, file extension]",`Organize files with extension which categories don't contain, e.g ${o.magentaBright.italic("organize -e 'Javascript, js'")}`),v.parse(process.argv);const h=e=>e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase(),x=e=>{const i=(0,r.extname)(e);return i.slice(1,i.length).toLowerCase()},{initialPath:y}=t(s);let{fileExtensions:w}=t(s);const z=v.opts(),b=Object.keys(w);if(z.ignore)if(z.ignore.includes(" ")){const e=z.ignore.split(" ").map((e=>h(e)));b.forEach((i=>{e.includes(i)&&delete w[i]}))}else if(z.ignore.includes(" "))m(d.Parameter);else{const e=h(z.ignore);b.includes(e)&&delete w[e]}if(z.only){const e=h(z.only);e in w?w={[e]:w[e]}:m(d.Parameter)}if(z.extension){const e=z.extension.toLowerCase();let i;b.forEach((o=>{e[o].includes(e)&&(i=o)})),i?w={[i]:[e]}:m(d.Parameter)}if(z.custom){const e=z.custom.replace(/\s/g,"").split(",");if(2===e.length){const i=e[0],o=e[1];w={[i]:o}}else m(d.Parameter)}const j=(o,r,n)=>{const t=(e=>b.find((i=>w[i].includes(e))))(r);if(t){if((i=>{if(i)(0,e.existsSync)(`${y}/${i}`)||(0,e.mkdir)(`${y}/${i}`,(e=>e))})(t),!(0,e.existsSync)(`${y}/${t}/${o}`)){try{(0,i.moveSync)(`${y}/${o}`,`${y}/${t}/${o}`)}catch(e){m(d.OnMove,e)}return n(),p(`Moving ${o} into ${t}/${o}`,c.Casual)}return(0,e.existsSync)(`${y}/${t}/${o}`)?p(`${o} already exist in ${t} directory, skipping...`,c.Warning):void 0}};(()=>{let i=0;(0,e.readdir)(y,((e,o)=>{if(e)return m(d.ReadDir,e);o.forEach(((e,r)=>(j(e,x(e),(()=>{i+=1})),i||r!==o.length-1?r===o.length-1?p(`Organized ${i} files\n`,c.Success):void 0:p("No files found to be organized\n",c.Info))))}))})();
//# sourceMappingURL=index.js.map
