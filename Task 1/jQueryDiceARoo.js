$(function() {

    var diceTypes = {
        "0":"lose",
        "1":"win",
        "2":"nothing",
        "3":"continue",
        "4":"death"
    };
    
    var typesToCommentary = {
        "0":"Oops! You lost points.",
        "1":"Yay! You won points.",
        "2":"Ahh.. nothing happened.",
        "3":"You can go to the next level, woohoo!",
        "4":"You died! You've lost your pot now."
    };
    
    function randomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    $("#roll").on("click",function(){
        let roll = randomNumber(0,4);
        $("#dice").attr("src","../dice/red-" + diceTypes[roll] + ".gif");
        $("#commentary").html(typesToCommentary[roll]);
    })
});
