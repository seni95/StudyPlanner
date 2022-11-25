import { firebaseDatabase } from "./firebase";

class PlannerRepository{

    constructor(info){
        this.userInfo = info;
    }

    updateData(directory, updateData){
        const repeat = firebaseDatabase.ref(`${this.userInfo}/repeatTodos/todolist`);
        const ref=firebaseDatabase.ref(`${this.userInfo}/${directory}/todolist`);
        ref.on('value',snapshot=>{
            const today=snapshot.val();
        repeat.on('value',snapshot=>{
            const repeat=snapshot.val();
            if(today===null&&repeat===null){
                updateData([]);
            }
            else if(today===null){
                updateData(repeat);
            }else if(repeat===null){
                updateData(today);
            }
            else{
                const filter = repeat.filter(x=>!today.includes(x));
                const result = [...today, ...filter];
                updateData(result);}
            })


        })

        return ()=>ref.off();
    }


    
    saveData(date,todos){
        firebaseDatabase.ref(`${this.userInfo}/${date}/todolist`).set(todos);
    }


    createCalendar(date,onUpdate){
        const ref=firebaseDatabase.ref(`${this.userInfo}/${date}/todolist`);
        ref.on('value',snapshot=>{
            const value=snapshot.val();
            value&&onUpdate(value);
        })
        
        return ()=>ref.off();
    }

    createRepeatToDo(todos){
        const ref=firebaseDatabase.ref(`${this.userInfo}/repeatTodos/todolist`).set(todos);
    }

}

export default PlannerRepository;