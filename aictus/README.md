# 🧠 Predicción de Infarto Cerebral

Esta aplicación web permite estimar el riesgo de infarto cerebral a partir de características relevantes clínicas y demográficas del paciente, utilizando un modelo de machine learning basado en un `VotingClassifier` que combina `LogisticRegression` y `MLPClassifier`.

---

## ⚙️ Tecnologías utilizadas

- 🐍 **Flask**: Backend para la creación de la API de predicción.  
- ⚛️ **React**: Frontend interactivo para la interfaz web.  
- 🧠 **Scikit-Learn**: Para entrenar el modelo predictivo.  
- 📊 **Pandas / NumPy**: Manipulación y análisis de datos.  
- 📦 **Picle**: Cargar y guardar el modelo entrenado.  
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
git clone https://github.com/JimenezDValencia/AIctus.git
cd AIctus

```
### 2️⃣ Configurar el Backend (Flask)

🔹 Crear un entorno virtual (opcional pero recomendado)
```bash
python -m venv venv
source venv/bin/activate  # En macOS/Linux
venv\Scripts\activate  # En Windows
```
🔹 Instalar las dependencias
```bash
pip install -r backend/requirements.txt
```
🔹 Entrenar el modelo (solo si es necesario)
```bash
python backend/train_model.py
```
🔹 Ejecutar la API Flask
```bash
python backend/app.py
```
Esto iniciará el servidor en http://127.0.0.1:5000/.
---

### 3️⃣ Configurar Frontend (React)

🔹 Instalar dependencias de React
```bash
cd frontend
npm install
```
🔹 Ejecutar la aplicación
```bash
npm start
```
Esto iniciará la interfaz web en http://localhost:3000.
---

🚀 Mejoras Futuras

- 📌 Que en la respuesta, además del porcentaje de riesgo, entregue una clasificación de riesgo (riesgo escaso, bajo, moderado, alto     riesgo)
- 📌 Agregar autenticación con JWT 🔑
- 📌 Implementar un sistema de almacenamiento de historial 📊
- 📌 Deploy en un servidor en la nube 🌐
- 📌 Experimentar con distintos modelos hasta llegar al definitivo


👨‍💻 Autor

 - Desarrollado por: Dani
 - GitHub: JimenezDValencia

⭐ Contribuciones

Si quieres mejorar este proyecto, ¡haz un fork y envía un Pull Request! 🤝

