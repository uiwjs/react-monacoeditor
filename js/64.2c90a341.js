(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{"./node_modules/code-example/lib/dtd.js":function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default='<?xml version="1.0" encoding="UTF-8"?>\n\n<!ATTLIST title\n  xmlns CDATA #FIXED  "http://docbook.org/ns/docbook"\n  role  CDATA #IMPLIED\n  %db.common.attributes;\n  %db.common.linking.attributes;\n>\n\n\x3c!--\n  Try: http://docbook.org/xml/5.0/dtd/docbook.dtd\n--\x3e\n\n<!DOCTYPE xsl:stylesheet\n  [\n    <!ENTITY nbsp   "&#160;">\n    <!ENTITY copy   "&#169;">\n    <!ENTITY reg    "&#174;">\n    <!ENTITY trade  "&#8482;">\n    <!ENTITY mdash  "&#8212;">\n    <!ENTITY ldquo  "&#8220;">\n    <!ENTITY rdquo  "&#8221;">\n    <!ENTITY pound  "&#163;">\n    <!ENTITY yen    "&#165;">\n    <!ENTITY euro   "&#8364;">\n    <!ENTITY mathml "http://www.w3.org/1998/Math/MathML">\n  ]\n>\n\n<!ELEMENT title (#PCDATA|inlinemediaobject|remark|superscript|subscript|xref|link|olink|anchor|biblioref|alt|annotation|indexterm|abbrev|acronym|date|emphasis|footnote|footnoteref|foreignphrase|phrase|quote|wordasword|firstterm|glossterm|coref|trademark|productnumber|productname|database|application|hardware|citation|citerefentry|citetitle|citebiblioid|author|person|personname|org|orgname|editor|jobtitle|replaceable|package|parameter|termdef|nonterminal|systemitem|option|optional|property|inlineequation|tag|markup|token|symbol|literal|code|constant|email|uri|guiicon|guibutton|guimenuitem|guimenu|guisubmenu|guilabel|menuchoice|mousebutton|keycombo|keycap|keycode|keysym|shortcut|accel|prompt|envar|filename|command|computeroutput|userinput|function|varname|returnvalue|type|classname|exceptionname|interfacename|methodname|modifier|initializer|ooclass|ooexception|oointerface|errorcode|errortext|errorname|errortype)*>\n\n<!ENTITY % db.common.attributes "\n  xml:id  ID #IMPLIED\n  version CDATA #IMPLIED\n  xml:lang CDATA #IMPLIED\n  xml:base CDATA #IMPLIED\n  remap CDATA #IMPLIED\n  xreflabel CDATA #IMPLIED\n  revisionflag (changed|added|deleted|off) #IMPLIED\n  dir (ltr|rtl|lro|rlo) #IMPLIED\n  arch CDATA #IMPLIED\n  audience CDATA #IMPLIED\n  condition CDATA #IMPLIED\n  conformance CDATA #IMPLIED\n  os CDATA #IMPLIED\n  revision CDATA #IMPLIED\n  security CDATA #IMPLIED\n  userlevel CDATA #IMPLIED\n  vendor CDATA #IMPLIED\n  wordsize CDATA #IMPLIED\n  annotations CDATA #IMPLIED\n">\n'}}]);