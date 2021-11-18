import express from 'express';
import cors from 'cors';
import DepartmentDataAccess  from './dal/deptdal.js';

const port = process.env.PORT || 9091;

const instance  = express();
instance.use(express.urlencoded({extended:false}));
instance.use(express.json());


const deptDal = new DepartmentDataAccess();



instance.get('/api/departments', deptDal.getDepartments);
instance.post('/api/departments', deptDal.postDepartment);
instance.put('/api/departments/:id', deptDal.putDepartment);
instance.delete('/api/departments/:id', deptDal.deleteDepartment);

instance.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
});