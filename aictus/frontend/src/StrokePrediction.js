// StrokePrediction.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

const StrokePrediction = () => {
  const [formData, setFormData] = useState({
    heart_disease: "",
    hypertension: "",
    smoker: "",
    rango_etario: "",
    rango_imc: "",
    rango_glicemia_promedio: ""
  });
  const [result, setResult] = useState(null);
  const [probability, setProbability] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setProbability(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      const { prediction, prediction_proba } = response.data;
      setResult(prediction);
      setProbability(prediction_proba);
    } catch (err) {
      setError("Error al obtener la predicción. Por favor, intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      heart_disease: "",
      hypertension: "",
      smoker: "",
      rango_etario: "",
      rango_imc: "",
      rango_glicemia_promedio: ""
    });
    setResult(null);
    setProbability(null);
    setError(null);
  };

  return (
    <Container className="mt-5">
      <h1>Predicción de Infarto Cerebral</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="heart_disease" className="mb-3">
          <Form.Label>Enfermedades cardíacas (0 = No, 1 = Sí)</Form.Label>
          <Form.Control
            type="number"
            name="heart_disease"
            value={formData.heart_disease}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="hypertension" className="mb-3">
          <Form.Label>Hipertensión (0 = No, 1 = Sí)</Form.Label>
          <Form.Control
            type="number"
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="smoker" className="mb-3">
          <Form.Label>¿Fuma? (0 = No, 1 = Sí)</Form.Label>
          <Form.Control
            type="number"
            name="smoker"
            value={formData.smoker}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="rango_etario" className="mb-3">
          <Form.Label>Rango Etario</Form.Label>
          <Form.Select
            name="rango_etario"
            value={formData.rango_etario}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="infante">Infante</option>
            <option value="adolescente">Adolescente</option>
            <option value="adulto_joven">Adulto joven</option>
            <option value="adulto">Adulto</option>
            <option value="anciano_joven">Anciano joven</option>
            <option value="anciano">Anciano</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="rango_imc" className="mb-3">
          <Form.Label>Rango de IMC</Form.Label>
          <Form.Select
            name="rango_imc"
            value={formData.rango_imc}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="bajo_peso">Bajo peso</option>
            <option value="saludable">Saludable</option>
            <option value="sobrepeso">Sobrepeso</option>
            <option value="obeso">Obeso</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="rango_glicemia_promedio" className="mb-3">
          <Form.Label>Rango de Glicemia Promedio</Form.Label>
          <Form.Select
            name="rango_glicemia_promedio"
            value={formData.rango_glicemia_promedio}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="baja">Baja</option>
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
            <option value="muy_alta">Muy alta</option>
            <option value="extremadamente_alta">Extremadamente alta</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Predecir"}
        </Button>{" "}
        <Button variant="secondary" onClick={handleReset}>
          Reiniciar
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {result !== null && (
        <Alert variant="info" className="mt-3">
          {result === 1 ? "⚠️ Riesgo de infarto cerebral alto" : "✅ Bajo riesgo de infarto cerebral"}
          <br />
          Probabilidad: {(probability * 100).toFixed(2)}%
        </Alert>
      )}
    </Container>
  );
};

export default StrokePrediction;
