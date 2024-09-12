class User {
    constructor(user_id, lastName, firstName, email, username, password){
        this.user_id = user_id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.userType = userType;
    }   
}
module.exports = User;