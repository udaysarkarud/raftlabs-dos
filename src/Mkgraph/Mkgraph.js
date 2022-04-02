import React from 'react';
const { Graph, Node } = require('mkgraph')

const Mkgraph = () => {
    const g = new Graph();
    const users = ['Sameer', 'Aayushi', 'Bhaskar', 'Kamalnath Sharma', 'Shanti Kumar Saha', 'Bhaskar'];
    const fndlist = [
        { fnd1: 'Sameer', fnd2: 'Aayushi' },
        { fnd1: 'Aayushi', fnd2: 'Bhaskar' },
        { fnd1: 'Sameer', fnd2: 'Kamalnath Sharma' },
        { fnd1: 'Kamalnath Sharma', fnd2: 'Shanti Kumar Saha' },
        { fnd1: 'Shanti Kumar Saha', fnd2: 'Bhaskar' },
    ]

    users.map(name => g.add(name))
    fndlist.map(fnds => g.drawEdge(fnds.fnd1, fnds.fnd2))


    const getArray = g.shortestPath('Sameer', 'Bhaskar')

    console.log(getArray)
    return (
        <div>
            {getArray}
        </div>
    );
};

export default Mkgraph;