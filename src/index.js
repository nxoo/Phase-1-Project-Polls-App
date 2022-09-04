let main = document.querySelector('#main')
let newPollBtn = document.querySelector('#newPoll')

function clearMainDiv() {
    while (main.firstChild) {
        main.removeChild(main.lastChild);
    }
}

function loadingMessage(x) {
    let p = document.createElement('p')
    p.classList.add('mb-3')
    p.textContent = `Fetching ${x} ...`
    main.appendChild(p)
    setTimeout(() => {
        p.textContent = `Latest ${x}`
    }, 2000);
}

function goBackHome() {
    let p = document.createElement('p')
    p.classList.add('mb-4')
    let a = document.createElement('a')
    a.classList.add('text-decoration-none')
    a.textContent = '← Back to home'
    a.href = '#'
    a.onclick = () => homePage()
    p.appendChild(a)
    return p
}

function questionInput() {
    let choiceInput = document.createElement('input')
    choiceInput.classList.add('form-control')
    choiceInput.type = 'text'
    choiceInput.placeholder = "Question"
    return choiceInput
}

function choiceInput(x) {
    let choiceInput = document.createElement('input')
    choiceInput.classList.add('form-control', 'mt-2')
    choiceInput.type = 'text'
    choiceInput.id = `Choice ${x}`
    choiceInput.placeholder = `Choice ${x}`
    return choiceInput
}

function pollFormSubmit() {
    let choiceInput = document.createElement('input')
    choiceInput.classList.add('form-control', 'btn', 'btn-success', 'mt-2')
    choiceInput.type = 'submit'
    choiceInput.id = 'submit'
    return choiceInput
}

function pollForm() {
    let homeBtn = goBackHome()
    let question = questionInput()
    let choice1 = choiceInput(1)
    let choice2 = choiceInput(2)
    let submit = pollFormSubmit()
    let form = document.createElement('form' )
    form.classList.add('col-sm-7')
    form.appendChild(homeBtn)
    form.appendChild(question)
    form.appendChild(choice1).
    form.appendChild(choice2)
    form.appendChild(submit)
    main.appendChild(form)
}

newPollBtn.onclick = () => {
    clearMainDiv()
    pollForm()
}

const displayChoices = data => {
    let poll = document.querySelector('li')
    alert(data)
}

const homePage = async () => {
    clearMainDiv()
    loadingMessage('Polls')
    const pollsDiv = document.createElement('div')
    let ul = document.createElement('ol')
    const polls = await fetchData()
    for (let x = 0; x < polls.length; x++) {
        let li = document.createElement('li')
        li.classList.add('poll', 'mb-2')
        let a = document.createElement('a')
        a.classList.add('text-decoration-none')
        a.textContent = polls[x]['poll']
        a.href = '#'
        a.id = `${x}`
        a.onclick = () => displayChoices(x)
        ul.appendChild(li).appendChild(a)
    }
    main.appendChild(pollsDiv).appendChild(ul)
    return await polls
}

const fetchData = async () => {
    let url = 'http://localhost:3000/polls'
    let url2 = 'https://my-json-server.typicode.com/nxoo/Phase-1-Project-Polls-App/polls'

    const res = await fetch(url2)
    return res.json()
}

window.addEventListener('DOMContentLoaded', (event) => {
    homePage().then(r => console.log(r))
    console.log('DOM fully loaded and parsed');
});

