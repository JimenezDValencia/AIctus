Este repositorio contiene:
# 🏥 **Aplicación AIctus**:
Más información dentro de la carpeta AIctus.

# 📓 Notebooks:
Estos Notebooks pueden servir como base para la experimentación con distintas estrategias de preprocesamiento y ajuste de hiperparámetros en la predicción de accidente cerebrovascular (ACV):
  - **AIctus_preprocesamiento.ipynb**, preprocesa el dataset stroke.csv. El preprocesamiento finaliza con la generación de datos sintéticos mediante CTGAN y almacenando el dataset balanceado como un archivo CSV. (Dejo como muestra, el dataset balanceado generado "stroke_4.csv".)
  - **AIctus_modelos.ipynb**, carga el dataset balanceado, prepara los datos con One Hot Encoding, separa en grupo entrenamiento y prueba, y entrena distintos algoritmos de ML. Contiene además, pruebas de overfitting, robustez y generalización que pueden ser usados según el contexto de los datos.

📌 Requisitos en requirements.txt

---
⭐ **Contribución**:
Este repositorio está pensado para servir como base para la investigación y experimentación. Se invita a contribuir con nuevas estrategias de preprocesamiento o mejoras en el entrenamiento y evaluación de modelos.

