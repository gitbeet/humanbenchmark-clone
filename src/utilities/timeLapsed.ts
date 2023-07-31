export function calculateTimeElapsed(dateString: string) {
  const startDate = new Date(dateString); // Convert the date string to a Date object
  const endDate = new Date(); // Current date

  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Calculate the time components
  const seconds = Math.floor(timeDifference / 1000) % 60;
  const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 30; // Assuming a month has 30 days
  const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)) % 12;
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

  return years < 1 && months < 1 && days < 1 && hours < 1 && minutes < 1
    ? `${seconds} second${seconds > 1 ? "s" : ""} ago`
    : years < 1 && months < 1 && days < 1 && hours < 1
    ? `${minutes}  minute${minutes > 1 ? "s" : ""} ago`
    : years < 1 && months < 1 && days < 1
    ? `${hours}  hour${hours > 1 ? "s" : ""} ago`
    : years < 1 && months < 1
    ? `${days}  day${days > 1 ? "s" : ""} ago`
    : years < 1
    ? `${months}  month${months > 1 ? "s" : ""} ago`
    : `${years}  year${years > 1 ? "s" : ""} ago`;

  // Return the time elapsed as an object
  //   return {
  //     years,
  //     months,
  //     days,
  //     hours,
  //     minutes,
  //     seconds,
  //   };
}
