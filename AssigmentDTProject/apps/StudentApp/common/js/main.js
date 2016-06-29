var busyIndicator = null;
var value ="";
var valuecus="";
$(document).on("tabsbeforeactivate", "#tabs", function (e, ui) {
    $(ui.newPanel).addClass("in turn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("in turn");
    });
});

function wlCommonInit(){
	
	busyIndicator = new WL.BusyIndicator(null,{text:'Loading...'});
	getStudents();
	$("#btn1").click(getIDStudents);
	$("#btnAddCus").click(busyIndicatorCheckAddCus);
	$("#btnAdd").click(busyIndicatorCheckAdd);
	$("#btnReset").click(resetDataAdd);
	$("#btnUpdate").click(busyIndicatorCheckUpdate);
	$("#btnDelete").click(busyIndicatorCheckDeleted);
	$("#btnFind").click(busyIndicatorCheckFind);
	$("#btnEdit").click(updateStudentsByID);
	
}
function getID(element){
	value = $('span', $(element)).html();
	findStudentsByID(value);
}
function getIDCus(element){
	valuecus = $('span', $(element)).html();
	findCustomerByID(valuecus);
}
function busyIndicatorDeleteHome()
{	
		busyIndicator.show();
		setTimeout(function() {
			busyIndicator.hide();		
			deleteStudents(value);				
		}, 2000);
}
// Check add Student
function busyIndicatorCheckAdd()
{	
		busyIndicator.show();
		setTimeout(function() {
			busyIndicator.hide();
			var id = $("#txtIdAdd").val();
			var name = $("#txtNameAdd").val();
			var grade = $("#txtGradeAdd").val();
			var adress = $("#txtAdressAdd").val();
			var dob = $("#txtDateAdd").val();
			if(id==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter ID !", 
						[{text: "Ok", handler: function() {name.focus(); }}]
					);
				return false;
			}
			if(name==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Name !", 
						[{text: "Ok", handler: function() {name.focus(); }}]
					);
				return false;
			}
			if(grade==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Description !", 
						[{text: "Ok", handler: function() {grade.focus(); }}]
					);
				return false;
			}
			if(adress==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Price !", 
						[{text: "Ok", handler: function() {adress.focus(); }}]
					);
				return false;
			}
			if(dob==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Status !", 
						[{text: "Ok", handler: function() {dob.focus(); }}]
					);
				return false;
			}else{
				addStudents();
			}
			
		}, 2000);
		
}
function busyIndicatorCheckFind()
{	
		busyIndicator.show();
		setTimeout(function() {
			busyIndicator.hide();
			CheckIDfind();
			findStudents();
			
		}, 2000);
}
function busyIndicatorCheckUpdate()
{	
		busyIndicator.show();
		setTimeout(function() {
			busyIndicator.hide();
			var name = $("#txtName").val();
			var grade = $("#txtGrade").val();
			var adress = $("#txtAdress").val();
			var dob = $("#txtDate").val();
			if(name==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Name !", 
						[{text: "Ok", handler: function() {name.focus(); }}]
					);
				return false;
			}
			if(grade==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Description !", 
						[{text: "Ok", handler: function() {grade.focus(); }}]
					);
				return false;
			}
			if(adress==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Price !", 
						[{text: "Ok", handler: function() {adress.focus(); }}]
					);
				return false;
			}
			if(dob==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Status !", 
						[{text: "Ok", handler: function() {dob.focus(); }}]
					);
				return false;
			}else{
				updateStudents();
			}
			
		}, 2000);
}
function busyIndicatorCheckDeleted()
{	
		busyIndicator.show();
		setTimeout(function() {
			busyIndicator.hide();
			CheckIDfind();
			deleteStudents($("#txtIdFind").val());
			resetDataUD();
		}, 2000);
}
// Busy Customer 
function busyIndicatorCheckAddCus()
{	
		busyIndicator.show();
		setTimeout(function() {
			busyIndicator.hide();
			var id = $("#txtCusIDAdd").val();
			var name = $("#txtCusNameAdd").val();
			var grade = $("#txtCusAddAdd").val();
			var adress = $("#txtCusPhoneAdd").val();
			if(id==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter ID !", 
						[{text: "Ok", handler: function() {name.focus(); }}]
					);
				return false;
			}
			if(name==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Name !", 
						[{text: "Ok", handler: function() {name.focus(); }}]
					);
				return false;
			}
			if(grade==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Address !", 
						[{text: "Ok", handler: function() {grade.focus(); }}]
					);
				return false;
			}
			if(adress==""){
				WL.SimpleDialog.show(
						"Error !", "You must enter Phone !", 
						[{text: "Ok", handler: function() {adress.focus(); }}]
					);
				return false;
			}else{
				addCustomer()();
			}
			
		}, 2000);
		
}
function busyIndicatorDeleteHomeCus()
{	
		busyIndicator.show();
		setTimeout(function() {
			busyIndicator.hide();		
			deleteCustomer(valuecus);				
		}, 2000);
}


