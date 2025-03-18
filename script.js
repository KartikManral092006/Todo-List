const checkboxlist = document.querySelectorAll(".custom-checkbox");
const inputFeilds = document.querySelectorAll(".goal-container-input");
const remainder  = document.querySelector(".Remainder-msg");
const progressBar = document.querySelector(".Progress-Bar");
const progressStatus = document.querySelector(".Progress-Status");
const progressLabel = document.querySelector(".Progress-label");

const quotes = ["Raise the Bar by completing the Goal","Well Begun is half Done","Just a Step Away " ,"Whoa! You Just completed All the goals,time for Chill :)"]

const allGoals = JSON.parse(localStorage.getItem('allGoals'))||{};
let countOfCompleted  = Object.values(allGoals).filter((goal) => goal.completed).length;
progressStatus.style.width = `${(countOfCompleted / inputFeilds.length) * 100}%`
if (progressStatus.firstElementChild) {
    progressStatus.firstElementChild.innerText = `${countOfCompleted}/3 Completed`;
}
progressLabel.innerText  = quotes[countOfCompleted];


checkboxlist.forEach((checkbox) =>{
    checkbox.addEventListener('click',(e) =>{
         const allInputFilled = [...inputFeilds].every((input) =>{
            return input.value ;

        });
        if(allInputFilled){
            checkbox.parentElement.classList.toggle('completed');
            const inputID = checkbox.nextElementSibling.id;
            if (!allGoals[inputID]) {
                allGoals[inputID] = { name: "", completed: false };
            }
            allGoals[inputID].completed =  !allGoals[inputID].completed ;
            countOfCompleted = Object.values(allGoals).filter((goal) => goal.completed).length;
            progressStatus.style.width = `${(countOfCompleted / inputFeilds.length) * 100}%`
            if (progressStatus.firstElementChild) {
                progressStatus.firstElementChild.innerText = `${countOfCompleted}/3 Completed`;
            }
            progressLabel.innerText  = quotes[countOfCompleted];
            localStorage.setItem('allGoals' , JSON.stringify(allGoals)) ;
        }else{
            remainder.style.display = 'block';
            progressBar.classList.add('show-error');
        }
    })
})

inputFeilds.forEach((input) =>{
    if(allGoals[input.id]){
        input.value = allGoals[input.id].name ;
    }
    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed');
    }
    input.addEventListener('focus', (e) =>{
        remainder.style.display = 'none';
    })
    input.addEventListener('input', (e) =>{

        if(allGoals[input.id] && allGoals[input.id].completed){
            input.value = allGoals[input.id].name;
            return;
        }
        if (allGoals[input.id]) {
            allGoals[input.id].name = input.value
          }else{
        allGoals[input.id ] = {
            name:input.value,
            completed:false,
        }
    }
        localStorage.setItem('allGoals' , JSON.stringify(allGoals)) ;
    })
})
