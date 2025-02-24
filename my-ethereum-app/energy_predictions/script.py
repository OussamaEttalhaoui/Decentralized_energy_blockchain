# # Guide Détaillé pour Entraînement et Prédiction avec Visualisation

# # Étape 1 : Importer les bibliothèques nécessaires
# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_squared_error

# # Étape 2 : Charger le dataset pour l'entraînement
# train_data = pd.read_csv("energy_transactions_dataset.csv")

# # Afficher les 5 premières lignes pour vérifier les données
# print(train_data.head())

# # Étape 3 : Préparer les données pour l'entraînement
# # Sélectionner les fonctionnalités (X) et la variable cible (y)
# X = train_data[["Quantity", "EnergyType"]]
# y = train_data["PricePerUnit"]

# # Convertir les types d'énergie en valeurs numériques (si ce n'est pas déjà fait)
# X["EnergyType"] = X["EnergyType"].astype('category').cat.codes

# # Diviser les données en ensembles d'entraînement et de test
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Étape 4 : Entraîner le modèle
# model = LinearRegression()
# model.fit(X_train, y_train)

# # Étape 5 : Évaluer le modèle sur l'ensemble de test
# y_pred = model.predict(X_test)
# mse = mean_squared_error(y_test, y_pred)
# print(f"Mean Squared Error sur l'ensemble de test : {mse}")

# # Étape 6 : Charger le dataset pour la prédiction
# predict_data = pd.read_csv("energy_predictions_dataset.csv")

# # Afficher les 5 premières lignes pour vérifier les données
# print(predict_data.head())
# print(predict_data.columns)


# # Étape 7 : Préparer les données pour la prédiction
# X_predict = predict_data[["Quantity", "EnergyType"]]
# X_predict["EnergyType"] = X_predict["EnergyType"].astype('category').cat.codes

# # Étape 8 : Prédire les prix
# predicted_prices = model.predict(X_predict)
# predict_data["PredictedPrice"] = predicted_prices

# # Afficher les résultats des prédictions
# print(predict_data)

# # Étape 9 : Visualisation des résultats
# plt.figure(figsize=(10, 6))

# # Graphique des données prédites
# plt.scatter(predict_data["Quantity"], predict_data["PredictedPrice"], color='blue', label='Prix Prédit', alpha=0.6)

# # Configuration du graphique
# plt.title("Prédictions des Prix en fonction de la Quantité")
# plt.xlabel("Quantité")
# plt.ylabel("Prix Prédit")
# plt.legend()
# plt.grid(True)
# plt.show()

# # Étape 10 : Sauvegarder les résultats dans un fichier CSV
# predict_data.to_csv("predicted_results.csv", index=False)
# print("Les résultats des prédictions ont été sauvegardés dans 'predicted_results.csv'.")




# Étape 1 : Importer les bibliothèques nécessaires
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Étape 2 : Charger le dataset pour l'entraînement
train_data = pd.read_csv("energy_transactions_dataset.csv")

# Afficher les 5 premières lignes pour vérifier les données
print(train_data.head())

# Vérification des colonnes et des types de données
print(train_data.info())

# Étape 3 : Préparer les données pour l'entraînement
# Sélectionner les fonctionnalités (X) et la variable cible (y)
X = train_data[["Quantity", "EnergyType"]]
y = train_data["PricePerUnit"]

# Convertir les types d'énergie en valeurs numériques
# Utiliser une copie pour éviter l'avertissement SettingWithCopyWarning
X = X.copy()
X["EnergyType"] = X["EnergyType"].astype('category').cat.codes

# Diviser les données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Étape 4 : Entraîner le modèle
model = LinearRegression()
model.fit(X_train, y_train)

# Étape 5 : Évaluer le modèle sur l'ensemble de test
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error sur l'ensemble de test : {mse}")

# Étape 6 : Charger le dataset pour la prédiction
predict_data = pd.read_csv("energy_predictions_dataset.csv")

# Afficher les 5 premières lignes pour vérifier les données
print(predict_data.head())
print(predict_data.columns)

# Étape 7 : Préparer les données pour la prédiction
# Vérifier et traiter les valeurs manquantes
predict_data = predict_data.dropna(subset=["Quantity", "EnergyType"])

X_predict = predict_data[["Quantity", "EnergyType"]]
X_predict["EnergyType"] = X_predict["EnergyType"].astype('category').cat.codes

# Étape 8 : Prédire les prix
predicted_prices = model.predict(X_predict)
predict_data["PredictedPrice"] = predicted_prices

# Afficher les résultats des prédictions
print(predict_data)

# Étape 9 : Calculer les prix moyens par type d'énergie
# Inverser la conversion du code en type d'énergie pour une meilleure lisibilité
energy_type_mapping = {code: energy for energy, code in enumerate(predict_data["EnergyType"].unique())}
predict_data["EnergyTypeLabel"] = predict_data["EnergyType"].map(energy_type_mapping)

# Calcul du prix moyen par type d'énergie
price_by_energy_type = predict_data.groupby("EnergyTypeLabel")["PredictedPrice"].mean()
print("Prix moyen par type d'énergie :")
print(price_by_energy_type)

# Vérification si le DataFrame est vide
if price_by_energy_type.empty:
    print("Erreur : Aucun résultat à afficher. Le DataFrame price_by_energy_type est vide.")
else:
    # Étape 10 : Visualisation des prix moyens par type d'énergie (graphe en barres)
    plt.figure(figsize=(10, 6))
    price_by_energy_type.plot(kind='bar', color='orange')

    # Configuration du graphique
    plt.title("Prix moyen prédit par type d'énergie")
    plt.xlabel("Type d'Énergie")
    plt.ylabel("Prix moyen (USD)")
    plt.grid(True)
    plt.show()

# Étape 11 : Sauvegarder les résultats dans un fichier CSV
predict_data.to_csv("predicted_results.csv", index=False)
print("Les résultats des prédictions ont été sauvegardés dans 'predicted_results.csv'.")
