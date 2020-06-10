let startABS = new Date().getTime();
let seconds = 0;
let money = 0.00;
let salary = 30.00;
let pause = false;
window.onload = startTime;

function startTime() {
    if(pause == false){
        //check if session already had started
        if (typeof(Storage) !== "undefined" && seconds == 0) {
            money = parseFloat(localStorage.getItem("money"));
        }
        var today = new Date();
        seconds = parseInt((today.getTime() - startABS)/1000, 10);
        document.getElementById('money').innerHTML = "$" + calculateMoney(seconds);
        //save every 5 seconds
        if(seconds%5 == 0){
            localStorage.setItem("money", money);
        }
        var t = setTimeout(startTime, 1000);
    }
}

function toggleStop(){
    pause = !pause;
    if(pause == false){
        var t = setTimeout(startTime, 1000);
        document.getElementById('stop').innerHTML = '<i class="fas fa-pause-circle"></i>  Pause';
    }
    else{
        document.getElementById('stop').innerHTML = '<i class="fas fa-play-circle"></i>  Resume';
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function calculateMoney(seconds){
    money += parseFloat((salary/3600));
    return money.toFixed(2);
}

function restart(){
    console.log("RESTART");
    money = 0.00;
    localStorage.setItem("money", money);
}


