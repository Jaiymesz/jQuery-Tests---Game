$(function() {

    var levels = {
        0:"red",
        1:"blue",
        2:"green",
        3:"yellow",
        4:"silver"
    };
    
    var currentLevel = 0;
    var highscore = 0;
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
        4:"You died! You've lost your pot now.",
        5:"So close, but you can't continue just yet..",
        6:"Woah, you almost died! Lucky you.",
        7:"You almooooost got the jackpot, but just missed it. Doh!",
        8:"YAY! You got the 1,000,000 JACKPOT! You banked ",
        9:"You've banked yourself ",
    };
    
    function randomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showDice(colour, type, commentary){
        if(type=='continue' && colour=='silver')type='jackpot';
        $("#dice, #commentary").fadeOut(function(){
            $("#dice").attr("src","../dice/" + colour + "-" + type + ".gif");
            $("#commentary").html(commentary);
            $("#quit").html("Stop Playing and Take "+pot+" Points");
            $("#dice, #commentary").fadeIn(function(){                
                $("#roll").removeAttr("disabled");
            });
        });
    }

    function calculatePoints(){
        let min = 1;
        let max = 10;
        if(currentLevel>0){
            for(let i=1; i<Object.keys(levels).length; i++){
                max = max * 2;
                if(currentLevel==i)break;
            }
            min = max/2;
        }
        return randomNumber(min, max);
    }

    function endGame(){
        if(pot>highscore){
            highscore = pot;
            localStorage.setItem("highscore",highscore);
            $("#highscore p").html("Your current highscore is "+highscore+" points.");
        }
        pot = 0;
        currentLevel = 0;
    }
    
    $("#roll").on("click",function(){
        let roll = randomNumber(0,4);
        $("#roll").attr("disabled",1);
        if(diceTypes[roll]=="win"){
            let points = calculatePoints();
            pot += points;
           showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[roll]+points+" Points!");
        }else if(diceTypes[roll]=="lose"){
            let points = calculatePoints();
            pot -= points;
            if(pot<0)pot=0;
            showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[roll]+points+" Points!");
        }else if(diceTypes[roll]=="continue"){
            if(currentLevel<4){
                if(randomNumber(1,3)==3){
                    showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[roll]);
                    currentLevel++;
                }else{                    
                    showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[5]);
                }
            }else{
                if(randomNumber(1,5)==4){
                    pot += 1000000;
                    showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[8]+pot+" Points!");
                    endGame();
                }else{
                    showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[7]);
                }
            }
        }else if(diceTypes[roll]=="death"){
            if(randomNumber(1,2)==1){
                pot = 0;
                showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[roll]);
                currentLevel = 0;
            }else showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[6]);
        }else showDice(levels[currentLevel], diceTypes[roll], typesToCommentary[roll]);
        
    });

    $("#quit").on("click",function(){
        showDice("red","nothing", typesToCommentary[9]+pot+" Points! Game is over.");
        endGame();
    })

    // Check highscore from Local Storage
    highscore = (localStorage.getItem("highscore")>0)?localStorage.getItem("highscore"):0;
    if(highscore>0)$("#highscore p").html("Your current highscore is "+highscore+" points.");
});
