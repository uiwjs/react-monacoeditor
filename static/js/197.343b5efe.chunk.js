(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[197],{616:function(a,e){!function(a){var e=a.languages.javadoclike={parameter:{pattern:/(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,lookbehind:!0},keyword:{pattern:/(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,lookbehind:!0},punctuation:/[{}]/};Object.defineProperty(e,"addSupport",{value:function(e,n){"string"==typeof e&&(e=[e]),e.forEach((function(e){!function(e,n){var t="doc-comment",o=a.languages[e];if(o){var i=o[t];if(!i){i=(o=a.languages.insertBefore(e,"comment",{"doc-comment":{pattern:/(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,lookbehind:!0,alias:"comment"}}))[t]}if(i instanceof RegExp&&(i=o[t]={pattern:i}),Array.isArray(i))for(var r=0,s=i.length;r<s;r++)i[r]instanceof RegExp&&(i[r]={pattern:i[r]}),n(i[r]);else n(i)}}(e,(function(a){a.inside||(a.inside={}),a.inside.rest=n}))}))}}),e.addSupport(["java","javascript","php"],e)}(Prism)}}]);
//# sourceMappingURL=197.343b5efe.chunk.js.map