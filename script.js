const month = document.querySelector("#month");
const time = document.querySelector("#time");

const input = document.querySelector("#input");
const submitBtn = document.querySelector("#add-btn");
const itemsWrapper = document.querySelector(".list-ul");

let id = 0;
let list = [];

window.onload = calendar;

async function calendar() {
  await updatetime();
  await setInterval(updatetime, 1000);
}

function updatetime() {
  const date = new Date();
  time.innerHTML = clock(date);
  month.innerHTML = weekDay(date);
}

function clock(date) {
  let h = date.getHours();
  let m = date.getMinutes();
  let session = "AM";

  if (h == 0) {
    h = 12;
  }
  if (h > 12) {
    h -= 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  let time = `${h}:${m} ${session}`;

  return time;
}

function weekDay(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = date.getMonth();
  const monthDay = date.getDate();
  return `${monthNames[monthName]} ${monthDay}`;
}

keyPress()
function keyPress() {
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitBtn.click();
    }
  })
}

function createNote() {
  const date = new Date();

  itemsWrapper.innerHTML += `
    <div class="list-li" id="id-${id}">
    <div class="header">
        <p class="li-title">
            ${input.value}
        </p>
        <span class="li-published">
            published at ${clock(date)}
        </span>
    </div>
    <div class="button-ul">
      <label for="check-${id}" class="done">
        <i class="icon fa-regular fa-circle"></i>
      </label>
        <input type="checkbox" class="checkbox" id="check-${id}">
        <button class="delete" id="delete-${id}">
            <i class="fa-regular fa-trash-can"></i>
        </button>
    </div>
    </div>
  `

  id++
}

function checkedItem() {
  const checkboxes = document.querySelectorAll('.checkbox');
  const icon = document.querySelectorAll('.icon')

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        icon[index].classList.remove('fa-regular', 'fa-circle')
        icon[index].classList.add('fa-solid', 'fa-circle-check')
      } else {
        icon[index].classList.remove('fa-solid', 'fa-circle-check')
        icon[index].classList.add('fa-regular', 'fa-circle')
      }
    });
  });
}

function removeItem() {
  const div = document.querySelectorAll('.list-li')
  const removeBtns = document.querySelectorAll('.delete');

  removeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      div[index].remove()
    })
  })
}

submitBtn.addEventListener('click', () => {
  if (input.value == 0) {
    input.style.outline = '2px solid #ff6d60'
    input.style.opacity = '0.5'
    document.querySelector('input[type=text]').style.setProperty("--c", "#ff6d60");
    document.getElementsByName('note')[0].placeholder = `can't be empty`;

    setTimeout(() => {
      input.style.outline = 'none'
      input.style.opacity = '1'
      document.querySelector('input[type=text]').style.setProperty("--c", "#b7b7b7");
      document.getElementsByName('note')[0].placeholder = `note`;
    }, 2000);
  } else {
    createNote()
    checkedItem()
    removeItem()
    input.style.outline = 'none'
    input.style.opacity = '1'
    document.querySelector('input[type=text]').style.setProperty("--c", "#b7b7b7");
    document.getElementsByName('note')[0].placeholder = `note`;
  }
  input.value = ''
  input.focus()
})