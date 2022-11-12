import { firebaseDatabase } from "./firebase";

class PlannerRepository{

    updateData(date,onUpdate){
        const ref=firebaseDatabase.ref(`${date}/todolist`);
        ref.on('value',snapshot=>{
            const value=snapshot.val();
            value&&onUpdate(value);
        })

        return ()=>ref.off();
    }

    saveData(date,todos){
        firebaseDatabase.ref(`${date}/todolist`).set(todos);
    }


    createCalendar(date,onUpdate){
        const ref=firebaseDatabase.ref(`${date}/todolist`);
        ref.on('value',snapshot=>{
            const value=snapshot.val();
            value&&onUpdate(value);
        })
        
        return ()=>ref.off();
    }
}

export default PlannerRepository;