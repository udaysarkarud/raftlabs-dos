import React from 'react';
import { useForm } from "react-hook-form";

const AddRelationType = (props) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const oldData = JSON.parse(window.localStorage.getItem('relationType')) || [];
        oldData.push(data.relation);
        window.localStorage.setItem('relationType', JSON.stringify(oldData));
        props.handelReload('relationType')
        reset();
    };
    return (
        <div className="col-xl-6 col-12">
            <div className='text-center'>
                <h5>Add Relation Status</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <input {...register("relation")} type="text" className="form-control" placeholder="Type Name" />
                        <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Add Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRelationType;