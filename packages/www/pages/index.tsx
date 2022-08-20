import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
// @ts-ignore
import { compile } from "@ds/core";

declare global {
  interface Window {
    MonacoEnvironment: any;
  }
}

const Home: NextPage = () => {
  useEffect(() => {
    // @ts-ignore
    import("@ds/dom");
  }, []);

  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    console.log(monaco);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>DrawScript Playground</title>
        <meta name="description" content="DrawScript Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: "flex", height: "100vh", position: "relative" }}>
        <div style={{ width: "50%", height: "100%" }}>
          <Editor
            height="100%"
            // FIXME:
            // theme="myCoolTheme"
            theme="vs-dark"
            defaultLanguage="drawscript"
            defaultValue="<r(0 0, 0 40, 40 40, 40 0) c(blue)>"
            onMount={handleEditorDidMount}
          />
        </div>

        <button
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#454856",
            color: "white",
            borderRadius: "50%",
            fontSize: "1rem",
            textAlign: "center",
            lineHeight: "50px",
            cursor: "pointer",
            height: "50px",
            width: "50px",
            border: "none",
          }}
          onClick={() => {
            let canvas: HTMLElement | null = document.getElementById("canvas");
            if (!canvas) {
              return;
            }

            const ctx = (canvas as HTMLCanvasElement).getContext("2d");
            if (!ctx) {
              return;
            }
            ctx.clearRect(
              0,
              0,
              (canvas as HTMLCanvasElement).width,
              (canvas as HTMLCanvasElement).height
            );
            const value = editorRef.current?.getValue();
            const code = compile(value);

            eval(code);
          }}
        >
          Run
        </button>

        <div style={{ width: "50%" }}>
          <canvas id="canvas" />
        </div>
      </main>
    </div>
  );
};

export default Home;
