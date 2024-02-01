import OptionToken from "./OptionToken";

function QaOptions({ question }) {
  const options = [
    {
      title: "people Attempted the question",
      count: question?.correctCount + question?.incorrectCount || 0,
    },
    {
      title: "people Answered Correctly",
      count: question?.correctCount || 0,
    },
    {
      title: "people Answered Incorrectly",
      count: question?.incorrectCount || 0,
    },
  ];
  return (
    <>
      {options.map((option, index) => (
        <OptionToken option={option} key={index} type="qa" />
      ))}
    </>
  );
}

export default QaOptions;
