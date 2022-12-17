Projet 7 - Groupomania !

Projet numéro 7 de la formation développeur fullstack de Openclassrooms.

    - NodeJs + express + mongoose
    - React + tailwindcss
    - Mongodb



Backend :

    Dans le terminal (intégré à VScode par exemple), se positionner dans le dossier back puis exécuter la commande suivante :

        npm install
        npm install nodemon(si non présent sur votre machine)

    ensuite

        npm start

Attention : dans ce projet, le fichier .env.example fournit le formalisme attendu que vous devez renseigner pour vous connecter à votre propre base de données mongodb.



Frontend : 

    Dans le terminal (intégré à VScode par exemple), se positionner dans le dossier front puis exécuter la commande suivante :

        npm install

    ensuite

        npm start

si le navigateur ne s'ouvre pas automatiquement allez à :

http://localhost:3000/



Utilisation du réseau social :

    Pour s'inscrire sur le réseau social de Groupomania, il vous faut renseigner :

        - Votre nom (minmum 2 caractères)
        - Votre prénom (minmum 2 caractères)
        - Une adresse mail valide
        - Un mot de passe (de 8 minimum, 1 majuscules et 1 minuscules, 1 caractère spéciale)
        - Une confirmation de votre mot de passe

    Après cela, vous êtes redirigé sur la page de connexion.

    Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:

    un post
    un post + une image. Ces publications peuvent être likées, commentées, modifiées, supprimées. Le modérateur peut les modifier ou les supprimer.