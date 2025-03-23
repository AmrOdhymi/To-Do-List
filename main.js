let date = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} - ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
}

let tasks = [

]

function addInLocalStorage(){
    if(localStorage.length > 0){
        for(let i = 0; i<localStorage.length; i++){
            tasks.push(JSON.parse(localStorage.getItem(i)))
        }
        re()
    }
}
addInLocalStorage()

function re(){
    document.getElementById("tasks").innerHTML = ""
    let index = 0
    let color
    let src
    if(tasks.length != 0){
        for(let task of tasks){
                if(task.isCheked){
                    color = "green"
                    src = "icon/check.png"
                }else{
                    color = "rgb(255, 26, 26)"
                    src = "icon/uncheck.png"
                }
                document.getElementById("tasks").innerHTML += 
                        `<div class="task ${task.isCheked? "task_done" : ""}">
                            
                            <div class="task-controlars">

                                <button= id="delete-btn" class="btn-cerclar" onclick="deleltTask(${index})" style="background-color: rgb(191, 53, 53);"><span><img src="icon/delete.png" style="margin-top: 9px;"></span></button=>

                                <button id="check-btn" class="btn-cerclar" onclick="checkUncheckTask(${index})" style="background-color: ${color};"><span><img src= ${src} style="margin-top: 4px;"></span></button>

                                <button id="edit-btn" class="btn-cerclar" onclick="editTask(${index})" style="background-color: rgb(60, 60, 186);"><span><img src="icon/edit.png" style="margin-top: 3px; margin-left: 1px;"></span></button>

                            </div>

                            <div class="task-detels">
                                
                                <div class="task-name" style="margin-bottom: 5px;>

                                    <span id="task-titel">${task.taitl}</span>  

                                </div>

                                <div class="task-date">
                                        
                                    <div class="date">

                                        <img style="float: right; width: 20px; height: 20px; margin-left: 5px; margin-top: -1px; background-color: #4b4040; border-radius: 5px;" src="icon/calendar_clock_24.png" alt="">

                                        <span id="calender" style="line-height: 1;">${task.data}</span>

                                    </div>
                                    
                                </div>
                                
                            </div>

                        </div>`
                index++
            }
    }else{
        document.getElementById("tasks").innerHTML = "لا يوجد مهام حاليا"
    }
    
}


document.getElementById("add-task-btn").addEventListener("click", ()=>{
    let inputResult = window.prompt("ادخل عنوان المهمه", "")
    if(inputResult !="" && inputResult != null){
        let task = {                
            "taitl": inputResult,
            "data": date(),
            "isCheked": false
           }
        tasks.push(task)
        InLocalStorage()
        re()
    }
})

function deleltTask(index){
    let taskName = tasks[index].taitl
    let doDelet = confirm(`هل أنت متأكد من حذف مهمة: ${taskName}`)
    if(doDelet){
        tasks.splice(index, 1)
        InLocalStorage()
        re()
    }
    
}

function editTask(index){
    let taskName =  prompt("أدخل اسم المهمه الجديد", tasks[index].taitl)
    if(taskName !="" && taskName != null){
        tasks[index].taitl = taskName
        InLocalStorage()
        re()
    } 
}

function checkUncheckTask(index){
    tasks[index].isCheked = !tasks[index].isCheked
    InLocalStorage()
    re()
    // if(tasks[index].isCheked == true){
    //     tasks[index].isCheked = false
    // }else
    //     tasks[index].isCheked = true
}

function InLocalStorage(){
    localStorage.clear()
    let index = 0
    for(let i of tasks){
        localStorage.setItem(index, JSON.stringify(i))
        index++
    }
}