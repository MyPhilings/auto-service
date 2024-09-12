class reapirjob{
    constructor(repairjob_id, vehicle_id, employee_id, problemType, description, startDate, endDate, status){
        this.repairjob_id = repairjob_id;
        this.vehicle_id = vehicle_id;
        this.employee_id = employee_id;
        this.problemType = problemType;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}

module.exports = reapirjob;