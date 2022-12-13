const mongoose = require("mongoose");
const People = require("../bin/models/People");
const Course = require("../bin/models/Course");
const Exercise = require("../bin/models/Exercise");
const Area = require("../bin/models/Area");
const School = require("../bin/models/School");
const Role = require("../bin/models/Role");
const ExerciseType = require("./models/ExerciseType");
const Resource = require("./models/Resource");
const SendExercise = require("./models/SendExercise");

class Controller{

    constructor(){
        this.connect();
    }

    async connect(){
        try{
            await mongoose.connect(
                // "mongodb+srv://acorderofalco58:TEACHdev2021.@cluster0.3okjxa2.mongodb.net/trackapp?retryWrites=true&w=majority",
                "mongodb://acorderofalco58:TEACHdev2021.@ac-wq3ku25-shard-00-00.3okjxa2.mongodb.net:27017,ac-wq3ku25-shard-00-01.3okjxa2.mongodb.net:27017,ac-wq3ku25-shard-00-02.3okjxa2.mongodb.net:27017/trackapp?ssl=true&replicaSet=atlas-twthjd-shard-0&authSource=admin&retryWrites=true&w=majority",
                {useNewUrlParser:true}
            );
            console.log('conectado');
        }catch(e){
            console.error(e);
        }
    }

/* autenticación */
getAuth(people, res){
    let {username, password} = people;
    console.log(username, password);
    People.findOne({username}, (err, people) => {
            if(err){
                res.status(500).send("Error de autenticación de usuario");
            }
            else if(!people){
                res.status(500).send("Usuario invalido");
            }
            else{
                if (password == people.password)
                    res.status(200).send(people);
                else
                    res.status(500).send("Usuario invalido");
            }
        })
    }
/* autenticación */


/* area */
setArea(area, res) {
    Area.create(area, function(err, newArea){
        if(err) throw err;
        res.send({status: 200, nU: newArea});
    });
}

getAreas(res){
    Area.find({}, function(err, area){
        if(err) throw err;
        res.send(area);
    })
}

updateArea(area, res){
    let {id, name, code, teacher_id, course_id} = area;
    Area.updateOne(
        {_id: id},
        {$set: {name: name, code: code, teacher_id: teacher_id, course_id: course_id}}
    )
    .then(rawResponse => {
        res.send({message: "Area update", raw: rawResponse})
    })
    .catch(err => {
        if(err) throw err;
    });
}

deleteArea(id, res){
    Area.deleteOne({_id: id}, function(err){
        if(err) throw err;
        res.send({message: "Area has been deleted"});
    })
}
/* area */

/* People */
setPeople(people, res) {
    People.create(people, function(err, newPeople) {
        if (err) throw err;
        res.send({status: 200, nU: newPeople});
    });
}

getPeoples(res){
    People.find({}, (err, peoples)=>{
        if(err) throw err;
        res.send( peoples );
    });
}

getPeople(id, res){
    People.find({_id : id}, (err, people)=>{
        if(err) throw err;
        res.send( {People : people} );
    });
}

updatePeople(people, res) {
    let { id, name, last_name, gender, rol, username, password } = people;
    People.updateOne(
        {_id: id},
        {$set: {name: name, last_name: last_name, gender:gender, rol: rol, username: username, password: password}}
        )
        .then(rawResponse => {
             res.send({ message: "People updated", raw: rawResponse })
        })
        .catch(err => {
            if(err) throw err;
        });
    }

deletePeople(id, res){
    People.deleteOne({_id : id}, (err)=>{
        if(err) throw err;
        res.send( {message : "People has been deleted"} );
    });
}
/* people */


/*------------------------------------CRUD ROL------------------------------------*/
setRole(role, res) {
    Role.create(role, function(err, newRole) {
        if (err) throw err;
        res.send({status: 200, nU: newRole});
    });
}

getRoles(res){
    Role.find({}, (err, roles)=>{
        if(err) throw err;
        res.send( roles );
    });
}

updateRole(role, res) {
    const { id, name } = role;
    Role.updateOne(
        {_id: id},
        {$set: {name: name}}
        )
        .then(rawResponse => {
            res.send({ message: "Role updated", raw: rawResponse })
        })
        .catch(err => {
            if(err) throw err;
        });
}

deleteRole(id, res){
    Role.deleteOne({_id : id}, (err)=>{
        if(err) throw err;
        res.send( {message : "Role has been deleted"} );
    });
};

/*------------------------------------CRUD ROL------------------------------------*/

/*------------------------------------CRUD COURSE------------------------------------*/
    //CREATE
setCourse(course, res) {
    Course.create(course, function(err, newCourse) {
        if (err) throw err;
        res.send({status: 200, nU: newCourse});
    });
}


    //READ
getCourses(res){
    Course.find({}, (err, courses)=>{
        if(err) throw err;
        res.send( courses );
    })
}

getCourse(id, res){
    Course.find({_id : id}, (err, course)=>{
        if(err) throw err;
        res.send( {Course : course} );
    });
}

