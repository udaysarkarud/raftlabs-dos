import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const DosCal = () => {
    const [dos,setDos]=useState([])
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const getData = JSON.parse(window.localStorage.getItem('relationData')) || [];
        if (getData.length < 0) {
            console.log('nothing to search')
        } else {
            // preprocess a JSON list of connections to an adjacency list Graph
            function connectionsListToGraph(connections) {
                const Graph = {}
                for (let { name, friends } of connections) {
                    Graph[name] = friends // allow fast lookup of a given person's friends
                }

                return Graph
            }

            // return the list of connections between source and target
            function getConnections(source, target, connections) {

                const Graph = connectionsListToGraph(connections)
                const connectionPaths = []

                function findConnectionsDFS(source, target, path = [source], visited = {}) {
                    // Don't search/visit the same friend twice (to avoid infinite loops)
                    if (visited[source]) return;

                    // mark that we've searched the current source friend
                    visited[source] = true;

                    for (let friend of Graph[source]) {
                        if (friend === target) {
                            connectionPaths.push(path.concat(target));
                        } else {
                            findConnectionsDFS(friend, target, path.concat(friend), visited)
                        }
                    }
                }
                findConnectionsDFS(source, target);
                return connectionPaths;
            }
            setDos(getConnections(data.person1, data.person2, getData))
        }

    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="col-xl-6 col-12">
                    <div className='text-center'>
                        <h5>Person Name - 2</h5>

                        <div className="input-group mb-3">
                            <input {...register("person1")} type="text" className="form-control" placeholder="Person-1" required/>

                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-12">
                    <div className='text-center'>
                        <h5>Person Name - 2</h5>

                        <div className="input-group mb-3">
                            <input {...register("person2")} type="text" className="form-control" placeholder="Person-2" required/>

                        </div>

                    </div>
                </div>
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Check degree of separation</button>
            </form>
            <ol className='fs-5 m-3'>
            {
                dos.map((item,index)=><li key={index}>{item.join(" > ")}</li>)
            }
            </ol>
        </>
    );
};

export default DosCal;