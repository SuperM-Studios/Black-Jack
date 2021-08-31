const pfad = "./deck/";
a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
bildcounter = 100;
counter = 0;
kartenwert = 0;

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
        flip(data)

        //shuffle - splice Array & random
        bildcounter++;
        //a.splice(a.indexOf(a[ parseInt(Math.random()*a.length) ]))
 /* 
       randomInt = parseInt(Math.random() * a.length)
        console.log("randomInt : " + randomInt)
        el1 = a[randomInt]
        console.log("el1 : " + el1)
        el2 = a.indexOf(el1)
        console.log("el2 : " + el2)
        el3 = a.splice(el2)
        console.log("el3 : " + el3)
*/
        //Rückseitenbild wird überschrieben mit Vorderseitenbild
        document.getElementById(data).src = pfad + bildcounter +".gif";

        switch(bildcounter) {
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

        document.getElementById(data).setAttribute("kartenwert",kartenwert);

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

}