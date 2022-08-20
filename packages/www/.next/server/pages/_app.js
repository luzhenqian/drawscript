"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _monaco_editor_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(587);
/* harmony import */ var _monaco_editor_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_monaco_editor_react__WEBPACK_IMPORTED_MODULE_1__);



function registerDrawScript() {
    loader.init().then((monaco)=>{
        const langName = "drawscript";
        // Register a new language
        monaco.languages.register({
            id: langName
        });
        // Register a tokens provider for the language
        monaco.languages.setMonarchTokensProvider(langName, {
            tokenizer: {
                root: [
                    // [/\<.*\>/, "custom-error"],
                    // [/\r\(.*\)/, "custom-notice"],
                    // [/\[info.*/, "custom-info"],
                    // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
                    [
                        /\[error.*/,
                        "custom-error"
                    ],
                    [
                        /\[notice.*/,
                        "custom-notice"
                    ],
                    [
                        /\[info.*/,
                        "custom-info"
                    ],
                    [
                        /\[[a-zA-Z 0-9:]+\]/,
                        "custom-date"
                    ], 
                ]
            }
        });
        // Define a new theme that contains only rules that match this language
        monaco.editor.defineTheme("myCoolTheme", {
            base: "vs-dark",
            inherit: false,
            rules: [
                {
                    token: "custom-info",
                    foreground: "808080"
                },
                {
                    token: "custom-error",
                    foreground: "ff0000",
                    fontStyle: "bold"
                },
                {
                    token: "custom-notice",
                    foreground: "FFA500"
                },
                {
                    token: "custom-date",
                    foreground: "008800"
                }, 
            ]
        });
        // Register a completion item provider for the new language
        monaco.languages.registerCompletionItemProvider(langName, {
            provideCompletionItems: ()=>{
                var suggestions = [
                    {
                        label: "simpleText",
                        kind: monaco.languages.CompletionItemKind.Text,
                        insertText: "simpleText"
                    },
                    {
                        label: "testing",
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: "testing(${1:condition})",
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                    },
                    {
                        label: "ifelse",
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            "if (${1:condition}) {",
                            "	$0",
                            "} else {",
                            "	",
                            "}", 
                        ].join("\n"),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: "If-Else Statement"
                    }, 
                ];
                return {
                    suggestions
                };
            }
        });
    });
}
function MyApp({ Component , pageProps  }) {
    if (false) {}
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
        ...pageProps
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);


/***/ }),

/***/ 587:
/***/ ((module) => {

module.exports = require("@monaco-editor/react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(336));
module.exports = __webpack_exports__;

})();