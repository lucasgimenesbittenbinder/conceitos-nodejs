const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;

  const repository = { id: uuid(), title, url, techs, likes };

  console.log(repository);

  repositories.push(repository);

  return response.json(repository);
});

{
  let n = 0;

  function A (n) { 
    n = n + 1;
    return n;
  }
  
  m = A(n);

  console.log({m, n});
}
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository doesn't exists." });
  }

  const oldRepository = repositories[repositoryIndex];

  const newRepository = {
    ...oldRepository,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = newRepository;

  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository doesn't exists." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const oldLikes = repositories[repositoryIndex].likes;
  const newLikes = oldLikes + 1;

  repositories[repositoryIndex].likes = newLikes;

  return response.json({ likes: newLikes });
});

module.exports = app;
