// -------- hero section (date and time) --------
function displayTimeFunc() {
  let currentDate = dayjs().format("DD MMM YYYY [at] hh:mm:ss a");
  $("#currentDay").text(currentDate);
}
displayTimeFunc();
setInterval(displayTimeFunc, 1000);

const currentHour = dayjs().hour();
console.log(currentHour);

function updateColors() {
  const currentHour = dayjs().hour();

  $(".container .row").each(function (index) {
    const rowHour = index + 9; // Hour starts at 9am (index + 9)
    const $row = $(this);

    if (rowHour < currentHour) {
      $row.removeClass("present future").addClass("past");
    } else if (rowHour === currentHour) {
      $row.removeClass("past future").addClass("present");
    } else {
      $row.removeClass("past present").addClass("future");
    }
  });
}
// Initial color update
updateColors();
// Update colors every minute (or as needed)
setInterval(updateColors, 60000); // Runs every minute

// -------- Add a item to local storage --------
function addTask() {
  $(".container").on("click", "button.save", function () {
    let itemsList = JSON.parse(localStorage.getItem("savedList")) || [];
    let taskInput = $(this).prev().val();
    let hourValue = parseInt($(this).prev().prev().attr("id"));
    let newInput = { time: hourValue, item: taskInput };
    itemsList.push(newInput);
    localStorage.setItem("savedList", JSON.stringify(itemsList));
  });
}

// -------- get existing schedule and display --------
function getSchedule() {
  const itemsArray = JSON.parse(localStorage.getItem("savedList"));
  if (itemsArray) {
    const hourBlocks = $(".time");
    hourBlocks.each(function () {
      let blockHour = parseInt($(this).attr("id"));
      for (i = 0; i < itemsArray.length; i++) {
        if (blockHour === itemsArray[i].time) {
          $(this).next().text(itemsArray[i].item);
        }
      }
    });
  }
}

addTask();
getSchedule();
