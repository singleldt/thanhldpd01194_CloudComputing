/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/*******************************************************************************
 * Implementation code for procedure - 'procedure1'
 * 
 * 
 * @return - invocationResult
 */
 
var procedure1Statement = WL.Server.createSQLStatement("select COLUMN1, COLUMN2 from TABLE1 where COLUMN3 = ?");
function procedure1(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [param]
	});
}


/*******************************************************************************
 * Implementation code for procedure - 'procedure2'
 * 
 * 
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}


/*******************************************************************************
 * Functions that correspond to JSONStore client operations
 * 
 */

var selectStatement = WL.Server.createSQLStatement("SELECT * FROM tbstudents");

function getStudents() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : []
	});
}

var addStatement = WL.Server.createSQLStatement("INSERT INTO tbstudents(id, name, grade, adress, dob) VALUES (?,?,?,?,?)");

function addStudent(id,name,grade,adress,dob) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [id,name,grade,adress,dob]
	});
}
	
var updateStatement = WL.Server.createSQLStatement("UPDATE tbstudents SET name=?,grade=?,adress=?,dob=? WHERE id = ?");

function updateStudent(name,grade,adress,dob,id) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement,
		parameters : [name,grade,adress,dob,id]
	});
}

var deleteStatement = WL.Server.createSQLStatement("DELETE FROM tbstudents WHERE id = ?");

function deleteStudent(id) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement,
		parameters : [id]
	});
}
var findStatement = WL.Server.createSQLStatement("SELECT * FROM tbstudents WHERE id = ?");

function findStudent(id) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : findStatement,
		parameters : [id]
	});
}


// Customer


//get Customer
var selectStatementCus = WL.Server.createSQLStatement("SELECT * FROM tbcustomer");

function getCustomer() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatementCus,
		parameters : []
	});
}
//add customer

var addStatementCus = WL.Server.createSQLStatement("INSERT INTO tbcustomer(cusid,cusname,cusadress,cusphone) VALUES (?,?,?,?)");

function addCustomer(cusid,cusname,cusadress,cusphone) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatementCus,
		parameters : [cusid,cusname,cusadress,cusphone]
	});
}
//delete Customer

var deleteStatementCus = WL.Server.createSQLStatement("DELETE FROM tbcustomer WHERE cusid = ?");

function deleteCustomer(cusid) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatementCus,
		parameters : [cusid]
	});
}
var findStatementCus = WL.Server.createSQLStatement("SELECT * FROM tbcustomer WHERE cusid = ?");

function findCustomer(cusid) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : findStatementCus,
		parameters : [cusid]
	});
}