    //UPDATE
updateCourse(course, res) {
    let { id, grade, group, nomenclature } = course;
        Course.updateOne(
        {_id: id},
        {$set: {grade: grade, group: group, nomenclature: nomenclature}}
        )
        .then(rawResponse => {
            res.send({ message: "Course updated", raw: rawResponse })
        })
        .catch(err => {
            if(err) throw err;
        });
    }

    //DELETE
deleteCourse(id, res){
    Course.deleteOne({_id : id}, (err)=>{
        if(err) throw err;
        res.send( {message : "Course has been deleted"} );
    });
}
/*/------------------------------------CRUD COURSE/*------------------------------------*/

/*------------------------------------CRUD EXERCISE------------------------------------*/
    //CREATE
setExercise(exercise, res) {
    Exercise.create(exercise, function(err, newGrade) {
        if (err) throw err;
        res.send({status: 200, nU: newGrade});
    });
}

    //READ

getExercises(res){
    Exercise.find({}, (err, exercises)=>{
        if(err) throw err;
        res.send( exercises );
    });
}

getExercises(res){
    Exercise.find({}, (err, exercises)=>{
        if(err) throw err;
        res.send( exercises );
    });
}

getExercise(id, res){
    Exercise.find({_id : id}, (err, exercise)=>{
        if(err) throw err;
        res.send( {Exercise : exercise} );
    });
}

    //UPDATE
updateExercise(exercise, res) {
    let { id, task_asignature, topic, task_type, task_title, task_description, task_status, deliveryDateInicial, deliveryDateFinal,  people_id } = exercise;
    Exercise.updateOne(
        {_id: id},
        {$set: {task_asignature: task_asignature, topic: topic, task_type: task_type, task_title: task_title, 
            task_description: task_description, deliveryDateInicial: deliveryDateInicial, deliveryDateFinal: deliveryDateFinal, task_status: task_status, people_id: people_id}
        }
        )
        .then(rawResponse => {
            res.send({ message: "Exercise updated", raw: rawResponse })
            })
            .catch(err => {
            if(err) throw err;
            });
    }
    

    //DELETE
deleteExercise(id, res){
    Exercise.deleteOne({_id : id}, (err)=>{
        if(err) throw err;
        res.send( {message : "Exercise has been deleted"} );
    });
}
/*/------------------------------------CRUD EXERCISE/*------------------------------------*/

/*------------------------------------CRUD AREA------------------------------------*/
    //CREATE
    setArea(area, res) {
        Area.create(area, function(err, newArea) {
            if (err) throw err;
            res.send({status: 200, nU: newArea});
        });
    }
    
        //READ
    getArea(res){
        Area.find({}, (err, areas)=>{
            if(err) throw err;
            res.send( areas );
        });
    }
    
    getArea(id, res){
        Area.find({_id : id}, (err, area)=>{
            if(err) throw err;
            res.send( {Area : area} );
        });
    }
    
        //UPDATE
    updateArea(area, res) {
        let { id, name, creation_date} = area;
        Area.updateOne(
            {_id: id},
            {$set: {name: name, creation_date: creation_date}}
            )
            .then(rawResponse => {
                res.send({ message: "Area updated", raw: rawResponse })
                })
                .catch(err => {
                if(err) throw err;
                });
        }
        
    
        //DELETE
    deleteArea(id, res){
        Area.deleteOne({_id : id}, (err)=>{
            if(err) throw err;
            res.send( {message : "Area has been deleted"} );
        });
    }
    /*/------------------------------------CRUD AREA/*------------------------------------*/

    /*------------------------------------CRUD SCHOOL------------------------------------*/
    //CREATE
    setSchool(school, res) {
        School.create(school, function(err, newSchool) {
            if (err) throw err;
            res.send({status: 200, nU: newSchool});
        });
    }
    
        //READ
    getSchools(res){
        School.find({}, (err, schools)=>{
            if(err) throw err;
            res.send( schools );
        });
    }
    
    getPeriod(id, res){
        Period.find({_id : id}, (err, period)=>{
            if(err) throw err;
            res.send( {Period : period} );
        });
    }
    
        //UPDATE
    updateSchool(school, res) {
        let { id, name, nit, courses, contact, grade, direction} = school;
        School.updateOne(
            {_id: id},
            {$set: {name: name, nit: nit, courses: courses, contact: contact, grade: grade, direction: direction}}
            )
            .then(rawResponse => {
                res.send({ message: "Period updated", raw: rawResponse })
                })
                .catch(err => {
                if(err) throw err;
                });
        }
        
    
        //DELETE
    deleteSchool(id, res){
        School.deleteOne({_id : id}, (err)=>{
            if(err) throw err;
            res.send( {message : "Period has been deleted"} );
        });
    }
    /*/------------------------------------CRUD SCHOOL/*------------------------------------*/

    /*------------------------------------CRUD EXERCISETYPE------------------------------------*/
    //CREATE
    setExerciseType(exerciseType, res) {
        ExerciseType.create(exerciseType, function(err, newExerciseType) {
            if (err) throw err;
            res.send({status: 200, nU: newExerciseType});
        });
    }
    
        //READ
    getExerciseTypes(res){
        ExerciseType.find({}, (err, exerciseTypes)=>{
            if(err) throw err;
            res.send( exerciseTypes );
        });
    }
    
