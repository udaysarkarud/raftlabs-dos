import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const AddPeople = (props) => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [people, setPeople] = useState([]);

    const onSubmit = data => {
        //Get Data from localStorage : if there is no data then default data'll be empty array  
        const getData = JSON.parse(window.localStorage.getItem('people')) || [];
        const findIndex = getData.findIndex(item => item === data.name);

        if (findIndex < 0) {
            //push name and set on localStorage
            getData.push(data.name);
            window.localStorage.setItem('people', JSON.stringify(getData));

            // home ->  handelReload call
            props.handelReload('people')

            // Notification
            Swal.fire({
                icon: 'success',
                title: 'New People Name Added',
            });
        } else {
            // Notification
            Swal.fire({
                icon: 'error',
                title: 'Name Already Exists',
            });
        }
        // reset form
        reset();
    };

    return (
        <div className="col-xl-6 col-12">
            <div className='text-center'>
                <h5>Add New People</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <input {...register("name")} type="text" className="form-control" placeholder="Type Name" />
                        <button className="btn btn-primary" type="submit" id="button-addon2">Add People</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPeople;