let main = document.querySelector('#main')
let nav = document.querySelector('#nav')

// Navbar
function Navbar() {
    nav.classList.add('text-center', 'fs-4', 'py-3', 'mb-3', 'border-bottom')
    let link1 = document.createElement('a')
    let separator = document.createElement('span')
    let link2 = document.createElement('a')
    link1.textContent = "Home"
    link1.id = "home"
    link1.classList.add('text-decoration-none', 'mx-3', 'text-secondary')
    link1.href = '#'
    link2.textContent = "create Poll"
    link2.id = 'newPoll'
    link2.classList.add('text-decoration-none', 'mx-3', 'text-secondary')
    link2.href = '#'
    separator.textContent = '|'
    separator.classList.add('text-secondary')
    nav.appendChild(link1)
    nav.appendChild(separator)
    nav.appendChild(link2)
}

Navbar()

// select this after calling Navbar function so that you can access `home` & `newPollBtn` variables
let home = document.querySelector('#home')
let newPollBtn = document.querySelector('#newPoll')

const fetchData = async () => {
    let url = 'http://localhost:3000/polls'
    let url2 = 'https://my-json-server.typicode.com/nxoo/Phase-1-Project-Polls-App/polls'
    const res = await fetch(url2)
    return res.json()
}

// homepage components
function clearMainDiv() {
    while (main.firstChild) {
        main.removeChild(main.lastChild);
    }
}

function loadingMessage(x) {
    let p = document.createElement('p')
    p.classList.add('mb-3', 'fs-6')
    p.textContent = `Fetching ${x} ...`
    main.appendChild(p)
    setTimeout(() => {
        p.textContent = `Latest ${x}`
    }, 2000);
}

async function pollsList() {
    const pollsDiv = document.createElement('div')
    let ul = document.createElement('ol')
    const polls = await fetchData()
    for (let x = 0; x < polls.length; x++) {
        let li = document.createElement('li')
        li.classList.add('poll', 'mb-2', 'fs-3')
        let a = document.createElement('a')
        a.classList.add('text-decoration-none')
        a.textContent = polls[x]['poll']
        a.href = '#'
        a.id = `${x}`
        a.onclick = () => pollVotePage(x)
        ul.appendChild(li).appendChild(a)
    }
    main.appendChild(pollsDiv).appendChild(ul)
    return polls
}

// vote page components

async function pollChoices(choices) {
    console.log(choices)
    let div = document.createElement('div')
    for (let x = 0; x < choices.length; x++) {
        let form = document.createElement('div')
        form.classList.add('form-check')
        let choice = document.createElement('input')
        choice.type = 'radio'
        choice.id = `${choices[x]['id']}`
        choice.name = 'choices'
        choice.classList.add('form-check-input')
        let label = document.createElement('label')
        label.htmlFor = `${choices[x]['id']}`
        label.textContent = choices[x]['choice']
        label.classList.add('form-check-label')
        form.appendChild(choice)
        form.appendChild(label)
        div.appendChild(form)
    }
    return div
}

async function pollVotePage(x) {
    clearMainDiv()
    loadingMessage('Poll Data')
    const data = await fetchData()
    const poll = data[x]
    console.log('po', poll)
    let div = document.createElement('div')
    let p = document.createElement('p')
    let choices = await pollChoices(poll['choices'])
    let submit = document.createElement('input')
    let resultsTag = document.createElement('p')
    let resultsBtn = document.createElement('a')
    submit.type = 'submit'
    submit.value = 'vote'
    submit.classList.add('btn', 'btn-success', 'my-4')
    p.classList.add('fs-4')
    p.textContent = poll['poll']
    resultsBtn.textContent = "Check results"
    resultsBtn.href = "#"
    resultsBtn.classList.add('text-decoration-none')
    resultsBtn.onclick = () => pollResults(poll['id'] - 1)
    div.appendChild(p)
    div.appendChild(choices)
    div.appendChild(submit)
    div.appendChild(resultsTag).appendChild(resultsBtn)
    main.appendChild(div)
}

// vote results
async function pollResults(x) {
    clearMainDiv()
    loadingMessage('Poll Data')
    const data = await fetchData()
    const poll = data[x]
    console.log(poll)
    let div = document.createElement('div')
    let p = document.createElement('p')
    p.classList.add('fs-4')
    let ul = document.createElement('ul')
    let backBtn = document.createElement('a')
    backBtn.textContent = "Vote again"
    backBtn.classList.add('text-decoration-none')
    backBtn.href = '#'
    //backBtn.onclick = () => pollVotePage(poll['id'])
    backBtn.onclick = () => pollVotePage(poll['id'] - 1)
    p.textContent = poll['poll']
    div.appendChild(p)
    for (let x = 0; x < poll['choices'].length; x++) {
        let choice = document.createElement('li')
        choice.textContent = `${poll['choices'][x]['choice']} --- ${poll['choices'][x]['votes']} votes`
        ul.appendChild(choice)
    }
    div.appendChild(ul)
    div.appendChild(backBtn)
    main.appendChild(div)
}

// vote form components
function questionInput() {
    let choiceInput = document.createElement('input')
    choiceInput.classList.add('form-control', 'mb-2')
    choiceInput.type = 'text'
    choiceInput.placeholder = "Question"
    return choiceInput
}

function pollFormSubmit() {
    let choiceInput = document.createElement('input')
    choiceInput.classList.add('form-control', 'btn', 'btn-success', 'my-2')
    choiceInput.type = 'submit'
    choiceInput.id = 'submit'
    return choiceInput
}

function pollForm() {
    let form = document.createElement('form')
    let p = document.createElement('p')
    let choices = document.createElement('div')
    let addChoice = document.createElement('a')
    let removeChoice = document.createElement('a')
    let sep = document.createElement('span')
    let question = questionInput()
    let submit = pollFormSubmit()

    p.textContent = "Create a new poll"
    addChoice.id = 'addChoice'
    addChoice.href = '#'
    addChoice.textContent = "Add Choice"
    addChoice.classList.add('my-2', 'text-decoration-none')
    removeChoice.id = 'removeChoice'
    removeChoice.href = '#'
    removeChoice.textContent = "Remove Choice"
    removeChoice.classList.add('my-2', 'text-decoration-none')
    sep.textContent = ' | '
    form.classList.add('col-sm-7', 'mt-4')

    let counter = 0;
    let addInput = function () {
        counter++;
        let input = document.createElement("input");
        input.id = 'choice' + counter;
        input.type = 'text';
        input.name = 'name';
        input.classList.add('form-control', 'mb-2')
        input.placeholder = `Choice  ${counter}`
        choices.appendChild(input);
    };

    let removeInput = function () {
        if (choices.firstChild) {
            counter--;
            choices.removeChild(choices.lastChild);
        }
    };

    addChoice.onclick = () => addInput()
    removeChoice.onclick = () => removeInput()

    form.appendChild(p)
    form.appendChild(question)
    form.appendChild(addChoice)
    form.appendChild(sep)
    form.appendChild(removeChoice)
    form.appendChild(choices)
    form.appendChild(submit)
    main.appendChild(form)
}

// navbar `+ Create new poll` button
newPollBtn.onclick = () => {
    clearMainDiv()
    pollForm()
}

home.onclick = () => {
    clearMainDiv()
    loadingMessage('Polls')
    pollsList().then(res => console.log(res))
}

window.addEventListener('DOMContentLoaded', (event) => {
    clearMainDiv()
    loadingMessage('Polls')
    pollsList().then(res => console.log(res))
});

