import { Token, Tokens } from "./tokenize";

function generator(tokens: Tokens) {
  let i = 0; // 跟踪代码位置
  let out = ""; // 输出代码
  let addCode = (code: string) => (out += `${code}\n`); // 添加代码
  // 和分词器套路一样
  while (i < tokens.length) {
    const token: () => Token = () => tokens[i]; // 当前词令牌
    switch (token().type) {
      case "START":
        addCode("__ds__.start()");
        break;
      case "END":
        addCode("__ds__.end()");
        break;
      case "NAME":
        /**
         * 如果是 r position 函数
         */
        if (token().value === "r") {
          expect(tokens[++i].type, "PARAMETERS_START");
          const params: number[][] = []; // 存储参数
          let param: number[] = [];
          // 拼接参数
          while (token().type !== "PARAMETERS_END") {
            if (token().type === "NUMBER") {
              param.push(Number(token().value));
            }
            if (
              tokens[i + 1].type === "PARAMETERS_SEPARATOR" ||
              tokens[i + 1].type === "PARAMETERS_END"
            ) {
              params.push(param);
              param = [];
            }
            i++;
          }
          addCode(`__ds__.rect(...${JSON.stringify(params)});`);
        } else if (token().value === "c") {
          /**
           * 如果是 c，执行 color 函数
           */
          expect(tokens[++i].type, "PARAMETERS_START");
          const params: string[] = []; // 存储参数
          // 拼接参数
          while (token().type !== "PARAMETERS_END") {
            if (token().type === "NAME" || token().type === "NUMBER") {
              params.push(token().value);
            }
            i++;
          }
          addCode(`__ds__.color("${params.join("")}");`);
        } else {
          throw new Error(`Unknown name: ${token().value}`); // 🤬 Error
        }
        break;
    }
    i++;
  }
  return out;
}

function expect(t1: string, t2: string) {
  if (t1 !== t2) {
    throw new Error(`Expected ${t2}, got ${t1}`);
  }
}

export { generator, expect };
