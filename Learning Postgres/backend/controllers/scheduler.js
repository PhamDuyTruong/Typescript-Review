const db = require("../models");
const SchedulerEvents = db.scheduler;

exports.getData = async (req, res) => {
    try {
        const newSchedule = await SchedulerEvents.findAll();
        res.status(202).send(newSchedule)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occured"
        })        
    }
};

exports.crudActions = async (req, res) => {
    if(req.body.added !== null && req.body.added.length > 0){
        for(let i = 0; i < req.body.added.length; i++){
            let insertData = req.body.added[i];
            try {
                const createdSchedule = await SchedulerEvents.create(insertData);
                req.status(201).send(createdSchedule)
            } catch (error) {
                res.status(500).send({
                    message: error.message || "Some error occured"
                }) 
            }
        }
    }

    if(req.body.changed !== null && req.body.changed.length > 0){
        for(let i = 0; i < req.body.changed.length; i++){
            let updatedData = req.body.changed[i];
            try {   
                const updatedSchedule = await SchedulerEvents.update(updatedData, {where: {id: updatedData.id}});
                if(updatedSchedule === 1){
                    res.status(201).send(updatedSchedule);
                }else{
                    res.status(404).send({
                        message: `Cannot update Event with id=${id}. Maybe Event was not found, or req.body is empty!`
                    });
                }
            } catch (error) {
                res.status(500).send({
                    message: "Error updating Event with id=" + id
                });
            }
           
    if(req.body.deleted !== null && req.body.deleted.length > 0){
        for(let i = 0; i < req.body.deleted.length; i++){
            let deletedData = req.body.deleted[i];
            try {
                const deletedSchedule = await SchedulerEvents.destroy({where: {id: deletedData.id}});
                if(deletedData === 1){
                    res.status(200).send(deletedSchedule)
                }else{
                    res.status(404).send({
                        message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                    });
                }
            } catch (error) {
                res.status(500).send({
                    message: "Error deleting Event with id=" + id
                });
            }
        }
    }

        }
    }
}
