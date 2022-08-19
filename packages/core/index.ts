import { generator } from "./generator";
import { tokenize } from "./tokenize";

export { tokenize } from "./tokenize";
export { generator } from "./generator";

export function compile(code: string) {
  const tokens = tokenize(code);
  const output = generator(tokens);
  return output;
}
