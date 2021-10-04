const pfad = "./deck/";
let deck = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152];
let ablage = [];
let bildcounter;
let score = 0;
let gegnerscore = 0;
let kartenwert = 0;
let versatz = 0;					//Wird später gebraucht um um den Versatz der Karte zu bewerkstelligen. Der Wert wird wenn der Gegner beginnt wieder auf 0 gesetzt.
let obersteid = deck.length;				//Wird später gebraucht um dem "Gegner zu sagen, welche Karte am obersten im Stapel liegt. (Ist sehr umständlich und kann optimiert werden.)
let asseimdeck = 0;
spieleramzug = true;

allesaktivieren();

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
    switch (kartenId) {
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

    if (ev.target.id === "ablage" || ev.target.id === "stapel") {
        //document.getElementById(data).style.zIndex = counter++;
        //alert( document.getElementById(data).style.zIndex);


        //Animation
        flip(data);

        //shuffle - splice deckay & random
        bildcounter = shuffle();
        //console.log("bildcounter : " + bildcounter);

        //Rückseitenbild wird überschrieben mit Vorderseitenbild
        document.getElementById(data).src = pfad + bildcounter + ".gif";

        setKartenwert(bildcounter);
        if (kartenwert === 11){
            asseimdeck += 1;
        }

        score += kartenwert;

        document.getElementById(data).setAttribute("kartenwert", kartenwert);
        console.log("data : " + data + "\nkartenwert : " + kartenwert +
            "\nscore : " + score + "\noid : " + obersteid);

        //Karte wird in HTML von einem Stapel auf die Ablage umgehängt
        ev.target.appendChild(document.getElementById(data));

        //soll nicht mehr bewegt werden
        document.getElementById(data).draggable = false;

        //Wenn man Asse im Deck hat, werden diese zum Wert 1 konvertiert.
        if (score > 21 && asseimdeck > 0){
            score -= 10;
            asseimdeck -= 1;
        }

        //Score wird im HTML amgezeigt
        document.getElementById("escore").innerHTML = "Eigener score: " + score;

        //Welche Karte liegt ganz oben auf dem Stapel (für die Gegner zieht Methode)
        obersteid -= 1;

        //Gedroppte Karte wird nach rechts versetzt
        document.getElementById(data).style.left = versatz + "px";
        versatz += 15

        //Überprüfung ob jemand gewonnen hat. Rückgabewert: True = Gewonnen, False = Verloren, Null = Weiterspielen
        console.log(checkWin());

        if (checkWin() === true){
            duhastverloren();
        }

        else if (checkWin() === false){
            duhastgewonnen();
        }

        /*
               else {
                    duhastverloren();
                }
        */

        //Hold Button wird aktiviert
        if (score > 10) {
            document.getElementById("hold").removeAttribute("disabled");
            document.getElementById("hold").enabled = true;
        }


        //TODO: Das ausrechnen für den Gewinn in eine andere Methode auslagern
        //TODO: Wenn gewonnen gegnerZieht Methode aufrufen (Die Methode an sich muss auch noch geschrieben werden.)
    } else {
        alert("In die Karte reinlegen nicht möglich!");
    }
}

function hold(ev) {
    spieleramzug = false;
    allesdeaktivieren();
    myStartFunction();

    function myStartFunction() {
        setTimeout(function () {
            alert("Gegner muss jetzt ziehen!");

            //shuffle - splice deckay & random
            bildcounter = shuffle();

            //Animation

            let obersteidAlsString = (obersteid.toString());
            flip(data);

            //console.log("bildcounter : " + bildcounter);

            //Rückseitenbild wird überschrieben mit Vorderseitenbild
            document.getElementById(data).src = pfad + bildcounter + ".gif";

            setKartenwert(bildcounter);
            score += kartenwert;

            document.getElementById(data).setAttribute("kartenwert", kartenwert);
            console.log("data : " + data + "\nkartenwert : " + kartenwert +
                "\nscore : " + score);

            //Karte wird in HTML von einem Stapel auf die Ablage umgehängt
            ev.target.appendChild(document.getElementById(data));

            //soll nicht mehr bewegt werden
            document.getElementById(data).draggable = false;

            //Score wird im HTML amgezeigt
            document.getElementById("escore").innerHTML = "Eigener score: " + score;

            //Welche Karte liegt ganz oben auf dem Stapel (für die Gegner zieht Methode)
            id -= 1;

            //Hold Button wird aktiviert
            if (score > 10) {
                document.getElementById("hold").removeAttribute("disabled");
                document.getElementById("hold").enabled = true;
            }


            //TODO: Das ausrechnen für den Gewinn in eine andere Methode auslagern
            //TODO: Wenn gewonnen gegnerZieht Methode aufrufen (Die Methode an sich muss auch noch geschrieben werden.)
            alert("Gegner hat gezogen!");
        }, 1000);
    }
}

function shuffle() {
    // Gibt irgendeine ganze Zahl zwischen 100 und 153 zurück, die nicht
    // bereits zurückgegeben wurde.
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    //console.log("deck : " + deck);
    ablage.push(deck.pop());
    //console.log("ablage : " + ablage);

    return ablage[ablage.length - 1];
}

function checkWin() {
    //null bedeutet weiterspielen
    //true bedeutet gewonnen
    //false bedeutet verloren

    if (score > 21) {
        return true;
    }

    // Wenn gegner weniger als 21 und mehr als der Spieler hat.
    else if (gegnerscore < 21 && gegnerscore > score){
        return false;
    }

    else if (gegnerscore > 21){
        return false;
    }

    else {
        return null;
    }
    //Wenn der Score über 21 ist und der Spieler ein Ass hat, wird der score -10 gerechnet
}

function duhastverloren() {


    if (confirm("Du hast verloren!\nMöchtest du erneut spielen?")) {
        window.location.reload(true);
    } else {
        allesdeaktivieren();
    }
}

function duhastgewonnen() {

    if (confirm("Herzlichen Glückwunsch \n Du hast gewonnen! \n Möchtest du erneut spielen?")) {
        window.location.reload(true);
    } else {
        allesdeaktivieren();
    }
}

function allesaktivieren() {
    document.getElementById("hold").disabled = true;
    for (i = 1; i < 52; i++) {
        document.getElementById(i).setAttribute("draggable", "true")
    }
}

function allesdeaktivieren() {
    document.getElementById("hold").setAttribute("disabled", "");

    for (i = 1; i < 52; i++) {
        document.getElementById(i).setAttribute("draggable", "false")
    }
}
