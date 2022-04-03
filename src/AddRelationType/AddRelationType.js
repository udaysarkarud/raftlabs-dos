import React from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const AddRelationType = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        //Get Data from localStorage : if there is no data then default data'll be empty array  
        const getData = JSON.parse(window.localStorage.getItem('relationType')) || [];
        const findIndex = getData.findIndex(item => item === data.relation);

        if (findIndex < 0) {
            //push name and set on localStorage
            getData.push(data.relation);
            window.localStorage.setItem('relationType', JSON.stringify(getData));

            // home ->  handelReload call
            props.handelReload('relationType')

            // Notification
            Swal.fire({
                icon: 'success',
                title: 'New Relation Status Added',
            });
        } else {
            // Notification
            Swal.fire({
                icon: 'error',
                title: 'Relation Status Already Exists',
            });
        }
        // reset form
        reset();
    };
    return (
        <div className="col-xl-6 col-12">
            <div className='text-center'>
                <h5>Add Relation Status</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <input {...register("relation")} type="text" className="form-control" placeholder="Type Name" />
                        <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Add Relation</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRelationType;