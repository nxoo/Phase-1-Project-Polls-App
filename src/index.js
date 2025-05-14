(function() {
  // html
  document.documentElement.innerHTML = '';
  const html = document.createElement('html');
  html.lang = 'en';
  document.head.appendChild(html);

  // head
  const head = document.createElement('head');
  document.documentElement.insertBefore(head, document.body);

  // Meta tags
  // Charset
  const charsetMeta = document.createElement('meta');
  charsetMeta.setAttribute('charset', 'UTF-8');
  document.head.appendChild(charsetMeta);

  // Viewport
  const viewportMeta = document.createElement('meta');
  viewportMeta.name = 'viewport';
  viewportMeta.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(viewportMeta);

  // Description
  const descriptionMeta = document.createElement('meta');
  descriptionMeta.name = 'Polls';
  descriptionMeta.content = 'Generate al HTML using JS.';
  document.head.appendChild(descriptionMeta);

  // title
  document.title = 'POLLS APP';

  // CSS
  const bootstrapCSS = document.createElement('link');
  bootstrapCSS.setAttribute('rel', 'stylesheet');
  bootstrapCSS.setAttribute('href', './styles/styles.css');
  head.appendChild(bootstrapCSS);

  // Javascript
  const bootstrapJS = document.createElement('script');
  bootstrapJS.setAttribute('src',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js');
  head.appendChild(bootstrapJS);

  // navbar
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.classList.add('text-center', 'fs-4', 'py-3', 'mb-3', 'border-bottom');

  const home = document.createElement('a');
  home.textContent = 'Home';
  home.id = 'home';
  home.classList.add('text-decoration-none', 'mx-3', 'fw-bold',
      'text-secondary');
  home.href = '#';
  nav.appendChild(home);

  const separator = document.createElement('span');
  separator.textContent = '|';
  separator.classList.add('text-secondary');
  nav.appendChild(separator);

  const newPoll = document.createElement('a');
  newPoll.textContent = 'Add Poll';
  newPoll.id = 'newPoll';
  newPoll.classList.add('text-decoration-none', 'mx-3', 'fw-bold',
      'text-secondary');
  newPoll.href = '#';
  nav.appendChild(newPoll);

  // body
  const body = document.querySelector('body');
  body.appendChild(nav);

  // main
  const main = document.createElement('div');
  main.id = 'main';
  main.classList.add('container', 'col-sm-6', 'fs-5');
  body.appendChild(main);

})();

// select this after calling Navbar function so that you can access `home` & `newPollBtn` variables
let main = document.querySelector('#main');
let home = document.querySelector('#home');
let newPollBtn = document.querySelector('#newPoll');
let pollsLength;
let typicodeUrl = 'https://my-json-server.typicode.com/nxoo/Phase-1-Project-Polls-App/polls/';
let host = window.location.hostname;

const fetchData = async (url) => {
  if (host.includes('github.io')) {
    url = 'https://my-json-server.typicode.com/nxoo/Phase-1-Project-Polls-App/polls';
  }
  const res = await fetch(url);
  return await res.json();
};

// clear div#main components
function clearMainDiv() {
  while (main.firstChild) {
    main.removeChild(main.lastChild);
  }
}

// message to display when fetching data
function loadingMessage(x) {
  let p = document.createElement('p');
  p.classList.add('mb-3', 'fs-6');
  p.textContent = `Fetching ${x} ...`;
  main.appendChild(p);
  setTimeout(() => {
    p.textContent = `Updated ${x}`;
  }, 500);
}

// ignore === true : will ignore whether on localhost or Github pages and display alert either way
function LivePageWarning(content, ignore = false) {
  let host = window.location.hostname;
  if (ignore) {
    let div = document.createElement('div');
    div.role = 'alert';
    div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade',
        'show', 'fs-6');
    div.textContent = content;
    main.prepend(div);
  } else if (host.includes('github.io')) {
    let div = document.createElement('div');
    div.role = 'alert';
    div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade',
        'show', 'fs-6');
    div.textContent = content;
    main.prepend(div);
  }
}

