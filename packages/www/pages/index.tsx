import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { tokenize, generator } from "@ds/core";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

declare global {
  interface Window {
    MonacoEnvironment: any;
  }
}

const Home: NextPage = () => {
  useEffect(() => {
    // @ts-ignore
    import("@ds/dom");
    const canvasContainerEl = canvasContainerRef.current;
    if (canvasContainerEl) {
      const rects = canvasContainerEl.getClientRects();

      if (rects.length > 0) {
        const { height, width } = rects[0];
        setH(height);
        setW(width);
      }
    }
  }, []);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [tokens, setTokens] = useState({});
  const [code, setCode] = useState("");
  const editorRef = useRef<any>(null);
  const defaultCode = `<r(100 100, 100 150, 150 150, 150 100) c(blue)>`;
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }
  return (
    <div>
      <Head>
        <title>DrawScript Playground</title>
        <meta name="description" content="DrawScript Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ display: "flex", height: "60vh", position: "relative" }}>
        <div style={{ width: "50%", height: "100%" }}>
          <Editor
            height="100%"
            // FIXME:
            // theme="myCoolTheme"
            theme="vs-dark"
            defaultLanguage="drawscript"
            defaultValue={defaultCode}
            onMount={handleEditorDidMount}
          />
        </div>

        <button
          className="button"
          style={{
            zIndex: 2,
          }}
          onClick={() => {
            let canvas: HTMLCanvasElement | null = document.getElementById(
              "canvas"
            ) as HTMLCanvasElement;
            if (!canvas) {
              return;
            }

            const ctx = canvas.getContext("2d");
            if (!ctx) {
              return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const value = editorRef.current?.getValue();
            const tokens = tokenize(value);
            const code = generator(tokens);
            setTokens(tokens);
            setCode(code);
            eval(code);
          }}
        >
          Run
        </button>

        <div
          className="gradient-border"
          style={{
            width: "calc(50% - 12px)",
            height: "calc(100% - 12px)",
            margin: "6px",
            display: "flex",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={canvasContainerRef}
        >
          <canvas id="canvas" width={w - 2} height={h - 2} />
        </div>
      </div>

      <div
        style={{
          height: "40vh",
          color: "#93a3bc",
          background: "#18222d",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: "50%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              height: "2rem",
              lineHeight: "2rem",
              paddingLeft: "1rem",
            }}
          >
            Tokens
          </div>
          <SimpleBar
            style={{
              marginTop: "2rem",
              height: "calc(100% - 2rem)",
              overflowY: "auto",
            }}
          >
            <ReactJson src={tokens} theme="harmonic" />
          </SimpleBar>
        </div>

        <div
          style={{
            display: "inline-block",
            maxHeight: "100%",
            minHeight: "100%",
            height: "100%",
            overflowY: "auto",
            width: "50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              height: "2rem",
              lineHeight: "2rem",
              paddingLeft: "1rem",
            }}
          >
            Code
          </div>

          <div
            style={{
              marginTop: "2rem",
              height: "calc(100% - 2rem)",
              overflowY: "auto",
            }}
          >
            <Editor value={code} theme="vs-dark" language="javascript" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
