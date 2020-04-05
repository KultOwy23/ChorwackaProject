const User = require('../models/Users');

class UserRepository {
    constructor(model) {
        this.model = model;
    }

    create(newUser) {
        // const newUser = {name: params.name, lastName: params.lastName, email: params.email, role: params.role, rent_share: params.re };
        const user = new this.model(newUser);
        return user.save();
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findById(id);
    }
    
    findByMail(mail) {
        const query = {email: mail};
        console.log(`Query: ${query.mail}`);
        return this.model.findOne(query);
    }

    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }

    updateById(id, object) {
        const query = { _id: id};
        return this.model.findOneAndUpdate(query, {$set: object});
    }

    updateByEmail(emailAddress, object) {
        const query = {email: emailAddress};
        return this.model.findOneAndUpdate(query, { 
            $set: {
                name: object.name, 
                lastName: object.lastName, 
                email: object.email, 
                role: object.role, 
                rent_share: object.rent_share
            }});
    }
}

module.exports = new UserRepository(User);