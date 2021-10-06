const pfad = "./deck/";
let deck = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152];
let ablage = [];
let bildcounter;
let score = 0;
let gegnerscore = 0;
let kartenwert = 0;
let versatz = 0;
let asseimdeck = 0;

for (let i = 1; i < 53; i++) {
	var htmlkarte = new Image;
	document.getElementById("stapel").appendChild(htmlkarte);

	htmlkarte.setAttribute("class", "karte");
	htmlkarte.setAttribute("id", i);
	htmlkarte.setAttribute("src", "./deck/100.gif");
	htmlkarte.setAttribute("draggable", "true");
	htmlkarte.setAttribute("ondragstart", "drag(event)");
}

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

function setKartenwert(kartenId){
    kartenwert = Math.min((kartenId - 101) % 13,9) + 1;
	if (kartenwert === 1){
		kartenwert += 10;
		asseimdeck += 1;
	}
}

function drop(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (ev.target.id === "ablage" || ev.target.id === "stapel") {
        flip(data);
        bildcounter = shuffle();
        document.getElementById(data).src = pfad + bildcounter + ".gif";
        setKartenwert(bildcounter);
        score += kartenwert;
        document.getElementById(data).setAttribute("kartenwert", kartenwert);
        console.log("data : " + data + "\nkartenwert : " + kartenwert +
            "\nscore : " + score + "\noid : ");
        ev.target.appendChild(document.getElementById(data));

        //soll nicht mehr bewegt werden
        document.getElementById(data).draggable = false;
        if (score > 21 && asseimdeck > 0){
            score -= 10;
            asseimdeck -= 1;
        }
        document.getElementById("escore").innerHTML = "Eigener score: " + score;
        document.getElementById(data).style.left = versatz + "px";
        versatz += 15;
        checkWin();
        if (score > 10) {
            document.getElementById("hold").removeAttribute("disabled");
            document.getElementById("hold").enabled = true;
        }
        } else {
            alert("In die Karte reinlegen nicht möglich!");
        }
}

function hold(ev) {
    asseimdeck = 0;
    versatz = 0;
    allesdeaktivieren();
    karteNachGegnerAblage();

    function karteNachGegnerAblage() {
            setTimeout(function () {
                bildcounter = shuffle();
                let data = bildcounter - 100;
                data.toString();
                console.log("Der wert von bildcounter = " + bildcounter);
                document.getElementById(data).src = pfad + bildcounter + ".gif";
                setKartenwert(bildcounter);
                gegnerscore += kartenwert;
                flip(data);
                document.getElementById(data).setAttribute("kartenwert", kartenwert);
                console.log("data : " + data + "\nkartenwert : " + kartenwert +
                    "\ngegnerscore : " + gegnerscore);
                document.getElementById("gegnerablage").appendChild(document.getElementById(data));
                document.getElementById("gscore").innerHTML = "Gegner score: " + gegnerscore;
                document.getElementById(data).style.left = versatz + "px";
                versatz += 15;
                if (gegnerscore > 21 && asseimdeck > 0){
                    score -= 10;
                    asseimdeck -= 1;
                }
                checkWin();
				karteNachGegnerAblage();
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
    //false bedeutet gewonnen
    //true bedeutet verloren

    if (score > 21) {
        duhastverloren();
		allesdeaktivieren();
		return;
    }

    // Wenn gegner weniger als 22 und mehr als der Spieler hat.
    else if (gegnerscore < 22 && gegnerscore > score){
        duhastverloren();
		allesdeaktivieren();
		return;
    }

    else if (gegnerscore > 21){
        duhastgewonnen();
		allesdeaktivieren();
		return;
    }

	else if (score === gegnerscore){
		unentschieden();
		allesdeaktivieren();
		return;
	}

    else {
        return;
    }
}

function duhastverloren() {


    if (confirm("Du hast verloren!\nMöchtest du erneut spielen?")) {
        window.location.reload(true);
    }
	else {
        allesdeaktivieren();
    }
}

function duhastgewonnen() {

    if (confirm("Herzlichen Glückwunsch\nDu hast gewonnen!\nMöchtest du erneut spielen?")) {
        window.location.reload(true);
    }
	else {
        allesdeaktivieren();
    }
}

function unentschieden() {

	if (confirm("Unentchieden!\nMöchtest du erneut spielen?")) {
		window.location.reload(true);
	}
	else {
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
		index = i;
		index.toString();
        document.getElementById(index).setAttribute("draggable", "false")
    }
}
