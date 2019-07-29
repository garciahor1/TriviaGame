//https://opentdb.com/api.php?amount=20

//https://opentdb.com/api.php?amount=20&type=multiple

//https://opentdb.com/api.php?amount=20&category=20&type=multiple

//category=20 mythology  
//category=21 sport
//category=30 science 
//correct_answer

let numberOfQuestions = 20;
let category = 20;
let answerNumber;
let userAnswer = null;
let correctQuestions = 0;
let wrongQuestions = 0;
let questionIndex = 0;
let hasAnswer = false;
let notAnswered = 0;
let overAllTime;
let intervalId;

def();
function def() {
    $("#displayDeff").append("Default options")
    $("#displayCategory").append("Mythology");
    $("#displayNOQ").append(numberOfQuestions);
};

$(".firstContainerButton").on("click", function () {
    $(".firstContainerButton").css("background-color", "");
    $(this).css("background-color", "lightblue");
    category = $(this).attr("data-type");
    $("#displayCategory").empty();
    $("#displayCategory").append($(this).attr("value"))
    $("#displayDeff").empty()
    $("#displayDeff").append("You have Chosen:");
    console.log("firstContainerButton clicked= " + category);
});

$(".secondContainerButton").on("click", function () {
    $("#displayDeff").empty()
    $("#displayDeff").append("You have Chosen:")
    $(".secondContainerButton").css("background-color", "");
    $(this).css("background-color", "lightblue");
    numberOfQuestions = $(this).attr("value");
    console.log("NOQ= " + numberOfQuestions);
    $("#displayNOQ").empty();
    $("#displayNOQ").append(numberOfQuestions);
});

$(".thirdContainerButton").on("click", function () {
    $("#firstContainer").css("display", "none");
    $("#secondContainer").css("display", "block");
    $(".thirdContainerButton").css("background-color", "");
    $(this).css("background-color", "lightblue");
    console.log("thirdContainerButton clicked");
    console.log("number of questions " + numberOfQuestions);
    console.log("category on click= " + category)
    setGamePer();
    console.log("number of questions = " + numberOfQuestions);
    console.log("category = " + category);
    console.log("answernumber = " + answerNumber);
    console.log("useranswer = " + userAnswer);
    console.log("correctquestions = " + correctQuestions);
    console.log("wrongquestions = " + wrongQuestions);
    console.log("questionsindex = " + questionIndex);
    console.log("hasanswer = " + hasAnswer);
    console.log("notanswered = " + notAnswered);

});

$('.answers').unbind('click').click(function () {
    //$(".answers").on("click", function () {
    $(".answers").css("background-color", "");
    $(this).css("background-color", "lightblue");
    userAnswer = $(this).attr("value")
    console.log("userAnswer= " + userAnswer);
    hasAnswer = true;
});

$('#finished').unbind('click').click(function () {
    //$("#finished").on("click", function () {
    $("#secondContainer").css("display", "none");
    $("#thirdContainer").css("display", "none");
    $("#firstContainer").css("display", "block");
    numberOfQuestions = 20;
    category = 20;
    answerNumber;
    userAnswer = null;
    correctQuestions = 0;
    wrongQuestions = 0;
    questionIndex = 0;
    hasAnswer = false;
    notAnswered = 0;
    $("#numberOfQiestions").empty();
    $("#correct").empty();
    $("#incorrect").empty();
    $("#didntAnswer").empty();
    $("#answered").empty();
    $("#score").empty();
    $(".firstContainerButton").css("background-color", "");
    $(".secondContainerButton").css("background-color", "");
    $(".thirdContainerButton").css("background-color", "");
    $(".answers").css("background-color", "");
    $("#submitButton").css("background-color", "");
    console.log("number of questions = " + numberOfQuestions);
    console.log("category = " + category);
    console.log("answernumber = " + answerNumber);
    console.log("useranswer = " + userAnswer);
    console.log("correctquestions = " + correctQuestions);
    console.log("wrongquestions = " + wrongQuestions);
    console.log("questionsindex = " + questionIndex);
    console.log("hasanswer = " + hasAnswer);
    console.log("notanswered = " + notAnswered);
    $("#displayDeff").empty()
    $("#displayCategory").empty();
    $("#displayNOQ").empty();
    def();
});

function setGamePer() {
    var queryURL = "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&category=" + category + "&type=multiple"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        randomAnswerGen();
        startTime();
        
        function startTime() {
            overAllTime=20;
            intervalId = setInterval(decrement, 1000);
        };

        $('#submitButton').unbind('click').click(function () {
            nextQuestion();
        });

            function decrement() {
            overAllTime--;
            $("#displayTimer").html("<h2>" + overAllTime + "</h2>");
            if (overAllTime == 0) {
                stop();
                nextQuestion();
            }
        };
        function stop() {
            clearInterval(intervalId);
        }

        function nextQuestion() {
            questionIndex = questionIndex + 1;
            console.log("This is the count at the inded submitbutton= " + questionIndex)
            if (hasAnswer == false) {
                notAnswered++;
            };
            console.log("questionIndex= " + questionIndex);

            $("#submitButton").css("background-color", "");
            $(this).css("background-color", "lightblue");
            if (userAnswer == answerNumber) {
                correctQuestions++;
                console.log("correct answer= " + correctQuestions);
            };
            if (userAnswer != answerNumber) {
                wrongQuestions++;
                console.log("wrong answer=" + wrongQuestions);
            };
            if (questionIndex == numberOfQuestions) {
                $("#firstContainer").css("display", "none");
                $("#secondContainer").css("display", "none");
                $("#thirdContainer").css("display", "block");
                $("#numberOfQiestions").append(numberOfQuestions);
                $("#correct").append(correctQuestions);
                $("#incorrect").append(wrongQuestions)
                $("#didntAnswer").append(notAnswered)
                $("#answered").append(numberOfQuestions - notAnswered)
                $("#score").append((correctQuestions / numberOfQuestions) * 100)
                stop();
            };
            hasAnswer = false;
            userAnswer = null;
            answerNumber = null;
            console.log("userAnswer and answerNumber cleared");
            $("#submitButton").css("background-color", "");
            $(".answers").css("background-color", "");

            if (questionIndex < numberOfQuestions) {
                randomAnswerGen();
                stop();
                startTime();
            };
        };

        function randomAnswerGen() {
            let array = [];
            let count = 0;
            while (count < 3) {
                let me = Math.floor(Math.random() * 4);
                if (array.includes(me) === false) {
                    array.push(me);
                    count++;
                }
            };
            for (let x = 0; x < array.length + 1; x++) {
                if (array.includes(x) === false) {
                    answerNumber = x;
                    console.log("Answer = " + answerNumber);
                };
            };
            $(".displayQuestion").empty();
            $(".displayQuestion").append(response.results[questionIndex].question);

            $("#displayAnswer" + answerNumber).empty();
            $("#displayAnswer" + answerNumber).append(response.results[questionIndex].correct_answer);

            $("#displayAnswer" + array[0]).empty();
            $("#displayAnswer" + array[0]).append(response.results[questionIndex].incorrect_answers[0]);

            $("#displayAnswer" + array[1]).empty();
            $("#displayAnswer" + array[1]).append(response.results[questionIndex].incorrect_answers[1]);

            $("#displayAnswer" + array[2]).empty();
            $("#displayAnswer" + array[2]).append(response.results[questionIndex].incorrect_answers[2]);
        }

    });
};
