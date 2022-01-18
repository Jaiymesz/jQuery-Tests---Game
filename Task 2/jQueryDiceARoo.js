$(function() {

    var levels = {
        0:"red",
        1:"blue",
        2:"green",
        3:"yellow",
        4:"silver"
    };
    
    var currentLevel = 0;
    var pot = 0;

    var diceTypes = {
        0:"lose",
        1:"win",
        2:"nothing",
        3:"continue",
        4:"death"
    };
    
    var typesToCommentary = {
        0:"Oops! You lost ",
        1:"Yay! You won ",
        2:"Ahh.. nothing happened.",
        3:"You can go to the next level, woohoo!",
        4:"You died! You've lost your pot now."
    };
    
    function randomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showDice(colour, type){
        $("#dice").attr("src","../dice/" + colour + "-" + type + ".gif");
    }

    function calculatePoints(){
        let min = 1;
        let max = 10;
        return randomNumber(min, max);
    }
    
    $("#roll").on("click",function(){
        let roll = randomNumber(0,4);
        showDice("red", diceTypes[roll]);

        if(diceTypes[roll]=="win"){
            let points = calculatePoints();
            pot += points;
            $("#commentary").html(typesToCommentary[roll]+points+" Points!");
        }else if(diceTypes[roll]=="lose"){
            let points = calculatePoints();
            pot -= points;
            if(pot<0)pot=0;
            $("#commentary").html(typesToCommentary[roll]+points+" Points!");
        }else $("#commentary").html(typesToCommentary[roll]);
        
        $("#quit").html("Stop Playing and Take "+pot+" Points")
    })
});
