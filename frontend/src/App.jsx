import { useEffect, useState } from "react";
import "./App.css";

function isEvenNumber(value) {
  return Number.isInteger(value) && value % 2 === 0;
}

function shouldHighlight(currency, value) {
  return currency === "HKD" || isEvenNumber(value);
}

function formatRate(value) {
  return value.toFixed(4);
}

function App() {
  const [rates, setRates] = useState({});
  const [adjustedRates, setAdjustedRates] = useState({});
  const [base, setBase] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/rates")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch currency rates");
        }

        return response.json();
      })
      .then((data) => {
        setRates(data.rates);
        setBase(data.base);
        setDate(data.date);

        const newRates = {};

        Object.entries(data.rates).forEach(([currency, value]) => {
          newRates[currency] = value + 10.0002;
        });

        setAdjustedRates(newRates);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="page">
        <div className="status-card">
          <div className="spinner"></div>
          <p>Loading currency rates...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="status-card error">
          <h2>Unable to load rates</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <div>
            <p className="eyebrow">LIVE EXCHANGE DATA</p>
            <h1>Forex Rates</h1>
            <p className="subtitle">
              Currency exchange rates retrieved from Fixer API
            </p>
          </div>

          <div className="date-card">
            <span>Base</span>
            <strong>{base}</strong>
            <small>{date}</small>
          </div>
        </header>

        <section className="info-card">
          <div>
            <span className="info-label">Currencies</span>
            <strong>{Object.keys(rates).length}</strong>
          </div>

          <div>
            <span className="info-label">Adjustment</span>
            <strong>+10.0002</strong>
          </div>

          <div>
            <span className="info-label">Highlighted</span>
            <strong>Even / HKD</strong>
          </div>
        </section>

        <section className="table-card">
          <div className="table-header">
            <div>
              <h2>Exchange Rates</h2>
              <p>Original rates compared with adjusted values</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Original Rate</th>
                  <th>Adjusted Rate</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(rates).map(([currency, value]) => (
                  <tr key={currency}>
                    <td>
                      <span className="currency-badge">{currency}</span>
                    </td>

                    <td
                      className={
                        shouldHighlight(currency, value)
                          ? "highlight"
                          : ""
                      }
                    >
                      {formatRate(value)}
                    </td>

                    <td
                      className={
                        shouldHighlight(
                          currency,
                          adjustedRates[currency]
                        )
                          ? "highlight"
                          : ""
                      }
                    >
                      {formatRate(adjustedRates[currency])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="legend">
            <span className="legend-border"></span>
            <span>Red border indicates an even number or HKD</span>
          </div>
        </section>

        <footer>
          <p>Forex Rates Assessment</p>
        </footer>
      </div>
    </main>
  );
}

export default App;