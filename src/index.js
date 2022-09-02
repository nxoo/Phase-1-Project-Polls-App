let pollsDiv = document.querySelector('#polls-list')

const displayPolls = (data) => {
    let ul = document.createElement('ol')
    for (let x=0; x<data.length; x++) {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.textContent = data[x]['poll']
        a.href = '#'
        a.id = `${x}`
        pollsDiv.appendChild(ul).appendChild(li).appendChild(a)
        console.log(data[x]['poll'])
    }
}

const fetchData = () => {
    fetch('https://my-json-server.typicode.com/nxoo/Phase-1-Project-Polls-App/polls')
        .then(res => res.json())
        .then(data => displayPolls(data))
        .catch(err => console.log('Error', err))
}

fetchData()
