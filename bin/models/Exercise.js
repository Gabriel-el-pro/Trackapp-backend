const { S3RequestPresigner } = require("@aws-sdk/s3-request-presigner");
const moongose = require("mongoose");

const Schema = moongose.Schema;

const ExerciseSchema = new Schema({
    task_asignature: [],
    topic: Array,
    task_type: String,
    task_title: String,
    task_description: String,
    deliveryDateInicial: Date,
    deliveryDateFinal: Date,
    task_status: String,
    archivoAWS: String,
    archivo: Array,
    people_id: {
        type: Schema.Types.ObjectId,
        ref: "People"
    }
});

var Exercise = moongose.model("Exercise", ExerciseSchema);

module.exports = Exercise;