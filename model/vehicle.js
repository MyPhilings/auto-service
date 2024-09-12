class Vehicle{
    constructor(vehicle_id, customer_id, model, brand, year, licensePlate){
        this.vehicle_id = vehicle_id;
        this.customer_id = customer_id;
        this.model = model;
        this.brand = brand;
        this.year = year;
        this.licensePlate = licensePlate;
    }
}

module.exports = Vehicle;