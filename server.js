const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware pour parser le corps des requêtes JSON
app.use(bodyParser.json());

// Modèle de données pour les tâches
let tasks = [
    {
        id: 1,
        titre: "Étudier Node.js",
        description: "Suivre un tutoriel complet sur Node.js pour les débutants.",
        etat: "todo",
    },
    {
        id: 2,
        titre: "Préparer une présentation",
        description: "Créer les slides pour la réunion de demain.",
        etat: "doing",
    },
];

// Routes RESTful

// 1. Ajouter une tâche
app.post("/api/tasks", (req, res) => {
    const { titre, description, etat } = req.body;

    // Validation
    if (!titre || !description || !["todo", "doing", "done"].includes(etat)) {
        return res.status(400).json({
            message: "Les champs 'titre', 'description' et 'etat' (todo, doing, done) sont obligatoires.",
        });
    }

    // Créer une nouvelle tâche
    const newTask = {
        id: tasks.length + 1,
        titre,
        description,
        etat,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 2. Récupérer toutes les tâches
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// 3. Mettre à jour une tâche
app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { titre, description, etat } = req.body;

    // Trouver la tâche
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Tâche non trouvée." });
    }

    // Mise à jour des champs
    if (titre) tasks[taskIndex].titre = titre;
    if (description) tasks[taskIndex].description = description;
    if (etat && ["todo", "doing", "done"].includes(etat)) {
        tasks[taskIndex].etat = etat;
    }

    res.json(tasks[taskIndex]);
});

// 4. Supprimer une tâche
app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;

    // Trouver la tâche
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Tâche non trouvée." });
    }

    // Supprimer la tâche
    tasks.splice(taskIndex, 1);
    res.json({ message: "Tâche supprimée avec succès." });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
