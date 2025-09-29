
# 🚀 Exercices Jour 3 – Amélioration continue et optimisation des pipelines

Bienvenue dans le troisième jour de formation.  
L’objectif est de mettre en pratique les concepts vus ce matin :  
- Optimiser les pipelines CI/CD  
- Réduire leur durée et leur coût  
- Améliorer leur fiabilité (artifacts, promotion, métriques)  
- Développer une démarche d’amélioration continue  

---

## 📂 Contenu du dépôt
- `app/` : une petite application Node.js (endpoints `/hello` et `/metrics`)  
- `.github/workflows/ci-suboptimal.yml` : un workflow volontairement **sous-optimal** (votre point de départ)  
- Ce `README.md` : instructions détaillées des exercices  

Vous allez améliorer progressivement le pipeline et comparer les résultats.

---

## ⚙️ Pré-requis
- Un compte GitHub (ou organisation fournie par l’enseignant)  
- Git installé en local  
- Node.js ≥ 18 (pour tester localement l’app si besoin)  
- (Optionnel) Prometheus + Grafana pour la partie monitoring  

---

# 📝 Exercices

## Exercice 1 – Activer le cache des dépendances
🎯 **Objectif :** réduire le temps d’installation (`npm ci`).  

1. Ouvrez `.github/workflows/ci-suboptimal.yml` et repérez la ligne :  
   ```yaml
   - run: npm install
   ```
2. Modifiez-la pour utiliser `npm ci`.  
3. Cherchez comment **cacher les dépendances** avec GitHub Actions. Deux options :  
   - `actions/setup-node` avec `cache: "npm"`  
   - `actions/cache` ciblant le répertoire `~/.npm`  
4. Lancez deux exécutions du pipeline et comparez les durées avant/après.  

📌 **À rendre** : workflow modifié + captures des durées + observations.

---

## Exercice 2 – Paralléliser les jobs
🎯 **Objectif :** réduire le **wall-clock time** (temps global du pipeline).  

1. Le workflow actuel est séquentiel (lint → test → build).  
2. Modifiez-le pour créer **trois jobs distincts** :  
   - `lint`  
   - `test`  
   - `build`  
3. Utilisez éventuellement `needs:` si vous voulez gérer des dépendances.  
4. Comparez la durée totale par rapport au workflow séquentiel.  

📌 **À rendre** : workflow modifié + tableau comparatif (avant/après).

---

## Exercice 3 – Gérer un artifact et le promouvoir
🎯 **Objectif :** construire une fois, réutiliser ensuite.  

1. Dans le job `build`, générez un dossier `dist/`.  
2. Ajoutez un step `upload-artifact` pour stocker ce build.  
3. Créez un job `deploy` qui utilise `download-artifact`.  
4. Simulez un déploiement (ex : `echo "Déploiement avec artifact"`).  

📌 **À rendre** : workflow modifié + capture montrant l’artefact utilisé en `deploy`.

---

## Exercice 4 – Ajouter des métriques pipeline
🎯 **Objectif :** mesurer et observer le pipeline.  

1. Créez un job `metrics` qui s’exécute toujours (`if: always()`).  
2. Ajoutez un fichier `metrics.prom` contenant par exemple :  
   ```
   ci_pipeline_duration_seconds 120
   ci_pipeline_status{status="success"} 1
   ```
3. Upload ce fichier comme **artifact**.  
4. (Optionnel) Si vous avez Prometheus + Grafana : exposez ce fichier via un petit serveur et créez un dashboard simple.  

📌 **À rendre** : workflow modifié + artifact `metrics.prom` + (optionnel) capture Grafana.

---

# 🔍 Conseils pour réussir
- **Avancez étape par étape** : modifiez une seule chose à la fois.  
- **Comparez toujours avant/après** : c’est comme ça que vous mesurez les gains.  
- **Notez vos résultats** : durées, captures, conclusions.  
- **Rappelez-vous :** l’amélioration continue = petits pas réguliers.

---

# ✅ Livrables attendus
Chaque groupe doit fournir :  
- Votre workflow final (`.github/workflows/ci.yml`)  
- Captures d’écran des exécutions (durées, artifacts, metrics)  
- Un court rapport avec vos mesures et conclusions  

---

👉 À la fin, vous aurez conçu un pipeline plus rapide, plus fiable, et plus observable.  
