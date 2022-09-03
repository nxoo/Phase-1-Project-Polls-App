let pollsDiv = document.querySelector('#polls-list')

const displayPolls = async () => {
    const polls = await fetchData()
    console.log(polls)
    let ul = document.createElement('ol')
    for (let x = 0; x < polls.length; x++) {
        let li = document.createElement('li')
        li.classList.add('pll')
        let a = document.createElement('a')
        a.textContent = polls[x]['poll']
        a.href = '#'
        a.id = `${x}`
        ul.appendChild(li).appendChild(a)
    }
    pollsDiv.appendChild(ul)
    return await polls
}

const displayChoices = data => {
    let poll = document.querySelector('li')
}

const fetchData = async () => {
    let url = 'http://localhost:3000/polls'
    let url2 = 'https://my-json-server.typicode.com/nxoo/Phase-1-Project-Polls-App/polls'

    const res = await fetch(url2)
    return res.json()
}

window.addEventListener('DOMContentLoaded', (event) => {
    displayPolls()
    console.log('DOM fully loaded and parsed');
});

