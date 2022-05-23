import React, { useState, useContext, createContext } from "react";
import '../App.css';
import NationalityDropdown from "./NationalityDropdown";
import GenderSelection from "./GenderSelection";
import DisplayCard from "./DisplayCard";

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

    function DisplayCards() {
        const randomUser = useContext(RandomUserContext);
        return (
            <DisplayCard randomUser={randomUser} />
        )
    }

    return (
        <div>
            <GenderSelection onChange={(e) => setGender(e.target.value)} />
            <div className="nationdiv">
                <NationalityDropdown onChange={(e) => setLoc(e.target.value)} value={loc} />
            </div>
            <RandomUserContext.Provider value={dispData}>
                <DisplayCards randomUser={dispData} />
            </RandomUserContext.Provider>
        </div>
    )
}
