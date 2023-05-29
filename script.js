const month = document.querySelector('#month')
const time = document.querySelector('#time')

const input = document.querySelector('#input')
const submitBtn = document.querySelector('#add-btn')
const itemsWrapper = document.querySelector('.list-ul')
// const published = document.querySelector('.li-published')

let num = 1
let listArr = []

const display = new Date()

window.onload = calendar;
function calendar() {
    time.textContent = displayClock()
    month.textContent = displayMonth()
    setTimeout(calendar, 1000)
}

function displayClock() {
    const h = display.getHours()
    const m = display.getMinutes()
    const s = display.getSeconds()
    return `${("0" + h).substr(-2)}:${("0" + m).substr(-2)}:${("0" + s).substr(-2)}`
}

function displayMonth() {
    const calendar = display.toLocaleDateString()
    return calendar
}

function createNote() {
    const div = document.createElement('div')
    div.classList.add('list-li')
    div.setAttribute('id', num++)

    const header = document.createElement('div')
    header.classList.add('header')
    div.appendChild(header)

    const title = document.createElement('p')
    title.classList.add('li-title')
    title.textContent = input.value
    header.appendChild(title)

    const published = document.createElement('span')
    published.classList.add('li-published')
    published.textContent = 'published ' + displayClock()
    header.appendChild(published)

    const buttonsDiv = document.createElement('div')
    buttonsDiv.classList.add('button-ul')
    div.appendChild(buttonsDiv)

    const checkBtn = document.createElement('button')
    checkBtn.classList.add('done')
    checkBtn.setAttribute('id', 'done')
    buttonsDiv.appendChild(checkBtn)

    const checkIcon = document.createElement('i')
    checkIcon.classList.add('fa-regular', 'fa-circle')
    checkIcon.setAttribute('id', 'check-icon')
    checkBtn.appendChild(checkIcon)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.setAttribute('id', 'delete')
    buttonsDiv.appendChild(deleteBtn)

    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-regular', 'fa-trash-can')
    deleteBtn.appendChild(deleteIcon)

    itemsWrapper.appendChild(div)

    checkBtnEvent()
}

function checkBtnEvent() {
    const div = document.querySelector('.list-li')
    const checkBtn = document.querySelector('#done')
    const checkIcon = document.querySelector('#check-icon')

    checkBtn.addEventListener('click', () => {
        checkIcon.classList.toggle('fa-circle')
        checkIcon.classList.toggle('fa-circle-check')
        checkIcon.classList.toggle('checked')
    })

}

submitBtn.addEventListener('click', () => {
    createNote()
})
