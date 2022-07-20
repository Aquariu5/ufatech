import fs from 'fs';

export const getContacts = (req, res, next) => {
    const db = JSON.parse(fs.readFileSync('db.json').toString());
    return res.status(200).json(db.db);
}

export const addContact = (req, res, next) => {
    console.log('body', req.body);
    let db = JSON.parse(fs.readFileSync('./db.json').toString());
    let {name, number} = req.body;
    db = db.db;
    db.push({id: +new Date(), name, number});
    fs.writeFileSync('db.json', JSON.stringify({db}, null, 2));
    return res.status(200).json(db);
}

export const editContact = (req, res, next) => {
    let db = JSON.parse(fs.readFileSync('db.json').toString());
    let {id, name, number} = req.body;
    db = db.db;
    let idx = db.findIndex(el => el.id === id);
    if (idx == -1) {
        return res.status(500).json({error: "NO ID"});
    }
    db[idx].name = name;
    db[idx].number = number;
    fs.writeFileSync('db.json', JSON.stringify({db}, null, 2));
    return res.status(200).json(db);
}

export const removeContact = (req, res, next) => {
    let db = JSON.parse(fs.readFileSync('db.json').toString());
    let {id, name, number} = req.body;
    db = db.db;
    db = db.filter(el => el.id != id);
    fs.writeFileSync('db.json', JSON.stringify({db}, null, 2));
    return res.status(200).json(db);
}
