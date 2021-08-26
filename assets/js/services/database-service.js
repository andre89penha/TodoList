function DatabaseService(origin) {
    const get = function () {
        let lista = localStorage.getItem(origin);
        let dados = JSON.parse(lista);
        return dados === null ? [] : dados ;
    }
    const save = function(item){
        let lista = get();
        lista.push(item);
        saveAll(lista);
    }

    const saveAll = function(listaDados) {
        let dados = JSON.stringify(listaDados);
        localStorage.setItem(origin, dados);
    }

    const deleteItem = function (item) {
        let lista = get();
        let novaLista = lista.filter( function (valor, index) {
            if (item.id != valor.id) {
                return valor;
            }
        });
       saveAll(novaLista);
    }

    const update = function (item) {
        let lista = get();
        lista.forEach((valor,index) => {
            if (item.id == valor.id) {
                lista[index].nome = item.nome;
            }
        });
        saveAll(lista);
    }
    return {get, save, deleteItem, update, saveAll};
};