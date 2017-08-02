// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7Rkivt9qjfXjIXP-CjNyoEa-y5Hixr8o",
    authDomain: "train-scheduler-df441.firebaseapp.com",
    databaseURL: "https://train-scheduler-df441.firebaseio.com",
    projectId: "train-scheduler-df441",
    storageBucket: "",
    messagingSenderId: "203828314975"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
  var mo_worked;
  var billed;


$(document).on("click","#submit-search-info",function(event){
	event.preventDefault();

	//console.log("Clicked!");

	var name = $("#train-name").val();
	var destination = $("#destination").val();
	var first train = $("#first-train-time").val();
	var frequency = $("#frequency").val();

	var date_format = new Date(date);
	var today = new Date();

	mo_worked = (today.getMonth()+1) - (date_format.getMonth()+1);

	billed = mo_worked * rate;

	database.ref().push({

		name: name,
		role: role,
		rate: rate,
		date: date,
		dataAdded: firebase.database.ServerValue.TIMESTAMP

	});//end of ref.push

});

database.ref().on("child_added",function(childSnap){

		var date_format = new Date(childSnap.val().date);
		var today = new Date();

		mo_worked = (today.getMonth()+1) - (date_format.getMonth()+1);

		billed = mo_worked * childSnap.val().rate;

		var new_row = $("<tr>");
		new_row.append("<td>" + childSnap.val().name + "</td>"
		+ "<td>" + childSnap.val().role + "</td>"
		+ "<td>" + childSnap.val().date + "</td>"
		+ "<td>" + mo_worked + "</td>"
		+ "<td>" + childSnap.val().rate + "</td>"
		+ "<td>" + billed + "</td>");

		$("tbody").append(new_row);

});