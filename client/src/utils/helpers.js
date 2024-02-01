import toast from "react-hot-toast";

export const formatImpressionCount = (count) => {
  if (count >= 1000) {
    const formattedCount = count / 1000;
    return formattedCount % 1 === 0
      ? `${formattedCount}k`
      : `${formattedCount.toFixed(1)}k`;
  }
  return count?.toString();
};

export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const formattedDate = formatter.format(date);

  // Extract day, month, and year
  const [day, month, year] = formattedDate.split(" ");

  // Reorder and concatenate
  const reorderedDate = `${day} ${month}, ${year}`;

  return reorderedDate;
}

export const copyLink = (link) => {
  navigator.clipboard.writeText(link).then(
    () => {
      // invoked if the data is copied
      toast.success("Link Copied successfully!", { position: "top-right" });
    },
    () => {
      toast.error("Link Copying failed try again :(", {
        position: "top-right",
      });
    }
  );
};

export const optionTypes = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "image",
    label: "Image",
  },
  {
    value: "both",
    label: "Text & Image",
  },
];
