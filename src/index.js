let main = document.querySelector('main')
let addPoll = document.querySelector('#new-poll')

function clearMain() {
    while (main.firstChild) {
        main.removeChild(main.lastChild);
    }
}

function loadingMessage() {
    clearMain()
    let loadingMsg = document.createElement('p')
    loadingMsg.textContent = "Fetching data ..."
    main.appendChild(loadingMsg)
    setTimeout(() => {
        loadingMsg.textContent = "Latest Polls"
        // main.removeChild(loadingMsg)
    }, 1500);
}

addPoll.onclick = () => {
    clearMain()
    let a = document.createElement('a')
    a.textContent = '← Back to home'
    a.href = '#'
    a.onclick = () => displayPolls()
    let choiceInput = document.createElement('input')
    choiceInput.classList.add('mt-4', 'col-sm-4')
    choiceInput.classList.add('form-control')
    choiceInput.type = 'text'
    choiceInput.placeholder = "Question"
    main.appendChild(a)
    main.appendChild(choiceInput)
}

const displayChoices = data => {
    let poll = document.querySelector('li')
    alert(data)
}

const displayPolls = async () => {
    clearMain()
    loadingMessage()
    const pollsDiv = document.createElement('div')
    let ul = document.createElement('ol')
    const polls = await fetchData()
    for (let x = 0; x < polls.length; x++) {
        let li = document.createElement('li')
        li.classList.add('poll', 'mb-2')
        let a = document.createElement('a')
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
    displayPolls().then(r => console.log(r))
    console.log('DOM fully loaded and parsed');
});

