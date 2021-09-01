const pfad = "./deck/";
let deck = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152];
let ablage = [];
let bildcounter;
let score = 0;
let kartenwert = 0;

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    // Die dataTransfer.setData() Methode legt den Datentypen und
    // den Wert der gedraggeten Data fest 
    ev.dataTransfer.setData("text", ev.target.id);
}
function flip(data) {
    document.getElementById(data).style.animationName = "rotieren";
    document.getElementById(data).style.webkitAnimationDuration = "0.2s";
    document.getElementById(data).style.animationTimingFunction = "linear";  
}
function setKartenwert(kartenId) {
    // Legt die Variable kartenwert mittels der kartenId fest.
    switch(kartenId) {
            //Ass
            case 101:
            case 114:
            case 127:
            case 140:
                kartenwert = 11;
                break;

            // 2
            case 102:
            case 115:
            case 128:
            case 141:
                kartenwert = 2;
                break;

            // 3
            case 103:
            case 116:
            case 129:
            case 142:
                kartenwert = 3;
                break;

            // 4
            case 104:
            case 117:
            case 130:
            case 143:
                kartenwert = 4;
                break;

            // 5
            case 105:
            case 118:
            case 131:
            case 144:
                kartenwert = 5;
                break;

            // 6
            case 106:
            case 119:
            case 132:
            case 145:
                kartenwert = 6;
                break;

            // 7
            case 107:
            case 120:
            case 133:
            case 146:
                kartenwert = 7;
                break;

            // 8
            case 108:
            case 121:
            case 134:
            case 147:
                kartenwert = 8;
                break;

            // 9
            case 109:
            case 122:
            case 135:
            case 148:
                kartenwert = 9;
                break;

            //10
            case 110:
            case 123:
            case 136:
            case 149:
                kartenwert = 10;
                break;

            //Bube
            case 111:
            case 124:
            case 137:
            case 150:
                kartenwert = 10;
                break;

            //Dame
            case 112:
            case 125:
            case 138:
            case 151:
                kartenwert = 10;
                break;

            //König
            case 113:
            case 126:
            case 139:
            case 152:
                kartenwert = 10;
                break;
        }
}
function drop(ev) {
    // Normalerweise können Data oder Elemente nicht in andere Elemente 
    // gedropped werden. Um das Droppen zu ermöglichen muss also 
    // zunächst das Defaulthandling verhindert werden (preventDefault()).
    ev.preventDefault();

    var data = ev.dataTransfer.getData("text");

    if(ev.target.id === "ablage" || ev.target.id === "stapel" ){
        //document.getElementById(data).style.zIndex = counter++;
        //alert( document.getElementById(data).style.zIndex);

        
        //Animation
        flip(data);

        //shuffle - splice deckay & random
        bildcounter = shuffle();
        //console.log("bildcounter : " + bildcounter);

        //Rückseitenbild wird überschrieben mit Vorderseitenbild
        document.getElementById(data).src = pfad + bildcounter +".gif";

        setKartenwert(bildcounter);
        score += kartenwert;

        document.getElementById(data).setAttribute("kartenwert",kartenwert);
        console.log("data : " + data + "\nkartenwert : " + kartenwert + 
        "\nscore : " + score);

        // Der Score wird in HTML ausgegeben
        document.getElementById("score").innerHTML = ("score : " + score);

        //Karte wird in HTML von einem Stapel auf die Ablage umgehängt
        ev.target.appendChild(document.getElementById(data));

        //soll nicht mehr bewegt werden
        document.getElementById(data).draggable = false;


    }
    else{
        alert("In die Karte reinlegen nicht möglich!");
    }
}

function shuffle(){
    // Shuffled das deck array, entfernt dessen letztes 
    // Element und hängt es an das ablage Array.
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    //console.log("deck : " + deck);
    ablage.push(deck.pop());
    //console.log("ablage : " + ablage);

    // Gibt das letzte Element des ablage Arrays zurück.
    return ablage[ablage.length - 1];
}