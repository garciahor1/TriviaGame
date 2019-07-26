//https://opentdb.com/api.php?amount=20

//https://opentdb.com/api.php?amount=20&type=multiple

//https://opentdb.com/api.php?amount=20&category=20&type=multiple


//category=20 mythology  
//category=21 sport
//category=30 science gadgets
//correct_answer

let numberOfQuestions=19;
let category = 21;
let answerNumber;



$(".firstContainerButton").on("click", function () {
    category = $(this).attr("data-type");
    console.log(category);
    $(".firstContainerButton").css("background-color","");
    $(this).css("background-color","lightblue");

});
$(".secondContainerButton").on("click", function () {

  numberOfQuestions = $(this).attr("value");
  console.log(numberOfQuestions);
  $(".secondContainerButton").css("background-color","");
    $(this).css("background-color","lightblue");


});

$(".thirdContainerButton").on("click", function () {
    $("#firstContainer").css("display", "none");
    $("#secondContainer").css("visibility", "visible");
    

//selection(numberOfQuestions,category);
//function selection(numberOfQuestions, category) {
    
    var queryURL = "https://opentdb.com/api.php?amount="+numberOfQuestions+"&category="+category+"&type=multiple"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        let array = [];
        let count = 0;
        while (count < 3) {
            let me = Math.floor(Math.random() * 4);
            if (array.includes(me) === false) {
                array.push(me);
                count++;
                console.log(me + "this is the count " + count);
            }
        };

        
        for (let x = 0; x < array.length+1; x++) {
            if (array.includes(x) === false) {
                answerNumber = x;
                console.log("A = "+answerNumber);
            };
        };

        $(".displayQuestion").append(response.results[0].question);
        $(".displayAnswer" + answerNumber).append(response.results[0].correct_answer);
        $(".displayAnswer" + array[0]).append(response.results[0].incorrect_answers[0]);
        $(".displayAnswer" + array[1]).append(response.results[0].incorrect_answers[1]);
        $(".displayAnswer" + array[2]).append(response.results[0].incorrect_answers[2]);

    });
//};

})

