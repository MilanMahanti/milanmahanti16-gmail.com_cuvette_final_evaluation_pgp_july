import OptionToken from "./OptionToken";

function PollOptions({ question }) {
  const { optionCounts } = question;
  const optionsArray = Object.entries(optionCounts).map(
    ([option, value], index) => ({
      title: `option ${index + 1}`,
      count: value,
    })
  );

  return (
    <>
      {optionsArray.map((option, index) => (
        <OptionToken option={option} key={index} />
      ))}
    </>
  );
}

export default PollOptions;
