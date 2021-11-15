class Entity {
    id // number
}

class Person extends Entity {
    firstname; // string
    lastname; // string
}

class Company extends Entity {
    name; //string
}


class IDataProvider {
    list(){}; // :tableau de Entity
    search(){}; // :tableau de Entity
}

class BaseProvider extends IDataProvider {
    getData(){} // : tableau des entités
    list(){return this.getData()} //tableau des entités

    search(text) { // text : string
        const listResult = this.getData().filter(e => JSON.stringify(e).toLowerCase().includes(text.toLowerCase()));

        return listResult; //list des Entity
    }
}



class PersonProvider extends BaseProvider {
    getData(){ //renvoi un tableau de Person
        let p1 = new Person();
        p1.id = 1,
        p1.firstname = 'Sophie',
        p1.lastname = 'Lozophy'

        let p2 = new Person();
        p2.id =  2,
        p2.firstname = 'Annie',
        p2.lastname = 'Versaire'

        let p3 = new Person();
        p3.id = 3,
        p3.firstname = 'Paul',
        p3.lastname = 'Ochon'

        return [p1, p2, p3];
    }
}



class CompanyProvider extends BaseProvider {
    getData(){ //renvoi un tableau de Company
        let c1 = new Company();
        c1.id = 1,
        c1.name = 'Google'

        let c2 = new Company();
        c2.id = 2,
        c2.name = 'Apple'
        
        let c3 = new Company();
        c3.id = 3,
        c3.name = 'Microsoft'
       
        return [c1, c2, c3]
    }
}

class RepositoryService {
    providers; //tableau de IDataProvider

    constructor(providers) {
        this.providers = providers;
    }

    list(){
        let result = [];
        for(const p of this.providers ) {
            result = result.concat(p.list());
        }
        return result; // list des providers
    }

    search(text){ // text : string
        let result = [];
        for(const p of this.providers ) {
            result = result.concat(p.search(text))
        }
        return result; // tableau de résultat / list des entités
    }
}

const jose = new PersonProvider();
const sophie = new CompanyProvider();
const bertrand = new RepositoryService([jose, sophie]);


console.log(bertrand.list())

const express = require('express');
const cors = require('cors');

let app = express(); //création du serveur 
app.use(cors()); //utilisation du middleware cors : authorise les requetes HTTP provenant d'une autre origine.
app.use(express.json()); //utilisation de json

// GET (recupération de données)
// POST (envoi de données avec une intentiond e création)
// PUT (envoi de données avec une intention de modification totale)
// PATCH (evoi de données avec une intention de modification partielle)
// HEAD (salutation)
// OPTIONS (demande d'authorisation)


// Endpoints
app.get('/', function(req, res) {
    res.send(bertrand.list())
})

app.post('/search', function(req, res) {
    res.send(bertrand.search(req.body.text));
})


// Listener
app.listen(5000, function() {
    console.log("c'est lancé --> url : localhost:5000")
})

