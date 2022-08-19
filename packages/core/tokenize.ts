export type Token = {
  type: string;
  value: string;
};

export type Tokens = Token[];

function tokenize(code: string) {
  const tokens: Tokens = []; // 词令牌
  let i = 0; // 跟踪代码位置

  // 向 token 中加词令牌
  const addToken = (type: string, value: string) =>
    tokens.push({ type, value });

  // 开启循环 遍历代码
  while (i < code.length) {
    const char = code[i]; // 当前字符
    switch (char) {
      // 忽略空白字符
      case " ":
      case "\t":
      case "\n":
      case "\r":
        i++;
        break;
      // 如果是 <，添加一个 START 类型的词令牌
      case "<":
        addToken("START", char);
        i++;
        break;
      // 如果是 >，添加一个 END 类型的词令牌
      case ">":
        addToken("END", char);
        i++;
        break;
      // 如果是 (，添加一个 PARAMETERS_START 类型的词令牌
      case "(":
        addToken("PARAMETERS_START", char);
        i++;
        break;
      // 如果是 ,，添加一个 PARAMETERS_SEPARATOR 类型的词令牌
      case ",":
        addToken("PARAMETERS_SEPARATOR", char);
        i++;
        break;
      // 如果是 )，添加一个 PARAMETERS_END 类型的词令牌
      case ")":
        addToken("PARAMETERS_END", char);
        i++;
        break;
      // 除了上述情况外，我们开始检查它们是关键字还是数字
      default: // 是否是数字
        // 是否是字母或者十六进制颜色
        const isDigit = /\d|\./.test(char);
        const isLetter = /([a-z])|#/i.test(char);

        // 处理数字的逻辑
        if (isDigit) {
          let number = ""; // 拼接存储数字
          while (i < code.length && /\d|\./.test(code[i])) {
            // 循环，直到不是数字或者十六进制颜色
            number += code[i];
            i++;
          }
          addToken("NUMBER", number); // 添加数字词令牌
        } else if (isLetter) {
          let name = ""; // 拼接存储关键词令牌
          while (i < code.length && /[a-z]|#/i.test(code[i])) {
            // 循环，直到不是字母
            name += code[i];
            i++;
          }
          addToken("NAME", name); // 添加关键词令牌
        } else {
          throw new Error(`Unknown character: ${char}`); // 🤬 如果不是数字或字母，抛出错误
        }
        break;
    }
  }

  // 返回词令牌
  return tokens;
}

export { tokenize };
