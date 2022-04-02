import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import AddPeople from '../AddPeople/AddPeople';
import AddRelationType from '../AddRelationType/AddRelationType';
import DosCal from '../DosCal/DosCal';

const Home = () => {
    const [loadData, setLoadData] = useState(false);
    const [loadType, setLoadType] = useState('both')
    const [peoples, setPeoples] = useState([]);
    const [peoples2, setPeoples2] = useState([]);
    const [relationType, setRelationType] = useState([]);
    const [relationShipData, setRelationShipData] = useState([])
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const handelReload = (type) => {
        setLoadType(type)
        !loadData ? setLoadData(true) : setLoadData(false)
    }

    /*     const handelSelectPeople2 = (e) => {
            setPeoples2(peoples.filter(item => item !== e.target.value));
            setFriends([{ name: e.target.value }])
        } */
    const fndsList = []
    const onSubmit = data => {
        if (data.name === data.friendName) {
            console.log('Please Select Diffrents Name')
        } else {
            const checkData = JSON.parse(window.localStorage.getItem('relationData')) || [].findIndex(item => item.name === data.name)

            const getData = JSON.parse(window.localStorage.getItem('relationData')) || [];
            const findIndex = getData.findIndex(item => item.name === data.name);

            if (findIndex < 0) {
                const fndsData = { name: data.name, friends: [data.friendName] }
                const oldData = JSON.parse(window.localStorage.getItem('relationData')) || [];
                oldData.push(fndsData);
                window.localStorage.setItem('relationData', JSON.stringify(oldData));

            } else {
                const oldData = JSON.parse(window.localStorage.getItem('relationData'));
                const personOldData = oldData[findIndex]
                personOldData.friends.push(data.friendName)
                oldData[findIndex] = personOldData
                console.log(oldData[findIndex])
                window.localStorage.setItem('relationData', JSON.stringify(oldData));

            }

        }
    };

    useEffect(() => {
        if (loadType === 'both') {
            const peopleData = JSON.parse(window.localStorage.getItem('people'));
            !peopleData ? setPeoples([]) : setPeoples(peopleData);
            const relationData = JSON.parse(window.localStorage.getItem('relationType'));
            !relationData ? setRelationType([]) : setRelationType(relationData)
        } else if (loadType === 'people') {
            const peopleData = JSON.parse(window.localStorage.getItem('people'));
            !peopleData ? setPeoples([]) : setPeoples(peopleData);
        } else {
            const relationData = JSON.parse(window.localStorage.getItem('relationType'));
            !relationData ? setRelationType([]) : setRelationType(relationData)
        }
    }, [loadData])

    return (
        <div>
            <div className="App main">
                <div className='border bg-white w-50 p-3 border-1 rounded mx-auto my-5'>
                    <div className="row">
                        <AddPeople handelReload={handelReload} />
                        <AddRelationType handelReload={handelReload} />
                        <hr />
                    </div>




                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-xl-4 col-4">
                                Select People
                                <select /* onChange={handelSelectPeople2} */ {...register("name")} className="form-select" required>
                                    {
                                        peoples.length > 0 && peoples.map((person, index) => <option key={index}>{person}</option>)
                                    }

                                </select>
                            </div>

                            <div className="col-xl-4 col-4">
                                Select Relation
                                <select className="form-select" required>
                                    {
                                        relationType.length > 0 && relationType.map((relation, index) => <option key={index}>{relation}</option>)
                                    }

                                </select>

                            </div>

                            <div className="col-xl-4 col-4">
                                Select People
                                <select {...register("friendName")} className="form-select" required>
                                    {
                                        peoples.length > 0 && peoples.map((person, index) => <option key={index}>{person}</option>)
                                    }

                                </select>
                            </div>


                            <button className="btn btn-outline-secondary mt-3" type="submit" id="button-addon2">Add Now</button>


                        </div>
                    </form>
                    <hr />
                    <DosCal />
                </div>
            </div>
        </div>
    );
};

export default Home;