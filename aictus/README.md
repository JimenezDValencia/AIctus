# 🧠 Predicción de Infarto Cerebral

Esta aplicación web permite predecir el riesgo de infarto cerebral a partir de características relevantes del paciente, utilizando un modelo de machine learning basado en un `VotingClassifier` que combina RandomForest, Gradient Boosting y KNN.

---

## ⚙️ Tecnologías utilizadas

- 🐍 **Flask**: Backend para la creación de la API de predicción.  
- ⚛️ **React**: Frontend interactivo y amigable para el usuario.  
- 🧠 **Scikit-Learn**: Para entrenar el modelo predictivo.  
- 📊 **Pandas / NumPy**: Manipulación y análisis de datos.  
- 📦 **Joblib**: Cargar y guardar el modelo entrenado.  
- 🎨 **React-Bootstrap**: Interfaz sencilla pero profesional.  
- 🔌 **Flask-CORS**: Permite la comunicación entre frontend y backend.  

---

## 🚀 **Requisitos previos**

Antes de iniciar, asegúrate de tener instalado lo siguiente:

- Python 3.10 o superior  
- Node.js y npm  
- Git (opcional)  

---

## 🛠️ **Pasos para ejecutar la aplicación**

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/prediccion-infarto-cerebral.git
cd prediccion-infarto-cerebral


#########################################################################################
cd backend
# Crear el entorno virtual
python -m venv env
# Activar el entorno virtual
# En Windows:
.\env\Scripts\activate
# En Linux/Mac:
source env/bin/activate

# Anaconda
conda create --env python=3.x
conda activate env

pip install -r requirements.txt


#########################################################################################
python train_model.py

python app.py

cd frontend

npm install

npm start
