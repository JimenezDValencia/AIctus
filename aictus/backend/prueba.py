import joblib

# Cargar el modelo
model = joblib.load("modelo_entrenado.pkl")

# Crear un ejemplo de prueba
ejemplo = [[65, 1, 0, 28.5, 110.0, 0, 1, 0]]  # Ajustar si es necesario

# Obtener las probabilidades
probas = model.predict_proba(ejemplo)
print("Probabilidades:", probas)
print("Clases:", model.classes_)
