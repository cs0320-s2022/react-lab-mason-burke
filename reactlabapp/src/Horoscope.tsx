import React, {useState} from "react";
import "./TextBox"
import logo from "./logo.svg"
import TextBox from "./TextBox";
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from "axios";

function Horoscope() {
    const [sun, setSun]: [string, React.Dispatch<string>] = useState("");
    const [moon, setMoon]: [string, React.Dispatch<string>] = useState("");
    const [rising, setRising]: [string, React.Dispatch<string>] = useState("");

    // Look at the HoroscopeHandler's response in Main.java to choose a default useState value.
    const [horoscope, setHoroscope]:
        [Array<string>, React.Dispatch<Array<string>>] = useState([""]);

    const requestHoroscope = () => {
        const toSend = {
            //Pass in the values for the data. Follow the format the route expects!
            sun : sun,
            moon: moon,
            rising: rising
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        // Make post request
        axios.post("http://localhost:4567/horoscope", toSend, config)
            .then(response => {
                console.log(response.data);
                setHoroscope(response.data["horoscope"]);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="Horoscope">
            <h1 className="Horoscope-header">
                H<img className="animate, App-logo" src={logo}/>r<img className="animate, App-logo" src={logo}/>sc<img className="animate, App-logo" src={logo}/>pe
            </h1>
            <TextBox label={"Enter Sun Sign: "} change={(event: { target: { value: string; }; }) => setSun(event.target.value)}/>
            <TextBox label={"Enter Moon Sign: "} change={(event: { target: { value: string; }; }) => setMoon(event.target.value)}/>
            <TextBox label={"Enter Rising Sign: "} change={(event: { target: { value: string; }; }) => setRising(event.target.value)}/>
            <b/>
            <AwesomeButton type="primary" onPress={() => requestHoroscope()}>Submit</AwesomeButton>
            <div>
                {horoscope.map(trait => (
                    <div className="trait">{trait}</div>
                ))
                }
            </div>
        </div>

    );
}

export default Horoscope;