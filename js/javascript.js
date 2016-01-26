//global variables
var canvas;
var canvasContext;

var currentState;
var cpuPokemon;
var userPokemon;

var wildPokHealth = 100;

var endBattle = false;
var startBattle = false;
var winBattle = false;


var grass1 = document.getElementById("grass1");
var grass1Location = grass1.getBoundingClientRect();

var grass2 = document.getElementById("grass2");
var grass2Location = grass2.getBoundingClientRect();

var grass3 = document.getElementById("grass3");
var grass3Location = grass3.getBoundingClientRect();

//background music
var pokeBattle = document.createElement("audio");
pokeBattle.src = "soundsFx/battle_wild_pokemon.mp3";
pokeBattle.volume = 0.7;
pokeBattle.autoplay = false;
pokeBattle.preLoad = true;
pokeBattle.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
pokeBattle.pause();
window.onload = function(){
    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.fillStyle = "#78AB46";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    move();

}
function wildGrass1(){
    if(trainerX >= (grass1Location.left + 5) && trainerX <= (grass1Location.left + (grass1Location.width * 2) - 5)){
        if(trainerY >= (grass1Location.top + 5) && trainerY <= (grass1Location.top + grass1Location.height - 5)){
            $("#trainer").fadeOut(2000);
            $("#background").fadeOut(3000);
            pokeBattle.play();
            $("#main-container").fadeIn("slow");
        }
    }
}
function wildGrass2(){
    if(trainerX >= (grass2Location.left + 5) && trainerX <= (grass2Location.left + (grass2Location.width * 2) - 5)){
        if(trainerY >= (grass2Location.top + 5) && trainerY <= (grass2Location.top + grass2Location.height - 5)){
            startBattle = true;
            $("#trainer").fadeOut(2000);
            $("#background").fadeOut(3000);
            pokeBattle.play();
            $("#main-container").fadeIn("slow");
        }
    }
}
function wildGrass3(){
    if(trainerX >= (grass3Location.left + 5) && trainerX <= grass3Location.left + (grass3Location.width - 5)){
        if(trainerY >= (grass3Location.top + 5) && trainerY <= (grass3Location.top + grass3Location.height - 5)){
            startBattle = true;

            $("#trainer").fadeOut(2000);
            $("#background").fadeOut(3000);
            pokeBattle.play();
            $("#main-container").fadeIn("slow");
        }
    }
}
//conditions that must be met for battle to start
function move(){
    $(this).keydown(function(e){
    if(e.which == 37){
        $('#trainer').stop(true).animate({left: '-=20px'});
        wildPokemon = Math.floor(Math.random() * 3);
    }
    else if(e.which == 38){
        $('#trainer').stop(true).animate({top: '-=20px'});

    }
    else if(e.which == 39){
        $('#trainer').stop(true).animate({left: '+=20px'});
        wildPokemon = Math.floor(Math.random() * 3);
    }
    else if(e.which == 40){
        $('#trainer').stop(true).animate({top: '+=20px'});

    }
    trainer = document.getElementById("trainer");
    trainerLocation = trainer.getBoundingClientRect();
    trainerX = trainerLocation.left;
    trainerY = trainerLocation.top;
    if(wildPokemon == 1){
    if(winBattle == true){
        setTimeout(wildGrass1, 4000);
    }
    else{
        wildGrass1();
        wildGrass2();
        wildGrass3();
    }
    }
    console.log(wildPokemon);
});
}
//pokemon objects
//user pokemon
var charmander = {
    name: "Charmander",
    health: 100,
    lvl: 6,
    physAttack: 25,
    specAttack: 25,
    physDefence: 32,
    specDefence: 35,
    xp: 0,
    speed: 40,
    moves: [{
        name:"ember",
        type: "special",
        power: 25,
        accuracy: 1,
        PP: 25,
        criticalChance: 0.15 
    },
        {
        name:"tackle",
        type: "physical",
        power: 20,
        accuracy: 1,
        PP: 25,
        criticalChance: 0.1
    },
        {
        name:"growl",
        type: "status",
        power: 0.9,
        accuracy: 0.8,
        PP: 40,
        criticalChance: -1
    },
    {
        name:"scratch",
        type: "physical",
        power: 35,
        accuracy: 1,
        PP: 30,
        criticalChance: 0.9
    }]
};
//enemy/wild pokemon
var pikachu = {
    name: "Pikachu",
    lvl: 8,
    physDefence: 40,
    specDefence: 28,
    physAttack: 32,
    specAttack: 37,
    speed: 50,
    moves: [
    {
        name:"thunder-shock",
        type: "special",
        power: 30,
        accuracy: 0.8,
        PP: 15,
        criticalChance: 0.15
    },
    {
        name:"tackle",
        type: "physical",
        power: 20,
        accuracy: 1,
        PP: 25,
        criticalChance: 0.1
    },
    {
        name:"tail whip",
        type: "status",
        power: 0.85,
        accuracy: 0.9,
        PP: 10,
        criticalChance: -1
    },
    {
        name:"scratch",
        type: "physical",
        power: 35,
        accuracy: 0.5,
        PP: 30,
        criticalChance: 0.4
    }]
};

