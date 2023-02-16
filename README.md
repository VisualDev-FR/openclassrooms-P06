# Openclassroom P06 - Développez une interface utilisateur pour une application web

Ce projet consiste à réaliser la page principale d'une application web de streaming vidéo JustStreamIt.

Cette application affiche des données retournées par une API Django qui nous est fournie, et est disponible sur le dépôt git suivant : <https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR>

La page principale doit contenir les éléments suivants :
* Une section "film en vedette", proposant le film ayant le score imdb le plus élevé parmis tout les films présents sur la plateforme

* Une section "Meileurs films" qui doit présenter les 7 films ayant le meilleur score imdb de toute la plateforme

* Trois sections présentant les meilleurs films d'une catégorie au choix 

## Lancement de l'API :

Pour pouvoir afficher la page web en local, il est nécéssaire de télécharger l'API fournie par OC, et de la lancer. Voici les étapes à suivre :

1. Télécharger le dépôt de l'API en lançant la commande suivante :

```bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

2. Créer un environnement virtuel python à la racine du dépôt que vous venez de cloner :

```bash
python -m venv env
```

3. Activer l'environnement virtuel en lançant le script suivant :
```bash
env/script/activate
```

4. Installer les packages python spécifiés dans le fichier ```requirement.txt``` :

```bash
pip install -r requirements.txt
```

5. Lancer le serveur de l'API:
```bash
python manage.py runserver
```

## Ouvir la page web dans un navigateur web 

Pour visualiser la page web, il suffit maintenant d'ouvir la page web ```index.html``` avec le navigateur de votre choix.


