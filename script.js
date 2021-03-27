function startTime() {
    //check if session already had started
    
}

let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

function runCode() {
    let curr = new Date();
    let time = "Current Time/Date: " + curr.getHours() + ":" + curr.getMinutes() + " " + days[curr.getDay()-1] + " " + months[curr.getMonth()] + " " + curr.getDate() + " " + curr.getFullYear();
    document.getElementById("datetime").innerHTML = time;
    var t = setTimeout(function(){ runCode() }, 1000); 
    //Check that storage is not undefined
    if (typeof(Storage) !== "undefined") {
        salaryCreated = parseInt(localStorage.getItem("salaryCreated"));
        workStarted = parseInt(localStorage.getItem("workStarted"));
        accountCreated = parseInt(localStorage.getItem("accountCreated"));

        if(accountCreated !== 1){
            localStorage.setItem("totalPay", 0.00);
            localStorage.setItem("totalHours", 0.00);
            localStorage.setItem("totalTakeHome", 0.00);
            localStorage.setItem("accountCreated" , 1);
            localStorage.setItem("sessions" , '{"sessions":[]}');
        }

        if(accountCreated === 1){
            let contents = "\
            <div style='float: left; width: 35%'>\
                <p class='subtext'>Account</p><br>\
                <p class='midtext'>Position: " + localStorage.getItem("position") + "</p>\
                <p class='midtext' style='float:left'>Hourly Wage: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'>$" + (parseFloat(localStorage.getItem("salary"))).toFixed(2) + "/hr</p></p>\
                <p class='midtext' style='float:left'>Applied Tax: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'> " + (localStorage.getItem("tax")*100).toFixed(1) + "%</p></p>\
            </div>\
            <div style='float: left; width: 28%'>\
                <p class='subtext'>Value</p>\
                <p class='subtext'>Investing value of total funds</p><br>\
                <p class='midtext' style='float:left'>S&P500 1 Year: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'>$" + (parseFloat(localStorage.getItem("totalTakeHome"))*Math.pow((1+0.10/1.0), 1)).toFixed(2) + "</p></p>\
                <p class='midtext' style='float:left'>S&P500 10 Year: <p class='midtext' style='color: var(--green);margin-left: 4px'>$" + (parseFloat(localStorage.getItem("totalTakeHome"))*Math.pow((1+0.10/1.0), 10)).toFixed(2) + "</p>\
                <p class='midtext' style='float:left'>S&P500 30 Year: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'>$" + (parseFloat(localStorage.getItem("totalTakeHome"))*Math.pow((1+0.10/1.0), 30)).toFixed(2) + "</p></p>\
            </div>\
            <div style='float: left; width: 30%'>\
                <p class='subtext'>Expenses</p><br>\
                <p class='midtext' style='float:left'>Hours Worked: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'>" + (parseFloat(localStorage.getItem("hours"))).toFixed(2) + " hrs</p></p>\
                <p class='midtext' style='float:left; margin-right: 4px;'>Gross Pay: <p class='midtext' style='color: var(--green); margin-left: 4px'> $" + (parseFloat(localStorage.getItem("pay"))).toFixed(2) + "</p>\
                <p class='midtext' style='float:left'>Take Home Pay: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'> $" + (parseFloat(localStorage.getItem("takeHome"))).toFixed(2) + "</p></p>\
            </div>\
            <i class='fa fa-times-circle' aria-hidden='true' id='icon-default' style='position: absolute; right:3%; margin-top: 0px; cursor: pointer' onclick='deleteSalary()'></i>"
            document.getElementById("account-inside").innerHTML = contents;
        }

        if(salaryCreated === NaN){
            localStorage.setItem("salaryCreated", 0);
            salaryCreated = 0;
        }
        if(salaryCreated === 1){
            let contents = "\
            <div style='float: left; width: 27%'>\
                <p class='subtext'>Salary</p><br>\
                <p class='midtext'>Position: " + localStorage.getItem("position") + "</p>\
                <p class='midtext' style='float:left'>Hourly Wage: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'>$" + (parseFloat(localStorage.getItem("salary"))).toFixed(2) + "/hr</p></p>\
                <p class='midtext' style='float:left'>Applied Tax: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'> " + (localStorage.getItem("tax")*100).toFixed(1) + "%</p></p>\
            </div>\
            <div style='float: left; width: 18%'>\
                <p class='subtext'>Controls</p><br>\
                <div style='float: left; text-align: center; margin-right: 10px'>\
            "
            if(workStarted === 1){
                curr = new Date();
                localStorage.setItem("pay", (curr.getTime() - parseInt(localStorage.getItem("timeStarted")))/(60*60*1000)*parseFloat(localStorage.getItem("salary")));
                localStorage.setItem("hours", (curr.getTime() - parseInt(localStorage.getItem("timeStarted")))/(60*60*1000));
                localStorage.setItem("takeHome", (curr.getTime() - parseInt(localStorage.getItem("timeStarted")))/(60*60*1000)*parseFloat(localStorage.getItem("salary")*parseFloat(localStorage.getItem("tax"))));
                contents += "<i id='icon-default' class='fa fa-pause-circle' aria-hidden='true'; style='font-size: 1.7em; margin-bottom: 3px; cursor: pointer' onclick='stopWork()'></i>\
                <p class='subtext'>Stop Work</p>";
            }
            else{
                contents += "<i id='icon-default' class='fa fa-play-circle' aria-hidden='true'; style='font-size: 1.7em; margin-bottom: 3px; cursor: pointer' onclick='startWork()'></i>\
                <p class='subtext'>Start Work</p>";
                
            }
            contents += "\
                </div>\
                <div style='float: left; text-align: center'>\
                    <i id='icon-default' class='fa fa-download' aria-hidden='true' style='font-size: 1.7em; margin-bottom: 3px;'></i>\
                    <p class='subtext'>Download .CSV</p>\
                </div>\
            </div>\
            <div style='float: left; width: 23%'>\
                <p class='subtext'>Session Pay</p><br>\
                <p class='midtext' style='float:left'>Hours Worked: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'>" + (parseFloat(localStorage.getItem("hours"))).toFixed(2) + " hrs</p></p>\
                <p class='midtext' style='float:left; margin-right: 4px;'>Gross Pay: <p class='midtext' style='color: var(--green); margin-left: 4px'> $" + (parseFloat(localStorage.getItem("pay"))).toFixed(2) + "</p>\
                <p class='midtext' style='float:left'>Take Home Pay: <p class='midtext' style='color: var(--green); float: left; margin-left: 4px'> $" + (parseFloat(localStorage.getItem("takeHome"))).toFixed(2) + "</p></p>\
            </div>\
            <div style='float: left; width: 30%'>\
                <p class='subtext'>Sessions</p>\
            </div>\
            <i class='fa fa-times-circle' aria-hidden='true' id='icon-default' style='position: absolute; right:3%; margin-top: 0px; cursor: pointer' onclick='deleteSalary()'></i>\
            <div style='position: absolute; z-index: 1; float: left; left: 40.5%; width: 150px; background-color:var(--green); height: 5px; margin-top:-13px; margin-bottom:-18px;'>&nbsp;<div>\
            <div style='position: absolute; z-index: 2; float: left; width: 150px; background-color:var(--green); bottom: -102px; height: 5px; margin-top:-13px; margin-bottom:-18px;'>&nbsp;<div>"

            document.getElementById("salary-inside").innerHTML = contents;
        }
        else if(salaryCreated === 0){
            document.getElementById("salary-inside").innerHTML = "\
            <p class='subtext'>Salary</p>\
            <div style='text-align:center'>\
                <i class='fa fa-plus-circle' aria-hidden='true' id='icon-default' style='font-size: 2em; margin-top: 10px; margin-bottom: 5px; cursor: pointer' onclick='openSalaryModal()'></i>\
                <p class='subtext'>Create salary</p>\
            </div>"
        }
    }
    else{
        localStorage.setItem("salaryCreated", 0);
    }
  }

  function startWork(){
    localStorage.setItem("pay", 0);
    localStorage.setItem("takeHome", 0);
    localStorage.setItem("hours", 0.00);
    localStorage.setItem("workStarted", 1);
    let curr = new Date();
    localStorage.setItem("timeStarted", curr.getTime());
  }

  function stopWork(){
    localStorage.setItem("totalPay", parseFloat(localStorage.getItem("totalPay")) + parseFloat(localStorage.getItem("pay")));
    localStorage.setItem("totalTakeHome", parseFloat(localStorage.getItem("totalTakeHome")) + parseFloat(localStorage.getItem("takeHome")));
    localStorage.setItem("totalHours", parseFloat(localStorage.getItem("totalHours")) + parseFloat(localStorage.getItem("hours")));
    localStorage.setItem("workStarted", 0);
    let obj = JSON.parse(localStorage.getItem("sessions"));
    obj.sessions.push('{' + '"Date":' + new Date(parseFloat(localStorage.getItem("timeStarted"))).toDateString() + ',' + '"Take Home Pay":' + parseFloat(localStorage.getItem("takeHome")).toFixed(2) + '"Gross Pay":' + parseFloat(localStorage.getItem("pay")).toFixed(2)+ '}');
    localStorage.setItem("sessions", JSON.stringify(obj));
    let curr = new Date();
    localStorage.setItem("timeEnded", curr.getTime());
}

  function openSalaryModal(){
    document.getElementById("salaryModal").style.display="block";
  }

  function createSalary(){
    let inputs = document.getElementById("salaryForm").elements;
    console.log(inputs);
    let position = inputs[0].value;
    let salary = inputs[1].value;
    let tax = inputs[2].value;
    localStorage.setItem("position", position);
    localStorage.setItem("salary", salary);
    localStorage.setItem("tax", tax);
    localStorage.setItem("hours", 0);
    localStorage.setItem("pay", 0);
    localStorage.setItem("takeHome", 0);
    localStorage.setItem("workStarted", 0);
    document.getElementById("salaryModal").style.display="none";
    localStorage.setItem("salaryCreated", 1);
  }


  function deleteSalary(){
    localStorage.setItem("salaryCreated", 0);
  }

  runCode();