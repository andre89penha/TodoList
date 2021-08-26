const databaseService = DatabaseService('clientes');

document.addEventListener('keydown', function (event) {
    const input = document.getElementById('newItem');
    if (event.keyCode == 13 && input.value.trim() != '') {
        let item = {
            id: new Date().getTime(),
            nome : input.value
        }
        addItem(item);
        input.value = null;
        createLi(item);
    }
});

function addItem(item) {
    databaseService.save(item);
}

function createLi(item) {
    let ul = document.getElementById('tasks');
    let li = document.createElement('li');
    li.className = 'collection-item';
    li.id = 'task-' + item.id
    li.innerHTML = `
        <div>
       
            <label>
            <input type="checkbox" />
            <span>${item.nome}</span>
            </label>
      
            
            <div class="secondary-content">
                <i onclick = 'updateItemList(${JSON.stringify(item)})' class="material-icons black-text">edit</i>
                <i onclick = 'deleteItemList(${JSON.stringify(item)})' class="material-icons red-text">delete</i>                
            </div>                    
        </div>
    `;

    ul.appendChild(li);
}

function createElement() {
    let lista = databaseService.get();
    lista.forEach((item, index) => {
        createLi(item);
    });
}

function deleteItemList(item) {
    const li = document.getElementById('task-' + item.id);
    databaseService.deleteItem(item);
    li.remove();

}

function updateItemList(item) {
    const input = document.getElementById('newItem')
    const li = document.getElementById('task-' + item.id);
    databaseService.deleteItem(item);
    li.remove();
    input.value = item.nome



}

createElement();