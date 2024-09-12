class Schedule{
    constructor(schedule_id, employee_id, date, startTime, endTime, repairJob_id){
        this.schedule_id = schedule_id;
        this.employee_id = employee_id;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repairJob_id = repairJob_id;
    }
}

module.exports = Schedule;