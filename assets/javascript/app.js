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
  var nextArrival;
  var minAway;


$(document).on("click","#submit-search-info",function(event){
	event.preventDefault();

var name = $("#train-name").val();
var destination = $("#destination").val();
var firsttrain = $("#first-train-time").val();
var frequency = $("#frequency").val();

var date_format = new Date();
var today = new Date();

database.ref().push({

		name: name,
		firsttrain: firsttrain,
		destination: destination,
		frequency: frequency,
		dataAdded: firebase.database.ServerValue.TIMESTAMP

});//end of ref.push

});

database.ref().on("child_added",function(childSnap){

        var firstTimeConverted = moment(childSnap.val().firsttrain, "hh:mm").subtract(1, "years");
        var currenTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        var tRemainder = diffTime % childSnap.val().frequency;
        console.log(tRemainder);
        var minAway = childSnap.val().frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minAway);
        var nextTrain = moment().add(minAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



        var new_row = $("<tr>");
		new_row.append("<td>" + childSnap.val().name + "</td>"
        + "<td>" + childSnap.val().destination + "</td>"
        + "<td>" + childSnap.val().frequency + "</td>"
        + "<td>" + moment.unix(nextTrain).format('hh:mm:ss') + "</td>"
        + "<td>" + minAway + "</td>")
        $("tbody").append(new_row);

});

    