// function Products
function getStudents(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'getStudents',
		parameters : []
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : getStudentsSuccess,
		onFailure : getStudentsFailure
	});
}

function getStudentsSuccess(result){
//	WL.SimpleDialog.show(
//			"Sucess !", "Get Sucessfull !", 
//			[{text: "Ok", handler: function() { }}]
//		);
	displayFeeds(result.invocationResult.resultSet);
	
}

function getStudentsFailure(result){
	WL.SimpleDialog.show(
			"Failure !", "Get Failure !", 
			[{text: "Ok", handler: function() { }}]
		);
}
// add a student

function addStudents(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'addStudent',
		parameters : [$('#txtIdAdd').val(),$('#txtNameAdd').val(),$('#txtGradeAdd').val(),$('#txtAdressAdd').val(),$('#txtDateAdd').val()]
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : addStudentsSuccess,
		onFailure : addStudentsFailure
	});
}

function addStudentsSuccess(result){
	WL.SimpleDialog.show(
			"Add Result", "Successfull !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
	$("#myPopup").popup('close');
	reloadListview();
	resetDataAdd();
}

function addStudentsFailure(result){
	WL.SimpleDialog.show(
			"Add Result", "Failure !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
}	

// find 
function findStudents(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'findStudent',
		parameters : [$("#txtIdFind").val()]
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : findStudentsSuccess,
		onFailure : findStudentsFailure
	});
}

function findStudentsSuccess(result){
	if(result.invocationResult.resultSet.length == 0){
		WL.SimpleDialog.show(
				"Search Result", "Failure !!!", 
				[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
			);
	}else{
		WL.SimpleDialog.show(
				"Search Result", "Successfull !!!", 
				[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
			);
		displayFeedsFind(result.invocationResult.resultSet);
	}
}

function findStudentsFailure(result){
}

function deleteStudents(id){
	var invocationData = {
		adapter : 'Students',
		procedure : 'deleteStudent',
		parameters : [id]
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : deleteStudentsSuccess,
		onFailure : deleteStudentsFailure
	});
}

function deleteStudentsSuccess(result){
	WL.SimpleDialog.show(
			"Delete Result", "Successfull !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
	reloadListview();
}

function deleteStudentsFailure(result){
	WL.SimpleDialog.show(
			"Delete Result", "Failure !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
}
//update student
function updateStudents(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'updateStudent',
		parameters : [$('#txtName').val(),$('#txtGrade').val(),$('#txtAdress').val(),$('#txtDate').val(),$('#txtId').val()]
	};
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : updateStudentsSuccess,
		onFailure : updateStudentsFailure
	});
}

