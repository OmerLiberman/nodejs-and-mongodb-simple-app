const express = require('express');
const router = express.Router();

const Employee = require('../models/employeeModel');

// GET (start)
router.get('/', (req, resp)=>{
    Employee.find({})
        .then(employees => {
            resp.render('index', {employees: employees});
        }).catch(err => {
            req.flash('error_msg', 'ERROR: ' + err);
            resp.redirect('/');
        })
});

router.get('/employee/new', (req, resp)=>{
    resp.render('new');
});

router.get('/employee/search', (req, resp)=>{
    resp.render('search', {employee: ""});
});

router.get('/employee', (req, resp)=>{
    let query = {name: req.query.name};

    Employee.findOne(query)
        .then(employee => {
            req.flash('success_msg', 'updated successfully');
            resp.render('search', {employee: employee});
        }).catch(err => {
            req.flash('error_msg', 'ERROR: ' + err);
            resp.redirect('/');
        })
});

router.get('/edit/:id', (req, resp)=>{
    let query = {_id: req.params.id};
    Employee.findOne(query)
        .then(employee=>{
            resp.render('edit', {employee: employee});})
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err);
            resp.redirect('/');
    });
})
// GET (end)

// POST (start)
router.post('/employee/new', (req, resp)=>{
    let newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    };

    Employee.create(newEmployee)
        .then(employee => {
            req.flash('success_msg', 'updated successfully');
            resp.redirect('/');})
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err);
            resp.redirect('/');
        });
});
// POST (end)

// PUT (start)
router.put('/edit/:id', (req, resp) => {
    let query = {_id: req.params.id};

    Employee.updateOne(query, {$set: {
        name: req.body.name,
            designation: req.body.designation,
            salary: req.body.salary
        }})
        .then(employee=>{
            req.flash('success_msg', 'updated successfully');
            resp.redirect('/');})
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err);
            resp.redirect('/');});
});
// PUT (end)

// DELETE (start)
router.delete('/delete/:id', (req, resp) => {
    let query = {_id: req.params.id};
    Employee.deleteOne(query, {$set: {
            name: req.body.name,
            designation: req.body.designation,
            salary: req.body.salary
        }})
        .then(employee=>{
            req.flash('success_msg', 'deleted successfully');
            resp.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err);
            resp.redirect('/');
        });
});
// DELETE (end)

module.exports = router;
