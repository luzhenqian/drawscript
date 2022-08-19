var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// index.ts
var core_exports = {};
__export(core_exports, {
    compile: function() {
        return compile;
    },
    generator: function() {
        return generator;
    },
    tokenize: function() {
        return tokenize;
    }
});
module.exports = __toCommonJS(core_exports);
// generator.ts
function generator(tokens) {
    var _loop = function() {
        var token = function() {
            return tokens[i];
        };
        switch(token().type){
            case "START":
                addCode("__ds__.start()");
                break;
            case "END":
                addCode("__ds__.end()");
                break;
            case "NAME":
                if (token().value === "r") {
                    expect(tokens[++i].type, "PARAMETERS_START");
                    var params = [];
                    var param = [];
                    while(token().type !== "PARAMETERS_END"){
                        if (token().type === "NUMBER") {
                            param.push(Number(token().value));
                        }
                        if (tokens[i + 1].type === "PARAMETERS_SEPARATOR" || tokens[i + 1].type === "PARAMETERS_END") {
                            params.push(param);
                            param = [];
                        }
                        i++;
                    }
                    addCode("__ds__.rect(...".concat(JSON.stringify(params), ");"));
                } else if (token().value === "c") {
                    expect(tokens[++i].type, "PARAMETERS_START");
                    var params1 = [];
                    while(token().type !== "PARAMETERS_END"){
                        if (token().type === "NAME" || token().type === "NUMBER") {
                            params1.push(token().value);
                        }
                        i++;
                    }
                    addCode('__ds__.color("'.concat(params1.join(""), '");'));
                } else {
                    throw new Error("Unknown name: ".concat(token().value));
                }
                break;
        }
        i++;
    };
    var i = 0;
    var out = "";
    var addCode = function(code) {
        return out += "".concat(code, "\n");
    };
    while(i < tokens.length)_loop();
    return out;
}
function expect(t1, t2) {
    if (t1 !== t2) {
        throw new Error("Expected ".concat(t2, ", got ").concat(t1));
    }
}
// tokenize.ts
function tokenize(code) {
    var tokens = [];
    var i = 0;
    var addToken = function(type, value) {
        return tokens.push({
            type: type,
            value: value
        });
    };
    while(i < code.length){
        var char = code[i];
        switch(char){
            case " ":
            case "	":
            case "\n":
            case "\r":
                i++;
                break;
            case "<":
                addToken("START", char);
                i++;
                break;
            case ">":
                addToken("END", char);
                i++;
                break;
            case "(":
                addToken("PARAMETERS_START", char);
                i++;
                break;
            case ",":
                addToken("PARAMETERS_SEPARATOR", char);
                i++;
                break;
            case ")":
                addToken("PARAMETERS_END", char);
                i++;
                break;
            default:
                var isDigit = /\d|\./.test(char);
                var isLetter = /([a-z])|#/i.test(char);
                if (isDigit) {
                    var number = "";
                    while(i < code.length && /\d|\./.test(code[i])){
                        number += code[i];
                        i++;
                    }
                    addToken("NUMBER", number);
                } else if (isLetter) {
                    var name = "";
                    while(i < code.length && /[a-z]|#/i.test(code[i])){
                        name += code[i];
                        i++;
                    }
                    addToken("NAME", name);
                } else {
                    throw new Error("Unknown character: ".concat(char));
                }
                break;
        }
    }
    return tokens;
}
// index.ts
function compile(code) {
    var tokens = tokenize(code);
    var output = generator(tokens);
    return output;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    compile: compile,
    generator: generator,
    tokenize: tokenize
});
//# sourceMappingURL=index.js.map