import axios from 'axios';

const readUl = document.querySelector('#read ul');

const read = _ => {
    axios.get('http://localhost:6001/read')
        .then(res => {

            readUl.innerHTML = '';

            res.data.forEach(tree => {
                const clone = document.querySelector('template').content.cloneNode(true);
                const id = clone.querySelector('[data-id]');
                const name = clone.querySelector('[data-name]');
                const height = clone.querySelector('[data-height]');
                const type = clone.querySelector('[data-type]');
                id.innerText = tree.id + '.';
                name.innerText = tree.name;
                height.innerText = tree.height.toLocaleString('lt-LT') + ' m';
                type.innerText = tree.type;
                readUl.appendChild(clone);
            });

        });
};

const create = _ => {
    const name = document.querySelector('#create [data-name]').value;
    const height = parseFloat(document.querySelector('#create [data-height]').value);
    const type = document.querySelector('#create [data-type]').value;
 
    axios.post('http://localhost:6001/create', { name, height, type })
        .then(res => {
            console.log(res.data);
            read();
        });
};

read();

const createButton = document.querySelector('#create button');
createButton.addEventListener('click', create);

const formHeight = document.querySelector('[data-height]');
const formHeightShow = document.querySelector('[data-height-show]');
formHeight.addEventListener('input', _ => {
    formHeightShow.innerText = parseFloat(formHeight.value).toLocaleString('lt-LT');
});