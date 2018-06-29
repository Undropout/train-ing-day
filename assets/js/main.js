

var config = {
apiKey: config.apiKey_2,
authDomain: config.authDomain_2,
databaseURL: config.databaseURL_2,
storageBucket: config.storageBucket_2,
messagingSenderId: config.messagingSenderId_2
};

console.log(config);
firebase.initializeApp(config);

var database = firebase.database();

var timeNow;

database.ref().on("child_added", function (snapshot) {



var firstTrain = moment(snapshot.val().firstTrain, 'HH:mm').format('X');
console.log("unix time is for 'FirstTrain' is " + firstTrain);
console.log("All I did was make a moment function into the firstTrain variable and convert it to unix time.")

var frequency = snapshot.val().frequency;
console.log("Then I grabbed the frequency variable, which is " + frequency + ", and put it in a variable of the same name.");

var difference = moment().diff(moment.unix(firstTrain), "minutes");
console.log("I did subtraction: the current time minus the first train, and got" + difference);

var timeLeft = moment().diff(moment.unix(firstTrain), 'minutes') % frequency;
console.log("So then I need number of times the train has shown up so far, and I did that by calculating the difference between the first train and now then getting the modulus of the frequency. That gave me: " + timeLeft)

var mins = moment(frequency - timeLeft, "mm").format('mm');
console.log("So how many minutes are left till the next train? " + mins)

var nextTrain = moment().add(mins, "m").format("hh:mm A");
console.log("And when I add that time in to the current time I get how many minutes there are till the next train, which is: " + nextTrain);

console.log("and then it was after 1am and nothing was working so I needed to stop with the imaginary math")

var newRow = $('<tr>');

var newName = $('<td>');
var newDestination = $('<td>');
var newFrequency = $('<td>');
var newNextArrival = $('<td>');
var newMinutes = $('<td>');

newName.html(snapshot.val().trainName);
newDestination.html(snapshot.val().destination);
newFrequency.html(snapshot.val().frequency);
newNextArrival.html(nextTrain);
newMinutes.html(mins);

newRow.append(newName);
newRow.append(newDestination);
newRow.append(newFrequency);
newRow.append(newNextArrival);
newRow.append(newMinutes);


$('tbody').append(newRow);

});

$('#submitNewTrain').on("click", function (e) {
e.preventDefault();


var inputTrain = $('#newTrainName').val();
var inputDestination = $('#newDestination').val();
var inputFirstTrain = moment($('#newFirstTrain').val().trim(), 'hh:mm a').format('HH:mm');
var inputFrequency = $('#newFrequency').val().trim();
console.log("The first train in 24-hour time is" + inputFirstTrain);


if(inputTrain.length > 0 && inputDestination.length > 0 && inputFirstTrain.length > 0 && inputFrequency.length > 0) {
database.ref().push({
    trainName: inputTrain,
    destination: inputDestination,
    firstTrain: inputFirstTrain,
    frequency: inputFrequency
});
}

$("#newTrainName").val("");
$("#newDestination").val("");
$("#newFirstTrain").val("");
$("#newFrequency").val("");

});

