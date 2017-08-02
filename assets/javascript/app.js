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
  var nextarrival;
  var minaway;


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
		destination: destination,
		firsttrain: firsttrain,
		frequency: frequency,
		dataAdded: firebase.database.ServerValue.TIMESTAMP

});//end of ref.push

});