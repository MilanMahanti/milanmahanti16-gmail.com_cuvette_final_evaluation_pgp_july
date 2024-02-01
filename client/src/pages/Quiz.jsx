import { useState } from "react";
import { Error, Instructions, Questions } from "../components";
import Loading from "../components/Loading";
import { useSingleQuiz } from "../queries/useSingleQuiz";

import Result from "./Result";

function Quiz() {
  const [view, setView] = useState("instructions");
  const [result, setResult] = useState(null);
  const { isLoading, error, quizData } = useSingleQuiz();

  if (isLoading)
    return (
      <div className="full-page">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="full-page">
        <Error error={error} />;
      </div>
    );
  return (
    <div className="page">
      {view === "instructions" && (
        <Instructions quizData={quizData} setView={setView} />
      )}
      {view === "questions" && (
        <Questions
          quizData={quizData}
          setView={setView}
          setResult={setResult}
        />
      )}

      {view === "result" && (
        <Result result={result} quizType={quizData?.quiz?.type} />
      )}
    </div>
  );
}

export default Quiz;
