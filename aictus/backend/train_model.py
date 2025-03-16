# train_model.py

# --- Librerías ---
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import random
import warnings
warnings.filterwarnings('ignore')

from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from sklearn.model_selection import train_test_split

import pickle

# --- Carga de datos ---
df = pd.read_csv("dataset/stroke_4.csv") 

# One-hot encoding a las columnas categóricas (se elimina la primera categoría para evitar la trampa de las variables dummy)
df_model = pd.get_dummies(df, 
                          columns=["rango_glicemia_promedio", "rango_etario", "rango_imc"],
                          drop_first=True)

# Separación de características (X) y variable objetivo (y)
X = df_model.drop(columns=["stroke"])
y = df_model["stroke"]

# División de conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# --- Entrenamiento de Modelos ---

# Modelo de Regresión Logística
lr = LogisticRegression(
    C=10,
    penalty='l2',
    solver='saga',
    max_iter=1000,
    random_state=42
)
lr.fit(X_train, y_train)
y_pred = lr.predict(X_test)
y_pred_proba = lr.predict_proba(X_test)[:, 1]
acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_pred_proba)

# Modelo de Red Neuronal (MLP)
mlp = MLPClassifier(
    hidden_layer_sizes=(100,), 
    activation='tanh',
    random_state=42,
    alpha=0.001,
    learning_rate_init=0.001
)
mlp.fit(X_train, y_train)
y_pred_mlp = mlp.predict(X_test)
y_pred_proba_mlp = mlp.predict_proba(X_test)[:, 1]
acc_mlp = accuracy_score(y_test, y_pred_mlp)
prec_mlp = precision_score(y_test, y_pred_mlp)
recall_mlp = recall_score(y_test, y_pred_mlp)
f1_mlp = f1_score(y_test, y_pred_mlp)
auc_mlp = roc_auc_score(y_test, y_pred_proba_mlp)

# VotingClassifier combinando ambos modelos (votación suave)
voting_clf = VotingClassifier(
    estimators=[('mlp', mlp), ('lr', lr)],
    voting='soft'
)
voting_clf.fit(X_train, y_train)
y_pred_voting = voting_clf.predict(X_test)
y_pred_proba_voting = voting_clf.predict_proba(X_test)[:, 1]
acc_voting = accuracy_score(y_test, y_pred_voting)
prec_voting = precision_score(y_test, y_pred_voting)
recall_voting = recall_score(y_test, y_pred_voting)
f1_voting = f1_score(y_test, y_pred_voting)
auc_voting = roc_auc_score(y_test, y_pred_proba_voting)

print("Métricas del VotingClassifier:")
print(f"Accuracy: {acc_voting:.4f}")
print(f"Precision: {prec_voting:.4f}")
print(f"Recall: {recall_voting:.4f}")
print(f"F1 Score: {f1_voting:.4f}")
print(f"AUC-ROC: {auc_voting:.2f}")

# --- Guardar el Modelo y las Columnas de Entrenamiento ---
# Guardamos el modelo VotingClassifier en 'voting_clf.pkl'
with open('voting_clf.pkl', 'wb') as f:
    pickle.dump(voting_clf, f)

# Guardamos la lista de columnas de entrenamiento en 'train_columns.pkl'
train_columns = X_train.columns.tolist()
with open('train_columns.pkl', 'wb') as f:
    pickle.dump(train_columns, f)

print("El modelo y las columnas de entrenamiento han sido guardados exitosamente.")
