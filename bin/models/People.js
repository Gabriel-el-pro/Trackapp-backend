const moongose = require("mongoose");

const Schema = moongose.Schema;

const PeopleSchema = new Schema({
    name: String,
    last_name: String,
    identification: String,
    gender: String,
    rol: String,
    gender: String,
    username: String,
    password: String,
    asignatures: Array,
    course: Object,
    title: String,
    menu: Array
});

var People = moongose.model("People", PeopleSchema);

module.exports = People;