function updateStudentsSuccess(result){
	WL.SimpleDialog.show(
			"Update Result", "Successfull !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
	reloadListview();
	resetDataUD();
}

function updateStudentsFailure(result){
	WL.SimpleDialog.show(
			"Update Result", "Failure !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
}
function displayFeedsFind(items){
	document.getElementById("txtId").value=items[0].id;
	document.getElementById("txtName").value=items[0].name;
	document.getElementById("txtGrade").value=items[0].grade;
	document.getElementById("txtAdress").value=items[0].adress;
	document.getElementById("txtDate").value=items[0].dob;
}
function displayFeeds(items){
    for(var i=0;i<items.length;i++){
		var value = "<li onclick='getID(this)'><a href='#myPopup1' data-rel='popup' data-position-to='window' data-transition='flip'><img src='./images/goods.png'><h3 style='color: #00897B;' >"+items[i].name+"</h3><p><b><i>"+items[i].adress+"</b></i></p><span style='color:red;' class='ui-li-count'>"+items[i].id+"</span></a><a href='#delStudent' data-rel='popup' data-position-to='window' data-transition='pop'></a></li>";
		$("#itemsList").append(value).listview("refresh");
	}
}

// Validator Form
function ValidatorAdd(){
	
}
function ValidatorUpdate(){

}
function reloadListview(){
	$("#itemsList").html("");
	getStudents();
}
function reloadListviewCus(){
	$("#listCus").html("");
	getCustomer();
}
function CheckIDfind(){
	var id = $("#txtIdFind").val();
	if(id == ""){
		WL.SimpleDialog.show(
				"Error !", "You must enter ID !", 
				[{text: "Ok", handler: function() {id.focus(); }}]
			);
	}
}
function resetDataAdd(){
	$("#txtIdAdd").val("");
	$("#txtNameAdd").val("");
	$("#txtGradeAdd").val("");
	$("#txtAdressAdd").val("");
	$("#txtDateAdd").val("");
}
function resetDataAddCus(){
	$("#txtCusIDAdd").val("");
	$("#txtCusNameAdd").val("");
	$("#txtCusAddAdd").val("");
	$("#txtCusPhoneAdd").val("");
}
function resetDataUD(){
	$("#txtId").val("");
	$("#txtName").val("");
	$("#txtGrade").val("");
	$("#txtAdress").val("");
	$("#txtDate").val("");
}
function resetDataUDByID(){
	$("#txtIdx").val("");
	$("#txtNamex").val("");
	$("#txtGradex").val("");
	$("#txtAdressx").val("");
	$("#txtDatex").val("");
}
// find by id
function findStudentsByID(id){
	var invocationData = {
		adapter : 'Students',
		procedure : 'findStudent',
		parameters : [id]
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : findStudentsByIDSuccess,
		onFailure : findStudentsByIDFailure
	});
}

function findStudentsByIDSuccess(result){
	displayFeedsFindByID(result.invocationResult.resultSet);
}

function findStudentsByIDFailure(result){
}
function displayFeedsFindByID(items){
	document.getElementById("txtIdx").value=items[0].id;
	document.getElementById("txtNamex").value=items[0].name;
	document.getElementById("txtGradex").value=items[0].grade;
	document.getElementById("txtAdressx").value=items[0].adress;
	document.getElementById("txtDatex").value=items[0].dob;
}
function displayFeedsFindByIDCus(items){
	document.getElementById("txtCusID").value=items[0].cusid;
	document.getElementById("txtCusName").value=items[0].cusname;
	document.getElementById("txtCusAdd").value=items[0].cusadress;
	document.getElementById("txtCusPhone").value=items[0].cusphone;
}
function updateStudentsByID(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'updateStudent',
		parameters : [$('#txtNamex').val(),$('#txtGradex').val(),$('#txtAdressx').val(),$('#txtDatex').val(),$('#txtIdx').val()]
	};
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : updateStudentsByIDSuccess,
		onFailure : updateStudentsByIDFailure
	});
}

function updateStudentsByIDSuccess(result){
	WL.SimpleDialog.show(
			"Update Result", "Successfull !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
	$("#myPopup1").popup('close');
	resetDataUDByID();
	reloadListview();
}

function updateStudentsByIDFailure(result){
	WL.SimpleDialog.show(
			"Update Result", "Failure !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
}
function getIDStudents(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'getStudents',
		parameters : []
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : getIDStudentsSuccess,
		onFailure : getIDStudentsFailure
	});
}

