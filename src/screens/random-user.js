import React, { useState, useContext, createContext } from "react";
import '../App.css'
export default function RandomUser() {

    const [data, setData] = useState([]);
    const [dispData, setDispData] = useState([]);
    const [gender, setGender] = useState('')
    const [loc, setLoc] = useState('');
    const RandomUserContext = createContext();

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

    function DisplayCard() {
        const randomUser = useContext(RandomUserContext);
        return (
            <div>
                {randomUser?.map(res =>
                (

                    <div className="card">

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // backgroundColor: 'red',
                            justifyContent: 'space-between',
                            width: '300px'
                        }}>
                            <img style={{
                                padding: '5px 0 5px 0',
                                // margin: 0,
                                borderRadius: '8px'
                                // width: '80px'
                            }} src={res.picture.medium}></img>
                            <p style={{
                                alignSelf: 'center',
                                color: '#8e838c',
                                width: '180px'
                            }}>{res.name.title} {res.name.first} {res.name.last} ({res.nat})</p>
                        </div>
                        <div style={{ display: 'flex', paddingInlineEnd: '30px' }}>
                            <p style={{ alignSelf: 'center', alignItems: 'stretch', color: '#868889' }}>Email: {res.email}</p>
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
            <div style={{
                flexDirection: 'column',
                display: 'flex',
                marginLeft: '60px',
                marginTop: '10px'
            }} onChange={(e) => {
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
            <div style={{
                marginLeft: '65px',
            }}>
                <NationalityDropdown />
            </div>
            <RandomUserContext.Provider value={dispData}>
                <DisplayCard randomUser={dispData} />
            </RandomUserContext.Provider>
        </div>
    )
}
