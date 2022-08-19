import "../styles/globals.css";
import type { AppProps } from "next/app";
import { loader } from "@monaco-editor/react";

function registerDrawScript() {
  loader.init().then((monaco: any) => {
    const langName = "drawscript";
    // Register a new language
    monaco.languages.register({ id: langName });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider(langName, {
      tokenizer: {
        root: [
          // [/\<.*\>/, "custom-error"],
          // [/\r\(.*\)/, "custom-notice"],
          // [/\[info.*/, "custom-info"],
          // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],

          [/\[error.*/, "custom-error"],
          [/\[notice.*/, "custom-notice"],
          [/\[info.*/, "custom-info"],
          [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
        ],
      },
    });

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme("myCoolTheme", {
      base: "vs-dark",
      inherit: false,
      rules: [
        { token: "custom-info", foreground: "808080" },
        { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
        { token: "custom-notice", foreground: "FFA500" },
        { token: "custom-date", foreground: "008800" },
      ],
    });

    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider(langName, {
      provideCompletionItems: () => {
        var suggestions = [
          {
            label: "simpleText",
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: "simpleText",
          },
          {
            label: "testing",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "testing(${1:condition})",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "ifelse",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              "if (${1:condition}) {",
              "\t$0",
              "} else {",
              "\t",
              "}",
            ].join("\n"),
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "If-Else Statement",
          },
        ];
        return { suggestions };
      },
    });
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window === "object") registerDrawScript();
  return <Component {...pageProps} />;
}

export default MyApp;