    getPeriod(id, res){
        Period.find({_id : id}, (err, period)=>{
            if(err) throw err;
            res.send( {Period : period} );
        });
    }
    
        //UPDATE
    updateExerciseType(exerciseType, res) {
        let { id, topic, subtopic} = exerciseType;
        ExerciseType.updateOne(
            {_id: id},
            {$set: {topic: topic, subtopic: subtopic}}
            )
            .then(rawResponse => {
                res.send({ message: "Exercise type updated", raw: rawResponse })
                })
                .catch(err => {
                if(err) throw err;
                });
        }
        
    
        //DELETE
    deleteExerciseType(id, res){
        ExerciseType.deleteOne({_id : id}, (err)=>{
            if(err) throw err;
            res.send( {message : "Exercise type has been deleted"} );
        });
    }
    /*/------------------------------------CRUD EXERCISETYPE/*------------------------------------*/

    /*------------------------------------CRUD EXERCISETYPE------------------------------------*/
    //CREATE
    setExerciseType(exerciseType, res) {
        ExerciseType.create(exerciseType, function(err, newExerciseType) {
            if (err) throw err;
            res.send({status: 200, nU: newExerciseType});
        });
    }
    
        //READ
    getExerciseTypes(res){
        ExerciseType.find({}, (err, exerciseTypes)=>{
            if(err) throw err;
            res.send( exerciseTypes );
        });
    }
    
    getPeriod(id, res){
        Period.find({_id : id}, (err, period)=>{
            if(err) throw err;
            res.send( {Period : period} );
        });
    }
    
        //UPDATE
    updateExerciseType(exerciseType, res) {
        let { id, topic, subtopic} = exerciseType;
        ExerciseType.updateOne(
            {_id: id},
            {$set: {topic: topic, subtopic: subtopic}}
            )
            .then(rawResponse => {
                res.send({ message: "Exercise type updated", raw: rawResponse })
                })
                .catch(err => {
                if(err) throw err;
                });
        }
        
    
        //DELETE
    deleteExerciseType(id, res){
        ExerciseType.deleteOne({_id : id}, (err)=>{
            if(err) throw err;
            res.send( {message : "Exercise type has been deleted"} );
        });
    }
    /*/------------------------------------CRUD EXERCISETYPE/*------------------------------------*/

        /*------------------------------------CRUD RESOURCE------------------------------------*/
    //CREATE
    setResource(resource, res) {
        Resource.create(resource, function(err, newResource) {
            if (err) throw err;
            res.send({status: 200, nU: newResource});
        });
    }
    
        //READ
    getResources(res){
        Resource.find({}, (err, resources)=>{
            if(err) throw err;
            res.send( resources );
        });
    }
    
    getPeriod(id, res){
        Period.find({_id : id}, (err, period)=>{
            if(err) throw err;
            res.send( {Period : period} );
        });
    }
    
        //UPDATE
    updateResource(resource, res) {
        let { id, title, name, resource_type, people_id} = resource;
        Resource.updateOne(
            {_id: id},
            {$set: {title: title, name: name, resource_type: resource_type, people_id: people_id}}
            )
            .then(rawResponse => {
                res.send({ message: "Resource type updated", raw: rawResponse })
                })
                .catch(err => {
                if(err) throw err;
                });
        }
        
    
        //DELETE
    deleteResource(id, res){
        Resource.deleteOne({_id : id}, (err)=>{
            if(err) throw err;
            res.send( {message : "Resource type has been deleted"} );
        });
    }
    /*/------------------------------------CRUD RESOURCE/*------------------------------------*/

    /*------------------------------------CRUD SEND EXERCISE------------------------------------*/
    //CREATE
    setSendExercise(sendExercise, res) {
        SendExercise.create(sendExercise, function(err, newSendExercise) {
            if (err) throw err;
            res.send({status: 200, nU: newSendExercise});
        });
    }
    
        //READ
    getSendExercises(res){
        SendExercise.find({}, (err, sendExercise)=>{
            if(err) throw err;
            res.send( sendExercise );
        });
    }
    
    getPeriod(id, res){
        Period.find({_id : id}, (err, period)=>{
            if(err) throw err;
            res.send( {Period : period} );
        });
    }
    
        //UPDATE
    updateSendExercise(sendExercise, res) {
        let { id, archive, people_id, exercise_id, note} = sendExercise;
        SendExercise.updateOne(
            {_id: id},
            {$set: {archive: archive, note: note, exercise_id: exercise_id, people_id: people_id}}
            )
            .then(rawResponse => {
                res.send({ message: "Exercise send type updated", raw: rawResponse })
                })
                .catch(err => {
                if(err) throw err;
                });
        }
        
    
        //DELETE
    deleteSendExercise(id, res){
        SendExercise.deleteOne({_id : id}, (err)=>{
            if(err) throw err;
            res.send( {message : "Send Exercise type has been deleted"} );
        });
    }
    /*/------------------------------------CRUD SEND EXERCISE/*------------------------------------*/
}

exports.Controller = new Controller;