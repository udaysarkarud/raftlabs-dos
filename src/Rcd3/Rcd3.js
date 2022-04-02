import React from 'react';
import { Graph } from "d3";

const Rcd3 = () => {
    const data = {
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
        ],
    };
    console.log(data)

  
    return (
        <div>
            
        </div>
    );
};

export default Rcd3;