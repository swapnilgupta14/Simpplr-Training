const updateClock = () => {
  const now = new Date();
  //   console.log(now);

  const timeElement = document.getElementById("time");
  const ampmElement = document.getElementById("ampm");
  const dateElement = document.getElementById("date");
  const dayElement = document.getElementById("day");
  const timezoneElement = document.getElementById("timezone");
  //   console.log(timeElement);
  //   console.log(ampmElement);
  //   console.log(dateElement);

  let hours = now.getHours();
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  timeElement.textContent = `${String(hours).padStart(2, "0")}:${min}:${sec}`;
  ampmElement.textContent = ampm;

  const options = { year: "numeric", month: "long", day: "numeric" };
  dateElement.textContent = now.toLocaleDateString("en-US", options);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dayElement.textContent = days[now.getDay()];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   console.log(timezone);
  timezoneElement.textContent = `Time zone: ${timezone}`;
};

setInterval(updateClock, 1000);
updateClock();
