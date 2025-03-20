Este repositorio contiene:
# 🏥 **Aplicación AIctus**:
Más información dentro de la carpeta AIctus.

# 📓 Notebooks:
Estos Notebooks pueden servir como base para la experimentación con distintas estrategias de preprocesamiento y ajuste de hiperparámetros en la predicción de accidente cerebrovascular (ACV):
  - **AIctus_preprocesamiento.ipynb**, preprocesa el dataset stroke.csv. El preprocesamiento finaliza con la generación de datos sintéticos mediante CTGAN y almacenando el dataset balanceado como un archivo CSV. (Dejo como muestra, el dataset balanceado generado "stroke_4.csv".)
  - **AIctus_modelos.ipynb**, carga el dataset balanceado, prepara los datos con One Hot Encoding, separa en grupo entrenamiento y prueba, y entrena distintos algoritmos de ML. Contiene además, pruebas de overfitting, robustez y generalización que pueden ser usados según el contexto de los datos.
  - ## En carpeta eda, se encuentran los ficheros de análisis que sirven de base para la toma de decisiones en preprocesamiento y modelamiento:
    - **eda_stroke.Rmd**, Análisis estadístico de datos. En R markdown. 
    - **analisis_nulos.ipynb**, Se intenta identificar el mecanismo subyacente de la ausencia de datos. 

---
⭐ **Contribución**:
Este repositorio está pensado para servir como base para la investigación y experimentación. Se invita a contribuir con nuevas estrategias de preprocesamiento o mejoras en el entrenamiento y evaluación de modelos.

