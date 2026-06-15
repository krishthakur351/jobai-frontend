import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ChatBot() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askAI = async () => {

    try {

      setLoading(true);

      const email =
        localStorage.getItem("email");

      const response = await axios.post(
        "https://jobai-backend-swrv.onrender.com/api/ai/chat",
        {
          email: email,
          question: question
        }
      );

      setAnswer(response.data);

    } catch (error) {

      console.log(error);

      setAnswer(
        "AI Failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div>

      <Navbar />

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to right, #141e30, #243b55)"
        }}
      >

        <div
          className="card border-0 shadow-lg p-5"
          style={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "30px",
            background: "#334155"
          }}
        >

          <div className="text-center mb-5">

            <h1
              className="fw-bold text-white"
              style={{
                fontSize: "4rem"
              }}
            >
              AI Career Assistant 🤖
            </h1>

            <p
              className="text-light"
              style={{
                fontSize: "1.3rem"
              }}
            >
              Ask anything about career, coding, jobs or resume
            </p>

          </div>

          <textarea
            className="form-control p-4 mb-4"
            rows="6"
            placeholder="Ask AI anything..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            style={{
              borderRadius: "20px",
              fontSize: "1.3rem"
            }}
          />

          <button
            className="btn btn-success btn-lg"
            onClick={askAI}
            disabled={loading}
            style={{
              borderRadius: "15px"
            }}
          >
            {
              loading
                ? "Thinking..."
                : "Ask AI 🚀"
            }
          </button>

          {
            answer && (

              <div
                className="mt-5 p-4 text-white"
                style={{
                  background: "#1e293b",
                  borderRadius: "20px"
                }}
              >

                <h2 className="fw-bold mb-4">
                  AI Response:
                </h2>

                <p
                  style={{
                    whiteSpace: "pre-line",
                    lineHeight: "2",
                    fontSize: "1.1rem"
                  }}
                >
                  {answer}
                </p>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default ChatBot;