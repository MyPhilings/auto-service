const schedule = require('../model/schedules')
const mysqlConnection = require('../model/mysqlCon')

// Create

module.exports.createSchedule = (req, res) => {
    const{schedule_id, employee_id, date, startTime, endTime, repairJob_id} = req.body;

    const query = `Insert into schedule (schedule_id, employee_id, date, startTime, endTime, repairJob_id) values (?, ?, ?, ?, ?, ?)`;
    const values = [schedule_id, employee_id, date, startTime, endTime, repairJob_id];

    mysqlCon.query(query, values, (err, result) => {
        if(err){
            console.error('Error creating a schedule:', err);
            return res.status(500).json({err: 'Error creating a schedule'});
        }
        res.status(200).json(result);
    })
}

// Read

module.exports.readSchedule = (req, res) =>{
    const{schedule_id, employee_id, date, startTime, endTime, repairJob_id} = req.body;

    const query =`Select *  from schedule`;
    const values = [schedule_id, employee_id, date, startTime, endTime, repairJob_id];

    mysqlCon.query(query, values, (err, result) => {
        if (err) {
            console.error('Error fetching schedule:', err);
            return res.status(500).json({ err: 'Error fetching schedule' });
        }
        return res.status(200).json(result);
    })
}

// Update

module.exports.updateSchedule = (req, res) => {
    const{schedule_id, employee_id, date, startTime, endTime, repairJob_id} = req.body;

    const query =`UDPATE  schedule  SET schedule_id = ?, employee_id = ?, date = ?, startTime = ?, endTime = ?, repairJob_id = ? where id = ?`;
    const values = [schedule_id, employee_id, date, startTime, endTime, repairJob_id];

    mysqlCon.query(query, values, (err, result) => {
        if(err){
            console.error('Error updating schedule', err);
            return result.status(500).json({err: 'Error updating schedule'});
        }
        res.status(200).json(result);
    })
}

// Delete

module.exports.deleteSchedule = (req, res) => {
    const{schedule_id, employee_id, date, startTime, endTime, repairJob_id} = req.body;

    const query =`DELETE FROM schedule WHERE id = ?`;
    const values = [schedule_id, employee_id, date, startTime, endTime, repairJob_id];

    mysqlCon.query(query, values, (err, result) => {
        if(err){
            console.error('Error removing schedule', err);
            return result.status(500).json({err: 'Error removing schedule'});
        }
        res.status(200).json(result);
    })
}