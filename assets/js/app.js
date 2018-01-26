 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGwnWcN42GY8OR2UjNEI0ypLy7GGhC_2k",
    authDomain: "train-app-4604b.firebaseapp.com",
    databaseURL: "https://train-app-4604b.firebaseio.com",
    projectId: "train-app-4604b",
    storageBucket: "train-app-4604b.appspot.com",
    messagingSenderId: "866040322690"
  };
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFTime = $("#first-time-input").val().trim();
  var trainFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    firsttime: trainFTime,
    frequency: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firsttime);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#freq-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFTime = childSnapshot.val().firsttime;
  var trainFreq = childSnapshot.val().frequency;
	
  var fTimeMoment = moment(trainFTime, "HH:mm");
  	//console.log("entered: " + fTimeMoment);  
  var currentTime = moment();
  	//console.log("real: " + currentTime);
  var timeDiff = currentTime.diff(fTimeMoment, 'minutes');
  	//console.log("difference: " + timeDiff);
  var timeRemain = timeDiff % trainFreq;
    //console.log("Mins apart: " + timeRemain);
  var minsToArrival = trainFreq - timeRemain;
	//console.log("Mins til arrival: " + minsToArrival);
  var nextTrain = currentTime.add(minsToArrival, 'minutes');
    //console.log("Next Train: " + nextTrain);
  var nextArrivalTime = nextTrain.format("hh:mm"); 
    //console.log("Arrival Time: " + nextArrivalTime);
  
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextArrivalTime +  "</td><td>" + minsToArrival +"</td></tr>");
  
});