//cpu ai and its course of action during its turn
var cpuTurn = {
    play: function () {            

        var randomMove = Math.floor(Math.random() * 4);
        var currentCPUMove = cpuPokemon.moves[randomMove];

        var setUpCPUField = function () {
            if(startBattle == false){
                $("#chat-text").text("A wild " + cpuPokemon.name + " appeared!");
                setTimeout(attackAnimation, 9200);
            }
            else{
                setTimeout(attackAnimation, 1300);
            }
            startBattle = true;
        };

        var attackAnimation = function () {
            console.log(startBattle);
            $(".pika").animate({
                top: "-=1em",
            }, 250, function() {
                $(".pika").animate({
                top: "+=1em",
            }, 250)
            });
            getAccuracy();

        };
        var getAccuracy = function(){
            var setAccuracy = Math.random();
            if (setAccuracy <= currentCPUMove.accuracy){
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
                if(currentCPUMove.name == "tail whip"){
                    $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!" + " " + userPokemon.name + "'s defence was lowered!");
                }
                getMoveType();
            }
            else{
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + ", but it missed.");
                var ma = document.createElement("audio");                
                ma.src="soundsFx/missAttk.mp3";
                ma.volume=0.70;
                ma.autoPlay=false;
                ma.preLoad=true;       
                ma.play();
                currentState = playerTurn;
                setTimeout(loop, 1500)
            }
        };
        var getMoveType = function(){
            showMoveAnimation();
            var obj = document.createElement("audio");
            if(currentCPUMove.type == "physical"){
                    obj.src="soundsFx/attack.mp3";
                    obj.volume=0.70;
                    obj.autoPlay=false;
                    obj.preLoad=true;
                    obj.play();    
                setTimeout(attackingMove, 1500);    
            }
            else if(currentCPUMove.type == "special"){
                    obj.src="soundsFx/attack.mp3";
                    obj.volume=0.70;
                    obj.autoPlay=false;
                    obj.preLoad=true;
                    obj.play();    
                setTimeout(attackingMove, 1500);
            }
            else if(currentCPUMove.type == "status"){
                     obj.src="soundsFx/statuseffectFx.mp3";
                     obj.volume=0.70;
                     obj.autoPlay=false;
                     obj.preLoad=true;       
                     obj.play();
                setTimeout(defensiveMove, 1500);
            }
        };
        var showMoveAnimation = function () {
            $("#attack-img").addClass("cpu-attack");
            $("#attack-img").removeClass("hide");
            $("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
        };
        var attackingMove = function(){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack");
            var criticalStrike = Math.random();
            if((currentCPUMove.criticalChance/5) < criticalStrike || currentCPUMove.criticalChance == -1){
                if(currentCPUMove.type == "physical"){
                userPokemon.health -= (currentCPUMove.power + (currentCPUMove.power * (cpuPokemon.physAttack/100))) - ((userPokemon.physDefence / 100) * currentCPUMove.power);
                }
                else if(currentCPUMove.type == "special"){
                userPokemon.health -= (currentCPUMove.power + (currentCPUMove.power * (cpuPokemon.specAttack/100))) - ((userPokemon.specDefence / 100) * currentCPUMove.power);
                }
                $("#user-health-bar").css("width", userPokemon.health + "%");
                $("#user-health-bar").text("100/" + Math.ceil(userPokemon.health));
                if(userPokemon.health <= 0){
                    $("#user-health-bar").text("100/0");
                }   
                currentState = playerTurn;
                loop();
        }
        else{
            if (currentCPUMove.type == "physical"){
                userPokemon.health -= ((currentCPUMove.power * 2) + (currentCPUMove.power * (cpuPokemon.physAttack/100))) - ((userPokemon.physDefence / 100) * currentCPUMove.power);
            }
            else if(currentCPUMove.type == "special")
            {
                userPokemon.health -= ((currentCPUMove.power * 2) + (currentCPUMove.power * (cpuPokemon.specAttack/100))) - ((userPokemon.physDefence / 100) * currentCPUMove.power);
            }
            $("#chat-text").text("The enemy " + cpuPokemon.name + " critically hit!!!");
            $("#user-health-bar").css("width", userPokemon.health + "%");
            $("#user-health-bar").text("100/" + Math.ceil(userPokemon.health));
            if(userPokemon.health <= 0){
                $("#user-health-bar").text("100/0");
            }   
            currentState = playerTurn;
            loop();
        }
    };
        var defensiveMove = function (){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack");
            userPokemon.physDefence -= (currentCPUMove.power * 10);
            currentState = playerTurn;
            loop();
        };
        setUpCPUField();
    }
};
//player turn, choosing what action to take
var playerTurn = {
    play: function(){
        var currentUserMove;
        var setUpUserField = function () {

            var moveButtons = [".move1-text", ".move2-text", ".move3-text", ".move4-text"];
            $(".user-buttons").removeClass("hide");

            $("#chat-text").text("What will " + userPokemon.name + " do?");
            
            for(var i = moveButtons.length - 1; i >= 0; i--){
                $(moveButtons[i]).text(userPokemon.moves[i].name);
            };
        };

        var prepareToAttack = function () {
            $(".user-buttons").addClass("hide")
            $(".charmander").animate({
                left: "+=1em",
            }, 250, function() {
                $(".charmander").animate({
                left: "-=1em",
            }, 250)
            });
            getAccuracy();

        };
        var getAccuracy = function(){
            var setAccuracy = Math.random();
            if (setAccuracy <= currentUserMove.accuracy){
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
                if(currentUserMove.name == "tail whip"){
                    $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!" + " " + cpuPokemon.name + "'s defence was lowered!");
                if(cpuPokemon.name.length >= 8){
                    cpuPokemon.name = cpuPokemon.name.substring(0,4).toUpperCase();
                     $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!" + " " + cpuPokemon.name + "'s defence was lowered!");
                }
                }
                getMoveType();
            }
            else{
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + ", but it missed.");
                var ma = document.createElement("audio");
                ma.src="soundsFx/missAttk.mp3";
                ma.volume=0.70;
                ma.autoPlay=false;
                ma.preLoad=true;       
                ma.play();
                currentState = cpuTurn;
                setTimeout(loop, 1500)
            }
        };
         var getMoveType = function(){
            showMoveAnimation();
            var obj = document.createElement("audio");   
            if(currentUserMove.type == "physical"){
                    obj.src="soundsFx/attack.mp3";
                    obj.volume=0.70;
                    obj.autoPlay=false;
                    obj.preLoad=true;           
                    $(document).on('click', '.playSound', function() {
                    obj.play();
            });
                setTimeout(attackingMove, 1500);    
            }
            else if(currentUserMove.type == "special"){
            obj.src="soundsFx/scratch.mp3";
            obj.volume=0.70;
            obj.autoPlay=false;
            obj.preLoad=true;      
            $(document).on('click', '.playSoundSA', function() {
                obj.play();
            });                
            setTimeout(attackingMove, 1500);
            }
            else if(currentUserMove.type == "status"){
            obj.src="soundsFx/statuseffectFx.mp3";
            obj.volume=0.70;
            obj.autoPlay=false;
            obj.preLoad=true;       
            obj.play();
            $(document).on('click', '.playSoundSE', function() {
                obj.play();
            });
                setTimeout(statusMove, 1500);
            }
        };
        var showMoveAnimation = function () {
            $("#attack-img").addClass("user-attack");
            $("#attack-img").removeClass("hide");
            $("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
        };
        var attackingMove = function(){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack");
            var criticalStrike = Math.random();
            if(currentUserMove.criticalChance < criticalStrike || currentUserMove.criticalChance == -1){
                if(currentUserMove.type == "physical"){
                wildPokHealth -= (currentUserMove.power + (currentUserMove.power * (userPokemon.physAttack/100))) - ((cpuPokemon.physDefence /100) * currentUserMove.power);
                }
                else if(currentUserMove.type == "special"){
                wildPokHealth -= (currentUserMove.power + (currentUserMove.power * (userPokemon.specAttack/100))) - ((cpuPokemon.specDefence /100) * currentUserMove.power);
                }
                $("#enemy-health-bar").css("width", wildPokHealth + "%");
                currentState = cpuTurn;
                loop();
        }
        else{
            if(currentUserMove.type == "physical"){
            wildPokHealth -= ((currentUserMove.power * 2) + (currentUserMove.power * (userPokemon.physAttack/100))) - ((cpuPokemon.physDefence /100) * currentUserMove.power);
            }
            else if(currentUserMove.type == "special"){
            wildPokHealth -= ((currentUserMove.power * 2) + (currentUserMove.power * (userPokemon.specAttack/100))) - ((cpuPokemon.specDefence /100) * currentUserMove.power);
            }
            $("#chat-text").text("Your " + userPokemon.name + " critically hit!!!");
            $("#enemy-health-bar").css("width", wildPokHealth + "%");
            currentState = cpuTurn;
            loop();

        }
    };
        var statusMove = function (){
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack");
            if(cpuPokemon.physAttack == -81){
                currentUserMove.power = 0;
            }
            else{
            cpuPokemon.physAttack -= (currentUserMove.power * 10);
            }
            currentState = cpuTurn;
            loop();
        };
        $(".move1-button, .move2-button, .move3-button, .move4-button").unbind().click(function (){
            var move = $(this).attr("value");
            currentUserMove = userPokemon.moves[move];
            prepareToAttack();
        });
        setUpUserField();
    }
};

