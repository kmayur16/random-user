import React from "react";

export default function DisplayCard({ randomUser }) {
    return (
        <div className="carddiv">
            {randomUser?.map(res =>
            (

                <div className="card">
                    <div className="first">
                        <img style={{
                            padding: '5px 0 5px 0',
                            borderRadius: '8px'
                        }} alt='thumbnail' src={window.innerWidth <= 620 ? res.picture.large : res.picture.medium} />
                        <p className="name">{res.name.title} {res.name.first} {res.name.last} ({res.nat})</p>
                    </div>
                    <div className="emaildiv">
                        <p className="email">Email: {res.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}