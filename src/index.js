const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.get("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const findRepositoriesID =  repositories.find((findId) => findId.id  === id)
  if(!findRepositoriesID){
    return response.status(404).json({message:"Repositories não encontrado"});
  }
  return response.status(200).json(findRepositoriesID);
})

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository)
  return response.status(201).json({message:"repositories cadastrado com sucesso"})
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const updatedRepository = request.body;

 const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repositories não encontrado" });
  }

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;


  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex > 0) {
    return response.status(404).json({ error: "Repositories não encontrado" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json("repositories excluido com sucesso");
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repositories não encontrado" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json(likes);
});

module.exports = app;
