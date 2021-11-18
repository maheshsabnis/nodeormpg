import {Sequelize} from 'sequelize';
import pkg from 'sequelize';
const {DataTypes} = pkg;
import department from './../models/department.js';


//  connect to the database
const sequelize = new Sequelize('business', 'maheshadmin', 'P@ssw01rd', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
});
// make sure that the connection is established
sequelize.authenticate().then(authenticate =>{
    console.log('====================================');
    console.log('connected');
    console.log('====================================');
}, (error)=>{
 console.log('====================================');
 console.log('Error Occured');
 console.log('====================================');
});
 
// the data access class for CRUD operations with Department table
class DepartmentDataAccess {
    //  Initialize the  department model for mapping with table, so that read/write operations can be performed
    constructor(){
        department.init(sequelize,DataTypes);
    }
    // Method to read all records
    async getDepartments(req,resp){
        //  connect to database using sequelize object
        // {force:false} will make sure that if the table is already exist, it won't
        // be overridden
        await sequelize.sync({force:false});
        //  Read all records
        let records = await department.findAll();
        //  Generate response
        if(records) {
            return resp.status(200).send(records);
        }
        return resp.status(500).send({message: 'Some Error Occured'});
    }

    async postDepartment(req,resp){
        await sequelize.sync({force:false});
        let dept = await department.create(req.body);
        if(dept) {
            return resp.status(200).send (dept);
        }
        return resp.status(500).send ({msg:'Some Error Occured in create'});
    }

    async putDepartment(req,resp){
        await sequelize.sync({force:false});
        console.log(req.params.id);
        let dept = await department.update({
            deptno: req.body.deptno,
            deptname: req.body.deptname,
            location: req.body.location,
            capacity: req.body.capacity
        },{where:{deptno:parseInt(req.params.id)}});
        
        if(dept) {
            return resp.status(200).send ({message: `Record Updated Successfully`, data:JSON.stringify(dept)});
        }
        return resp.status(500).send ({msg:'Some Error Occured in create'});
    }

    async deleteDepartment(req,resp){
        await sequelize.sync({force:false});
        console.log(req.params.id);
        let result = await department.destroy({where:{deptno:parseInt(req.params.id)}});
        
        if(result) {
            return resp.status(200).send ({message:'Record Deleted Successfully', data:result});
        }
        return resp.status(500).send ({msg:'Some Error Occured in create'});
    }
}

export default DepartmentDataAccess;