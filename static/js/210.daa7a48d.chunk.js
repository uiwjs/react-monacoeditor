(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[210],{629:function(e,a){!function(e){var a=e.languages.javascript,n=/{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}/.source,t="(@(?:param|arg|argument|property)\\s+(?:"+n+"\\s+)?)";e.languages.jsdoc=e.languages.extend("javadoclike",{parameter:{pattern:RegExp(t+/[$\w\xA0-\uFFFF.]+(?=\s|$)/.source),lookbehind:!0,inside:{punctuation:/\./}}}),e.languages.insertBefore("jsdoc","keyword",{"optional-parameter":{pattern:RegExp(t+/\[[$\w\xA0-\uFFFF.]+(?:=[^[\]]+)?\](?=\s|$)/.source),lookbehind:!0,inside:{parameter:{pattern:/(^\[)[$\w\xA0-\uFFFF\.]+/,lookbehind:!0,inside:{punctuation:/\./}},code:{pattern:/(=)[\s\S]*(?=\]$)/,lookbehind:!0,inside:a,alias:"language-javascript"},punctuation:/[=[\]]/}},"class-name":[{pattern:RegExp(/(@(?:augments|extends|class|interface|memberof!?|template|this|typedef)\s+(?:<TYPE>\s+)?)[A-Z]\w*(?:\.[A-Z]\w*)*/.source.replace(/<TYPE>/g,(function(){return n}))),lookbehind:!0,inside:{punctuation:/\./}},{pattern:RegExp("(@[a-z]+\\s+)"+n),lookbehind:!0,inside:{string:a.string,number:a.number,boolean:a.boolean,keyword:e.languages.typescript.keyword,operator:/=>|\.\.\.|[&|?:*]/,punctuation:/[.,;=<>{}()[\]]/}}],example:{pattern:/(@example\s+)[^@]+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,lookbehind:!0,inside:{code:{pattern:/^(\s*(?:\*\s*)?).+$/m,lookbehind:!0,inside:a,alias:"language-javascript"}}}}),e.languages.javadoclike.addSupport("javascript",e.languages.jsdoc)}(Prism)}}]);
//# sourceMappingURL=210.daa7a48d.chunk.js.map