//function that keep shte battle going if none of the pokemonshave reached 0 hp yet
var loop = function(){
    if(userPokemon.health <= 0){
        endBattle = true;
        if(endBattle){
        pokeBattle.pause();
        $("#main-container").addClass("hide")
        $("#gameover").removeClass("hide");
    }
    }
    else if(wildPokHealth <= 0){
        endBattle = true;
        if(endBattle){
        userPokemon.xp += 50;
        winBattle = true;
        console.log(userPokemon.xp);
        $("#trainer").fadeIn(3000);
        $("#background").fadeIn(3000);
        $("#main-container").fadeOut(4000);
        $("#win-battle").removeClass("hide");
        pokeBattle.pause();
    }
    }
    else{
        currentState.play();
    }
};

function newWild(){
    if(winBattle == true){
        wildPokHealth = 100;
    }
    winBattle = false;
}
//function that sets the stage
var init = function(){
    cpuPokemon = pikachu;
    userPokemon = charmander;
    $("#user-health-bar").text("100/" + userPokemon.health);   
    $(".user-pokemon-name").text(userPokemon.name);
    $(".enemy-pokemon-name").text(cpuPokemon.name);
    $(".user-pokemon-lvl").text("Lv" + userPokemon.lvl);
    $(".enemy-pokemon-lvl").text("Lv" + cpuPokemon.lvl);
    $("#lose-battle").text("Your " + userPokemon.name + " has fainted. You quickly run away to the Pokemon Center...");
    $("#win-battle").text("The enemy " + cpuPokemon.name + " fainted. You win the battle!");    
    if(userPokemon.speed > cpuPokemon.speed){
        currentState = playerTurn;
    }
    else{
        currentState = cpuTurn;
    }
    loop();
    console.log(wildPokHealth);
};
init();
