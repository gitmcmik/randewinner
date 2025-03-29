import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [flower, setFlower] = useState("");

  // Function to send data to Discord webhook
  const sendToDiscord = () => {
    const webhookURL = "https://discord.com/api/webhooks/1355256889327226990/kNJMuiR5A7id2GYe2VKHVc3Zbz6VLQK5d3catD2V7q47mnct-z3rA7wqwmP5NaikwDMU";
    const embed = {
      title: "New Date! 💖",
      color: 0x00ff00,
      fields: [
        { name: "Imie", value: name || "Nie podano, wtf jak", inline: true },
        { name: "Data", value: date || "Nie podano, wtf jak", inline: true },
        { name: "Miejsce", value: location || "Nie podano, wtf jak", inline: true },
        { name: "Ulubiony kwiatuszek", value: flower || "Nie podano, wtf jak", inline: true },
      ],
    };

    fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });
  };

  // Function to move to the next step with validation
  const nextStep = () => {
    if (step === 1 && name.trim() !== "") {
      setStep(2);
    } else if (step === 2 && date.trim() !== "") {
      setStep(3);
    } else if (step === 3 && location.trim() !== "") {
      setStep(4);
    } else if (step === 4 && flower.trim() !== "") {
      setStep(5);
      sendToDiscord();
    } else {
      alert("Prosze, wypelnij wszystko zanim przejdziesz dalej.");
    }
  };

  return (
    <div className="container">
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="step-container">
          <h1>HEJA, KTO TAM?</h1>
          <input
            type="text"
            placeholder="Tu wpisz imie!!"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={nextStep}>Next</button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="step-container">
          <h1>Kiedy masz czas zlotko? 😘</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={nextStep}>Next</button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="step-container">
          <h1>Wybierz miejscówe na randewu 😜:</h1>
          <div className="location-options">
            <div
              className={`location-item ${location === "Spacer w parku" ? "selected" : ""}`}
              onClick={() => setLocation("Spacer w parku")}
            >
              <img src={process.env.PUBLIC_URL+"images/park.jpg"} alt="Park" />
              <div className="location-text">Spacer w parku</div>
            </div>
            <div
              className={`location-item ${location === "Restauracja" ? "selected" : ""}`}
              onClick={() => setLocation("Restauracja")}
            >
              <img src={process.env.PUBLIC_URL+"images/restaurant.jpg"} alt="Restauracja" />
              <div className="location-text">Restauracja</div>
            </div>
            <div
              className={`location-item ${location === "Jeziorko" ? "selected" : ""}`}
              onClick={() => setLocation("Jeziorko")}
            >
              <img src={process.env.PUBLIC_URL+"images/lake.jpg"} alt="Jeziorko" />
              <div className="location-text">Jeziorko</div>
            </div>
            <div
              className={`location-item ${location === "Noc filmowa" ? "selected" : ""}`}
              onClick={() => setLocation("Noc filmowa")}
            >
              <img src={process.env.PUBLIC_URL+"images/movie.jpg"} alt="Noc filmowa" />
              <div className="location-text">Noc filmowa</div>
            </div>
            <div
              className={`location-item ${location === "Park rozrywki" ? "selected" : ""}`}
              onClick={() => setLocation("Park rozrywki")}
            >
              <img src={process.env.PUBLIC_URL+"images/amusement.jpg"} alt="Park rozrywki" />
              <div className="location-text">Park rozrywki</div>
            </div>
          </div>
          <button onClick={nextStep}>Next</button>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="step-container">
          <h1>Jaki jest twoj ulubiony kwiatek? 🌷</h1>
          <input
            type="text"
            placeholder="Wpisuj tutaj"
            value={flower}
            onChange={(e) => setFlower(e.target.value)}
          />
          <button onClick={nextStep}>Wyslij odpowiedz</button>
        </motion.div>
      )}

      {step === 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="step-container">
          <h1>Odpowiedź wysłana! 🎉</h1>
        </motion.div>
      )}
    </div>
  );
}
