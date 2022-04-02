import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const AddPeople = (props) => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [people, setPeople] = useState([]);

    const onSubmit = data => {
        const oldData = JSON.parse(window.localStorage.getItem('people')) || [];
        oldData.push(data.name);
        window.localStorage.setItem('people', JSON.stringify(oldData));
        props.handelReload('people')
        reset();
    };

    const onSubmitxxx = data => {
        console.log(data)
        /*   people.push(data.name);
          window.localStorage.setItem('peoples', JSON.stringify(people));
          reset(); */
    };

    /*     useEffect(() => {
            window.localStorage.getItem('peoples') ? setPeople(JSON.parse(window.localStorage.getItem('peoples'))) : setPeople([])
            console.log(JSON.parse(window.localStorage.getItem('peoples')))
        }, [people.length]) */
    return (
        <div className="col-xl-6 col-12">
            <div className='text-center'>
                <h5>Add New People</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <input {...register("name")} type="text" className="form-control" placeholder="Type Name" />
                        <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Add Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPeople;