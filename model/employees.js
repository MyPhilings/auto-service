class Employee{
    constructor(employee_id, user_id, specialty, manager_id, shop_id){
        this.employee_id = employee_id;
        this.user_id = user_id;
        this.specialty = specialty;
        this.manager_id = manager_id;
        this.shop_id = shop_id;
    }
}

module.exports = Employee;