Este repositorio contiene notebooks que constituyen la base para la experimentación con distintas estrategias de preprocesamiento y ajuste de hiperparámetros en la predicción de accidente cerebrovascular (ACV).

AIctus_preprocesamiento.ipynb, preprocesa el dataset stroke.csv. El preprocesamiento finaliza con la generación de datos sintéticos mediante CTGAN y almacenando el dataset balanceado como un archivo CSV. 
Dejo como muestra, el dataset balanceado generado "stroke_4.csv".

AIctus_modelos.ipynb, carga el dataset balanceado, prepara los datos con One Hot Encoding, separa en grupo entrenamiento y prueba, y es utilizado para entrenar distintos algoritmos de ML. Contiene además, pruebas de overfitting, robustez y generalización que pueden ser utilizados según el contexto de los datos.

Estos notebooks pueden ser utilizados como base para experimentar distintas otras estrategias de preprocesamiento o hiperparámetros de algoritmos.

Requisitos en requirements.txt

Contribución:
Este repositorio está pensado para servir como base para la investigación y experimentación. Se invita a contribuir con nuevas estrategias de preprocesamiento o mejoras en el entrenamiento y evaluación de modelos.

