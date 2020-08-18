import React,{Fragment, useState} from 'react';
import TextLoop from "react-text-loop";

const InputTodo = () => {

    const [DESCRIPTION, setDescription] = useState('');
    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = { DESCRIPTION };
            const response = await fetch('http://localhost:5000/todos',{
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(body)

            });
            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    }




    return(<Fragment>
        <h1 className='display-2 text-center mt-5'>
                <TextLoop interval={1500}>
                <span>CHECK</span>
                <span>THIS</span>
                <span>TODO/NOTEBOOK</span>
                <span>LIST</span>
                <span>DAILY</span>
                    
                </TextLoop>
            
        </h1>
        <form className='d-flex mt-5' onSubmit={onSubmitForm}>
            <input type='text' className='form-control' value={DESCRIPTION} onChange={e => setDescription(e.target.value)}/>
            <button className='btn btn-success'>ADD</button>
           
        </form>
    </Fragment>);
};

export default InputTodo;