function getIDStudentsSuccess(result){
//	WL.SimpleDialog.show(
//			"Sucess !", "Get Sucessfull !", 
//			[{text: "Ok", handler: function() { }}]
//		);
	setIDdefault(result.invocationResult.resultSet);
	
}

function getIDStudentsFailure(result){
	WL.SimpleDialog.show(
			"Failure !", "Get Failure !", 
			[{text: "Ok", handler: function() { }}]
		);
}
function setIDdefault(items){	
	var foo = items.length-1;
	var idvalue = items[foo].id;
	var index = idvalue.substr(3,5);
	var number = parseInt(index)+1;
	document.getElementById("txtIdAdd").value="PR0"+number;
}
// Custommer
// getCustomer
function getCustomer(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'getCustomer',
		parameters : []
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : getCustomerSuccess,
		onFailure : getCustomerFailure
	});
}

function getCustomerSuccess(result){
//	WL.SimpleDialog.show(
//			"Sucess !", "Get Sucessfull !", 
//			[{text: "Ok", handler: function() { }}]
//		);
	displayCus(result.invocationResult.resultSet);
	
}

function getCustomerFailure(result){
	WL.SimpleDialog.show(
			"Failure !", "Get Failure !", 
			[{text: "Ok", handler: function() { }}]
		);
}

function displayCus(items){
    for(var i=0;i<items.length;i++){
		var value = "<li onclick='getIDCus(this)'><a href='#updateCus' data-rel='popup' data-position-to='window' data-transition='flip'><img src='./images/customer.png'><h3 style='color: #00897B;' >"+items[i].cusname+"</h3><p><b><i>"+items[i].cusphone+"</b></i></p><span style='color:red;' class='ui-li-count'>"+items[i].cusid+"</span></a><a href='#delCustomer' data-rel='popup' data-position-to='window' data-transition='pop'></a></li>";
		$("#listCus").append(value).listview("refresh");
	}
}
// Add Customer

function addCustomer(){
	var invocationData = {
		adapter : 'Students',
		procedure : 'addCustomer',
		parameters : [$('#txtCusIDAdd').val(),$('#txtCusNameAdd').val(),$('#txtCusAddAdd').val(),$('#txtCusPhoneAdd').val()]
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : addCustomersSuccess,
		onFailure : addCustomersFailure
	});
}

function addCustomersSuccess(result){
	WL.SimpleDialog.show(
			"Add Result", "Successfull !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
	$("#popAddCus").popup('close');
	reloadListviewCus();
	resetDataAddCus()();
}

function addCustomersFailure(result){
	WL.SimpleDialog.show(
			"Add Result", "Failure !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
}	
//delete customer

function deleteCustomer(cusid){
	var invocationData = {
		adapter : 'Students',
		procedure : 'deleteCustomer',
		parameters : [cusid]
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : deleteCustomersSuccess,
		onFailure : deleteCustomersFailure
	});
}

function deleteCustomersSuccess(result){
	WL.SimpleDialog.show(
			"Delete Result", "Successfull !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
	reloadListviewCus();
}

function deleteCustomersFailure(result){
	WL.SimpleDialog.show(
			"Delete Result", "Failure !!!", 
			[{text: "Ok", handler: function() {WL.Logger.debug("First button pressed"); }}]
		);
}

function findCustomerByID(cusid){
	var invocationData = {
		adapter : 'Students',
		procedure : 'findCustomer',
		parameters : [cusid]
	};

	WL.Client.invokeProcedure(invocationData,{
		onSuccess : findCustomerByIDSuccess,
		onFailure : findCustomerByIDFailure
	});
}

function findCustomerByIDSuccess(result){
	displayFeedsFindByIDCus(result.invocationResult.resultSet);
}

function findCustomerByIDFailure(result){
}





