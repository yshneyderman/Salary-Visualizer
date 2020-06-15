let startABS = new Date().getTime();
let seconds = 0;
let money = 0.00;
let salary = 32.00;
let pause = false;
let view = false;
let fps = 24;
window.onload = startTime;

function startTime() {
    salary = document.getElementById("salary").elements[0].value;
    if(pause == false){
        //check if session already had started
        if (typeof(Storage) !== "undefined" && seconds == 0) {
            money = parseFloat(localStorage.getItem("money"));
        }
        var today = new Date();
        seconds = parseInt((today.getTime() - startABS)/1000, 10);
        document.getElementById('money').innerHTML = "$" + calculateMoney(seconds);
        document.getElementById('dollar').innerHTML = '</div><div style="background-color: #e6e6e6; width: 200px; border-color:#333333; border-style: solid; border-width: 1px; height: 25px; margin-top: -1px; margin-left: 99px; position: absolute;"></div><div style="background-color: green; width: ' + (200*(money%1))%200 + 'px; height: 25px; margin-left: 100px; position: absolute;">'
        //save every 5 seconds
        if(seconds%5 == 0){
            localStorage.setItem("money", money);
        }
        var t = setTimeout(startTime, 1000/fps);
    }
}

function toggleStop(){
    pause = !pause;
    if(pause == false){
        var t = setTimeout(startTime, 1000);
        document.getElementById('stop').innerHTML = '<i class="fas fa-pause-circle"></i>&nbsp;&nbsp;Pause';
    }
    else{
        document.getElementById('stop').innerHTML = '<i class="fas fa-play-circle"></i>&nbsp;&nbsp;Resume';
    }
}

function changeSalary(){
    salary = document.getElementById("salary").elements[0].value;
}

function toggleView(){
    view = !view;
    if(view == false){
        document.getElementById('view').innerHTML = '<i class="fas fa-angle-double-down"></i>&nbsp;&nbsp;View More';
        document.getElementById("left").innerHTML = '';
        document.getElementById("right").innerHTML = '';
    }
    else{
        document.getElementById('view').innerHTML = '<i class="fas fa-angle-double-up"></i>&nbsp;&nbsp;View Less';
        document.getElementById("left").innerHTML = '<p>Yo</p>';
        document.getElementById("right").innerHTML = '<p>Yo</p>';
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function calculateMoney(seconds){
    money += parseFloat((salary/3600)/fps);
    return money.toFixed(2);
}

function restart(){
    console.log("RESTART");
    money = 0.00;
    localStorage.setItem("money", money);
}


