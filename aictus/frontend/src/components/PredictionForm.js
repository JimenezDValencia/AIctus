import React, { useState } from 'react';

function PredictionForm() {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    avg_glucose: '',
    smoker: '0',
    hypertension: '0',
    heart_disease: '0'
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseFloat(formData.age),
          bmi: parseFloat(formData.bmi),
          avg_glucose: parseFloat(formData.avg_glucose),
          smoker: parseInt(formData.smoker),
          hypertension: parseInt(formData.hypertension),
          heart_disease: parseInt(formData.heart_disease)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error en la solicitud');
      } else {
        const data = await response.json();
        setResult(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Predicción de Stroke</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Edad (años):</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>IMC:</label>
          <input type="number" step="any" name="bmi" value={formData.bmi} onChange={handleChange} required />
        </div>
        <div>
          <label>Nivel Promedio de Glucosa:</label>
          <input type="number" step="any" name="avg_glucose" value={formData.avg_glucose} onChange={handleChange} required />
        </div>
        <div>
          <label>Fumador:</label>
          <select name="smoker" value={formData.smoker} onChange={handleChange}>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </div>
        <div>
          <label>Hipertensión:</label>
          <select name="hypertension" value={formData.hypertension} onChange={handleChange}>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </div>
        <div>
          <label>Enfermedad Cardíaca:</label>
          <select name="heart_disease" value={formData.heart_disease} onChange={handleChange}>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Resultados</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.input).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>Predicción:</strong> {result.prediction_text}
          </p>
          <p>
            <strong>Probabilidad estimada:</strong> {result.probability}
          </p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
