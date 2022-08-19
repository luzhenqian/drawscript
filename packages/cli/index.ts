import * as fs from "fs";
import * as path from "path";
import { generator } from "../core/generator";
import { tokenize } from "../core/tokenize";
import minimist from "minimist";

function load(path: string) {
  return fs.readFileSync(path, "utf8");
}

function compile(entryFile: string, outFile: string = "out.js") {
  const code = load(path.join(process.cwd(), entryFile));
  const tokens = tokenize(code);
  const output = generator(tokens);
  fs.writeFileSync(path.join(process.cwd(), outFile), output);
}

const argv = minimist(process.argv.slice(2));
compile(argv.i, argv.o);
