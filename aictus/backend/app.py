from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

# Inicializa Flask y habilita CORS
app = Flask(__name__)
CORS(app)

# Carga el modelo y las columnas de entrenamiento desde archivos pickle
with open('voting_clf.pkl', 'rb') as f:
    voting_clf = pickle.load(f)
with open('train_columns.pkl', 'rb') as f:
    train_columns = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Validación y extracción de datos
    try:
        age = float(data.get('age'))
        bmi = float(data.get('bmi'))
        avg_glucose = float(data.get('avg_glucose'))
        smoker = int(data.get('smoker'))
        hypertension = int(data.get('hypertension'))
        heart_disease = int(data.get('heart_disease'))
    except Exception as e:
        return jsonify({'error': 'Datos de entrada inválidos', 'message': str(e)}), 400

    # --- Paso 2: Mapear variables numéricas a categorías ---
    # Mapeo para "rango_etario"
    if age <= 12:
        rango_etario = "infante"
    elif age <= 17:
        rango_etario = "adolescente"
    elif age <= 39:
        rango_etario = "adulto_joven"
    elif age <= 59:
        rango_etario = "adulto"
    elif age <= 74:
        rango_etario = "anciano_joven"
    else:
        rango_etario = "anciano"

    # Mapeo para "rango_imc"
    if bmi <= 18.5:
        rango_imc = "bajo_peso"
    elif bmi <= 24.9:
        rango_imc = "saludable"
    elif bmi <= 29.9:
        rango_imc = "sobrepeso"
    else:
        rango_imc = "obeso"

    # Mapeo para "rango_glicemia_promedio"
    if avg_glucose <= 70:
        rango_glicemia_promedio = "baja"
    elif avg_glucose <= 100:
        rango_glicemia_promedio = "normal"
    elif avg_glucose <= 125:
        rango_glicemia_promedio = "alta"
    elif avg_glucose <= 200:
        rango_glicemia_promedio = "muy_alta"
    else:
        rango_glicemia_promedio = "extremadamente_alta"

    # --- Paso 3: Construir el DataFrame de entrada ---
    input_data = pd.DataFrame({
        "hypertension": [hypertension],
        "heart_disease": [heart_disease],
        "smoker": [smoker],
        "rango_etario": [rango_etario],
        "rango_imc": [rango_imc],
        "rango_glicemia_promedio": [rango_glicemia_promedio]
    })

    # --- Paso 4: Transformar la entrada para que coincida con el formato de entrenamiento ---
    input_data_encoded = pd.get_dummies(input_data, 
                                        columns=["rango_etario", "rango_imc", "rango_glicemia_promedio"])
    input_data_encoded = input_data_encoded.reindex(columns=train_columns, fill_value=0)

    # --- Paso 5: Realizar la predicción ---
    pred = voting_clf.predict(input_data_encoded)
    pred_proba = voting_clf.predict_proba(input_data_encoded)[:, 1]

    # Preparar la respuesta (incluyendo los valores ingresados)
    result = {
        "input": {
            "Edad": age,
            "Nivel de glicemia promedio": (avg_glucose," ","(",rango_glicemia_promedio,")",),
            "Fumador": "Sí" if smoker == 1 else "No",
            "Hipertensión": "Sí" if hypertension == 1 else "No",
            "Cardiopatías": "Sí" if heart_disease == 1 else "No",
            "IMC": (bmi," ","(",rango_imc,")",),
           
        },
        "prediction": int(pred[0]),
        "prediction_text": "Existe riesgo de Ictus" if pred[0] == 1 else "No existe riesgo de Ictus",
        "probability": f"{pred_proba[0] * 100:.2f}%"
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
