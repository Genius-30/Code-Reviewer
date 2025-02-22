import "prismjs/themes/prism-tomorrow.css";

import { useEffect, useState } from "react";

import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`function sum(){
  return 2+2
}`);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    setIsReviewing(true);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/ai/get-review`,
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.response) {
      setReview(res.data.response);
      setIsReviewing(false);
    } else {
      alert("Unknown Error!");
    }
  };

  return (
    <main className="h-screen w-full bg-zinc-900 flex flex-col md:flex-row gap-2 md:gap-4 p-6">
      <div className="left relative h-full basis-1/2 bg-zinc-950 rounded-xl overflow-hidden">
        <div className="code h-full w-full">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript)
            }
            padding={10}
            style={{
              fontSize: 18,
              fontFamily: "",
              border: "1px solid #ddd",
              borderRadius: "14px",
              height: "100%",
              width: "100%",
              color: "white",
              padding: "10px",
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          className="review-btn absolute bottom-4 right-4 bg-zinc-200 p-2 rounded-xl font-semibold cursor-pointer select-none py-2 px-8"
        >
          {isReviewing ? "Reviewing..." : "Review"}
        </button>
      </div>
      <div className="right h-full basis-1/2 bg-zinc-700 rounded-xl p-4 text-white overflow-auto">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
