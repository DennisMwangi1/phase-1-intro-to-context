// Your code here
const createEmployeeRecord = (array)=>{
    return {
        firstName:array[0],
        familyName:array[1],
        title:array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

const createEmployeeRecords= (records)=>{
    const employeeObjectArray = []
    records.forEach(record => {
        const employeeObj = createEmployeeRecord(record)
        employeeObjectArray.push(employeeObj)
    });
    return employeeObjectArray
}

function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type : "TimeIn",
        hour: parseInt(hour,10),
        date,
    })

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour : parseInt(hour, 10),
        date
    })

    return employeeRecord
}

function hoursWorkedOnDate(employee, workDate){
    let inTheEvent = employee.timeInEvents.find((e)=>{
        return e.date === workDate
    })

    let outOfTheEvent = employee.timeOutEvents.find((e)=>{
        return e.date === workDate
    })

    return (outOfTheEvent.hour - inTheEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateWork){
    let wageEarned = hoursWorkedOnDate(employee, dateWork) * employee.payPerHour
    return parseFloat(wageEarned.toString())
}

function allWagesFor(employee){
    let eligbleDates = employee.timeInEvents.map((e)=>{
        return e.date
    })

    let payable = eligbleDates.reduce((memo, d)=>{
        return memo + wagesEarnedOnDate(employee,d)
    }, 0)

    return payable
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((memo, rec)=>{
        return memo + allWagesFor(rec)
    }, 0)
}
