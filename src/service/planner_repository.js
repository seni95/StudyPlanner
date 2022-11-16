import { firebaseDatabase } from "./firebase";

class PlannerRepository{

    constructor(info){
        this.userInfo = info;
    }

    updateData(date,onUpdate){
        const ref=firebaseDatabase.ref(`${this.userInfo}/${date}/todolist`);
        ref.on('value',snapshot=>{
            const value=snapshot.val();
            value&&onUpdate(value);
        })

        return ()=>ref.off();
    }

    saveData(date,todos){
        firebaseDatabase.ref(`${this.userInfo}/${date}/todolist`).set(todos);
        console.log("saveData 실행");
    }


    createCalendar(date,onUpdate){
        const ref=firebaseDatabase.ref(`${this.userInfo}/${date}/todolist`);
        ref.on('value',snapshot=>{
            const value=snapshot.val();
            value&&onUpdate(value);
        })
        
        return ()=>ref.off();
    }



}

export default PlannerRepository;