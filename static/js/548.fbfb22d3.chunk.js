(this["webpackJsonp@uiw/react-monacoeditor"]=this["webpackJsonp@uiw/react-monacoeditor"]||[]).push([[548],{1209:function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default="package addressbook;\n\nmessage Address {\n   required string street = 1;\n   required string postCode = 2;\n}\n\nmessage PhoneNumber {\n   required string number = 1;\n}\n\nmessage Person {\n   optional int32 id = 1;\n   required string name = 2;\n   required string surname = 3;\n   optional Address address = 4;\n   repeated PhoneNumber phoneNumbers = 5;\n   optional uint32 age = 6;\n   repeated uint32 favouriteNumbers = 7;\n   optional string license = 8;\n   enum Gender {\n      MALE = 0;\n      FEMALE = 1;\n   }\n   optional Gender gender = 9;\n   optional fixed64 lastUpdate = 10;\n   required bool deleted = 11 [default = false];\n}\n\n\n"}}]);
//# sourceMappingURL=548.fbfb22d3.chunk.js.map