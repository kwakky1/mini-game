const loadItems = () => {
    return fetch('data/data.json')
        .then(response=> response.json())
        .then(json => json.items);
}

const displayItems = (items) => {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

const createHTMLString = (item) => {
    return `<li class="item">
            <img class="item_thumbnail" src="${item.img}" alt="${item.type}">
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>`;
}

const onButtonClick = (e, items) => {
    const dataSet = e.target.dataset;
    const key = dataSet.key;
    const value = dataSet.value;

    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered)
}

const setEventListeners = (items) => {
    const logo = document.querySelector('.logo__wrapper');
    const buttons = document.querySelector('.button__wrapper');

    logo.addEventListener('click', ()=> displayItems(items))
    buttons.addEventListener('click', e => onButtonClick(e, items))
}

loadItems()
    .then(items => {
        console.log(items)
        displayItems(items);
        setEventListeners(items)
    })
    .catch(console.log)