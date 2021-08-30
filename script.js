const pfad = "./deck/";
bildcounter = 100;
counter = 0;
kartenwert = 0;

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();


    var data = ev.dataTransfer.getData("text");

    if(ev.target.id === "ablage" || ev.target.id === "stapel" ){
        //document.getElementById(data).style.zIndex = counter++;
        //alert( document.getElementById(data).style.zIndex);


        //Animation
        document.getElementById(data).style.animationName = "rotieren";
        document.getElementById(data).style.webkitAnimationDuration = "0.2s";
        document.getElementById(data).style.animationTimingFunction = "linear";

        //shuffle - splice Array & random
        bildcounter++;
        //a.splice(a.indexOf(a[ parseInt(Math.random()*a.length) ]))

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

            case 102:
            case 115:
            case 128:
            case 141:
                kartenwert = 2;
                break;

            case 103:
            case 116:
            case 129:
            case 142:
                kartenwert = 3;
                break;

            case 104:
            case 117:
            case 130:
            case 143:
                kartenwert = 4;
                break;

            case 105:
            case 118:
            case 131:
            case 144:
                kartenwert = 5;
                break;

            case 106:
            case 119:
            case 132:
            case 145:
                kartenwert = 6;
                break;

            case 107:
            case 120:
            case 133:
            case 146:
                kartenwert = 7;
                break;

            case 108:
            case 121:
            case 134:
            case 147:
                kartenwert = 8;
                break;

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