// returns an unordered list of polls
async function pollsList() {
  const polls = await fetchData('http://localhost:3000/polls');
  pollsLength = polls.length;
  const pollsDiv = document.createElement('div');
  if (pollsLength > 0) {
    for (let x = 1; x < polls.length + 1; x++) {
      let a = document.createElement('a');
      a.classList.add('poll', 'mb-1', 'fs-2', 'text-decoration-none', 'p-1',
          'text-secondary', 'fw-bold', 'd-block');
      a.textContent = polls[x - 1]['poll'];
      a.href = '#';
      a.id = `${x}`;
      a.onclick = () => pollVotePage(x);
      pollsDiv.appendChild(a);
    }
    clearMainDiv();
    main.appendChild(pollsDiv);
  } else {
    clearMainDiv();
    main.appendChild(pollsDiv).textContent = 'No Polls';
  }
  return polls;
}

// vote page components

async function pollChoices(choices) {
  let div = document.createElement('div');
  for (let x = 0; x < choices.length; x++) {
    let form = document.createElement('div');
    form.classList.add('form-check');
    let choice = document.createElement('input');
    choice.type = 'radio';
    choice.required = true;
    choice.id = `${choices[x]['id']}`;
    choice.name = 'choice';
    choice.classList.add('form-check-input');
    let label = document.createElement('label');
    label.htmlFor = `${choices[x]['id']}`;
    label.textContent = choices[x]['choice'];
    label.classList.add('form-check-label');
    form.appendChild(choice);
    form.appendChild(label);
    div.appendChild(form);
  }
  return div;
}

async function pollVotePage(x) {
  clearMainDiv();
  LivePageWarning(
      'POST requests won\'t work on live page since https://my-json-server.typicode.com ' +
      'does not persist data. Setup project locally and install json-server for POST requests to work');
  loadingMessage('');
  const poll = await fetchData(`http://localhost:3000/polls/${x}`);
  let form = document.createElement('form');
  let p = document.createElement('p');
  let choices = await pollChoices(poll['choices']);
  let submit = document.createElement('input');
  let resultsTag = document.createElement('p');
  let resultsBtn = document.createElement('a');
  form.method = 'post';
  form.action = '';
  form.name = 'vote';
  submit.type = 'submit';
  submit.value = 'Vote';
  submit.classList.add('btn', 'btn-success', 'my-4');
  p.classList.add('fs-4');
  p.textContent = poll['poll'];
  resultsBtn.textContent = 'Results';
  resultsBtn.href = '#';
  resultsBtn.classList.add('text-decoration-none');
  resultsBtn.onclick = () => pollResults(poll.id);

  submit.onclick = (e) => {
    e.preventDefault();
    if (document.querySelector('input[name="choice"]:checked') == null) {
      // window.alert("You need to choose an option!");
      LivePageWarning('You need to choose an option!', true);
    } else {
      let radio = Array.from(document.getElementsByName('choice')).
          find(r => r.checked).id;
      // patching the whole poll, by taking the original poll data but adding 1 to votes where
      // variable radio(id of selected choice) matches poll choice id
      let jsonData = {id: poll.id, poll: poll.poll, choices: [], comments: []};
      for (let x = 0; x < poll.choices.length; x++) {
        let choice = poll.choices[x];
        if (parseInt(radio) === choice.id) {
          jsonData.choices.push(
              {id: choice.id, choice: choice.choice, votes: choice.votes + 1});
        } else {
          jsonData.choices.push(
              {id: choice.id, choice: choice.choice, votes: choice.votes});
        }
      }
      console.log(jsonData);
      let url  = host.includes('github.io') ? typicodeUrl + poll.id : `http://localhost:3000/polls/${poll.id}`
      fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData),
      }).
          then(res => res.json()).
          then(data => pollResults(data.id)).
          catch(error => console.log(`Error ${error}`));
    }
  };
  form.appendChild(p);
  form.appendChild(choices);
  form.appendChild(submit);
  form.appendChild(resultsTag).appendChild(resultsBtn);
  main.appendChild(form);
}

// vote results
async function pollResults(x) {
  clearMainDiv();
  loadingMessage('');
  const res = await fetch(`http://localhost:3000/polls/${x}`);
  let poll = await res.json();
  let div = document.createElement('div');
  let p = document.createElement('p');
  p.classList.add('fs-4');
  let ul = document.createElement('ul');
  let backBtn = document.createElement('a');
  backBtn.textContent = 'Vote';
  backBtn.classList.add('text-decoration-none');
  backBtn.href = '#';
  backBtn.onclick = () => pollVotePage(poll.id);
  p.textContent = poll['poll'];
  div.appendChild(p);
  for (let x = 0; x < poll['choices'].length; x++) {
    let choice = document.createElement('li');
    let votes = poll['choices'][x]['votes'];
    choice.textContent = `${poll['choices'][x]['choice']} - ${votes}`;
    ul.appendChild(choice);
  }
  div.appendChild(ul);
  div.appendChild(backBtn);
  main.appendChild(div);
}

