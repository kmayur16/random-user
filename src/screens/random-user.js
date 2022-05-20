import React, { useState, useContext, createContext } from "react";
import '../App.css';
import useWindowDimensions from "../Dimensions/window";
export default function RandomUser() {

    const [data, setData] = useState([]);
    const [dispData, setDispData] = useState([]);
    const [gender, setGender] = useState('')
    const [loc, setLoc] = useState('');
    const RandomUserContext = createContext();
    const { width, height } = useWindowDimensions()

    React.useEffect(() => {
        fetch(`https://randomuser.me/api/?results=100`)
            .then(response => response.json())
            .then(setData);
    }, [])

    React.useEffect(() => {
        setDispData(data?.results)
    }, [data])
    React.useEffect(() => {
        if (gender !== 'all') {
            var genderData;
            genderData = data?.results?.filter(
                (e) => e.gender === gender
            );
            setDispData(genderData);
        }
        else {
            setDispData(data?.results);
        }
    }, [gender])

    React.useEffect(() => {
        if (loc) {
            var locData;
            locData = data?.results?.filter((e) => e.nat === loc);
            setDispData(locData)
        }
    }, [loc]);
    console.log("data", data, window.width, "width", width, "height", height);
    function DisplayCard() {
        const randomUser = useContext(RandomUserContext);
        return (
            <div className="carddiv">
                {randomUser?.map(res =>
                (

                    <div className="card">

                        <div className="first">
                            <img style={{
                                padding: '5px 0 5px 0',
                                borderRadius: '8px'
                            }} src={window.innerWidth <= 620 ? res.picture.large : res.picture.medium}></img>
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

    function NationalityDropdown() {
        return (
            <div>
                <p style={{ fontWeight: 'bold', opacity: 0.8 }}>Select Nationality:</p>
                <select className="nationality" id="nationality"
                    value={loc}
                    onChange={(e) => {
                        setLoc(e.target.value);
                    }}
                >
                    <option>AU</option>
                    <option>BR</option>
                    <option>CA</option>
                    <option>CH</option>
                    <option>DE</option>
                    <option>DK</option>
                    <option>ES</option>
                    <option>FI</option>
                    <option>FR</option>
                    <option>GB</option>
                    <option>IR</option>
                    <option>IE</option>
                    <option>NO</option>
                    <option>NL</option>
                    <option>NZ</option>
                    <option>TR</option>
                    <option>US</option>
                </select>
            </div>
        )
    }

    return (
        <div>
            <div className="genderdiv" onChange={(e) => {
                setGender(e.target.value);
            }}>
                <div>
                    <input type={'radio'} style={{ color: '#747474' }} value='male' name="gender" /> Male
                </div>
                <div>
                    <input type={'radio'} style={{ color: '#747474' }} color='#747474' value='female' name="gender" /> Female
                </div>
                <div>
                    <input type={'radio'} value='all' name="gender" defaultChecked /> All
                </div>
            </div>
            <div className="nationdiv">
                <NationalityDropdown />
            </div>
            <RandomUserContext.Provider value={dispData}>
                <DisplayCard randomUser={dispData} />
            </RandomUserContext.Provider>
        </div>
    )
}
