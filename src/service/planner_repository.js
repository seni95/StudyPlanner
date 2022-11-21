import { firebaseDatabase } from "./firebase";

class PlannerRepository{

    constructor(info){
        this.userInfo = info;
    }

    updateData(directory,onUpdate){
        const ref=firebaseDatabase.ref(`${this.userInfo}/${directory}/todolist`);
        ref.on('value',snapshot=>{
            const value=snapshot.val();
            value&&onUpdate(value);
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