// vote form components
function questionInput() {
  let choiceInput = document.createElement('input');
  choiceInput.id = 'question';
  choiceInput.type = 'text';
  choiceInput.name = 'question';
  choiceInput.classList.add('form-control', 'mb-2');
  choiceInput.placeholder = 'Question';
  choiceInput.required = true;
  return choiceInput;
}

function choiceInput(counter) {
  let input = document.createElement('input');
  input.id = 'choice' + counter;
  input.type = 'text';
  input.name = 'choice' + counter;
  input.classList.add('form-control', 'my-2');
  input.placeholder = `Choice  ${counter}`;
  input.required = true;
  return input;
}

function pollFormSubmit() {
  let choiceInput = document.createElement('input');
  choiceInput.classList.add('form-control', 'btn', 'btn-success', 'my-1');
  choiceInput.type = 'submit';
  choiceInput.id = 'submit';
  return choiceInput;
}

function pollForm(name) {
  LivePageWarning(
      'POST requests won\'t work on live page since https://my-json-server.typicode.com does' +
      ' not persist data. Setup project locally and install json-server for POST requests to work"');

  let form = document.createElement('form');
  let p = document.createElement('p');
  let choices = document.createElement('div');
  let div = document.createElement('div');
  let addChoice = document.createElement('a');
  let removeChoice = document.createElement('a');
  let separator = document.createElement('span');
  let question = questionInput();
  let submit = pollFormSubmit();
  let choice1 = choiceInput(1);
  let choice2 = choiceInput(2);

  p.textContent = 'Create a new poll';
  div.classList.add('my-4');
  addChoice.id = 'addChoice';
  addChoice.href = '#';
  addChoice.textContent = 'Add';
  addChoice.classList.add('my-2', 'text-decoration-none');
  removeChoice.id = 'removeChoice';
  removeChoice.href = '#';
  removeChoice.textContent = 'Delete';
  removeChoice.classList.add('my-2', 'text-decoration-none');
  separator.textContent = ' | ';
  separator.classList.add('text-secondary');
  form.classList.add('col-sm-7', 'mt-4');
  form.method = 'post';
  form.id = 'pollForm';

  // adding choice input on button click
  let counter = 2;
  let addInput = function() {
    counter++;
    let input = choiceInput(counter);
    choices.appendChild(input);
  };

  let removeInput = function() {
    if (choices.firstChild && counter > 2) {
      counter--;
      choices.removeChild(choices.lastChild);
    }
  };

  addChoice.onclick = () => addInput();
  removeChoice.onclick = () => removeInput();
  submit.onclick = (e) => {
    e.preventDefault();
    let formData = new FormData(form);
    let formValues = [...formData.entries()];

    // check if form has an empty input
    for (let x = 0; x < formValues.length; x++) {
      if (formValues[x][1] === '') {
        //alert("Form can't be empty")
        LivePageWarning('Form can\'t be empty', true);
        return;
      }
    }
    // template of how data looks in db.jon
    let jsonData = {
      id: pollsLength + 1, poll: formValues[0][1], choices: [], comments: [],
    };
    for (let x = 1; x < formValues.length; x++) {
      // loop through choices which start at index 1 and add them to db.json[choices]
      jsonData.choices.push({id: x, choice: formValues[x][1], votes: 0});
    }
    let url  = host.includes('github.io') ? typicodeUrl : 'http://localhost:3000/polls'
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(jsonData),
    }).
        then(res => res.json()).
        then(data => pollVotePage(data.id)).
        catch(error => console.log(`Error ${error}`));
  };

  div.appendChild(addChoice);
  div.appendChild(separator);
  div.appendChild(removeChoice);

  form.appendChild(p);
  form.appendChild(question);
  form.appendChild(choice1);
  form.appendChild(choice2);
  form.appendChild(div);
  form.appendChild(choices);
  form.appendChild(submit);
  main.appendChild(form);
}

// navbar `+ Create new poll` button
newPollBtn.onclick = () => {
  clearMainDiv();
  pollForm();
};

home.onclick = () => {
  clearMainDiv();
  loadingMessage('');
  pollsList().then(res => console.log(res));
};

window.addEventListener('DOMContentLoaded', (event) => {
  clearMainDiv();
  loadingMessage('');
  pollsList().then(r => console.log(r));
});

