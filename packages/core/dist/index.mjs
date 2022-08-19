// generator.ts
function generator(tokens) {
  let i = 0;
  let out = "";
  let addCode = (code) => out += `${code}
`;
  while (i < tokens.length) {
    const token = () => tokens[i];
    switch (token().type) {
      case "START":
        addCode("__ds__.start()");
        break;
      case "END":
        addCode("__ds__.end()");
        break;
      case "NAME":
        if (token().value === "r") {
          expect(tokens[++i].type, "PARAMETERS_START");
          const params = [];
          let param = [];
          while (token().type !== "PARAMETERS_END") {
            if (token().type === "NUMBER") {
              param.push(Number(token().value));
            }
            if (tokens[i + 1].type === "PARAMETERS_SEPARATOR" || tokens[i + 1].type === "PARAMETERS_END") {
              params.push(param);
              param = [];
            }
            i++;
          }
          addCode(`__ds__.rect(...${JSON.stringify(params)});`);
        } else if (token().value === "c") {
          expect(tokens[++i].type, "PARAMETERS_START");
          const params = [];
          while (token().type !== "PARAMETERS_END") {
            if (token().type === "NAME" || token().type === "NUMBER") {
              params.push(token().value);
            }
            i++;
          }
          addCode(`__ds__.color("${params.join("")}");`);
        } else {
          throw new Error(`Unknown name: ${token().value}`);
        }
        break;
    }
    i++;
  }
  return out;
}
function expect(t1, t2) {
  if (t1 !== t2) {
    throw new Error(`Expected ${t2}, got ${t1}`);
  }
}

// tokenize.ts
function tokenize(code) {
  const tokens = [];
  let i = 0;
  const addToken = (type, value) => tokens.push({ type, value });
  while (i < code.length) {
    const char = code[i];
    switch (char) {
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
        const isDigit = /\d|\./.test(char);
        const isLetter = /([a-z])|#/i.test(char);
        if (isDigit) {
          let number = "";
          while (i < code.length && /\d|\./.test(code[i])) {
            number += code[i];
            i++;
          }
          addToken("NUMBER", number);
        } else if (isLetter) {
          let name = "";
          while (i < code.length && /[a-z]|#/i.test(code[i])) {
            name += code[i];
            i++;
          }
          addToken("NAME", name);
        } else {
          throw new Error(`Unknown character: ${char}`);
        }
        break;
    }
  }
  return tokens;
}

// index.ts
function compile(code) {
  const tokens = tokenize(code);
  const output = generator(tokens);
  return output;
}
export {
  compile,
  generator,
  tokenize
};
//# sourceMappingURL=index.mjs.map