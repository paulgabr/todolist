<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\TodoRepository;

$repo = new TodoRepository();

$app->get('/todos', function (Request $request, Response $response) use ($repo) {
  $todos = $repo->getAll();
  $response->getBody()->write(json_encode($todos));
  return $response->withHeader('Content-Type', 'application/json');
});


$app->get('/todos/{id}', function (Request $request, Response $response, array $args) use ($repo) {
  $todo = $repo->getById((int)$args['id']);
  if (!$todo) {
    $response->getBody()->write(json_encode(['error' => 'Not found']));
    return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
  }
  $response->getBody()->write(json_encode($todo));
  return $response->withHeader('Content-Type', 'application/json');
});

$app->post('/todos', function (Request $request, Response $response) use ($repo) {
  $data = $request->getParsedBody();
  $todo = $repo->create(
    $data['title'] ?? '',
    $data['description'] ?? '',
    $data['done'] ?? false
  );

  if (!$todo) {
    $response->getBody()->write(json_encode(['error' => 'Invalid data']));
    return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
  }

  $response->getBody()->write(json_encode($todo));
  return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
});

$app->put('/todos/{id}', function (Request $request, Response $response, array $args) use ($repo) {
  $id = (int)$args['id'];
  $data = $request->getParsedBody();

  $todo = $repo->update(
    $id,
    $data['title'] ?? null,
    $data['description'] ?? null,
    $data['done'] ?? null
  );

  if (!$todo) {
    $response->getBody()->write(json_encode(['error' => 'Not found']));
    return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
  }

  $response->getBody()->write(json_encode($todo));
  return $response->withHeader('Content-Type', 'application/json');
});

$app->delete('/todos/{id}', function (Request $request, Response $response, array $args) use ($repo) {
  $deleted = $repo->delete((int)$args['id']);
  if (!$deleted) {
    $response->getBody()->write(json_encode(['error' => 'Not found']));
    return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
  }
  $response->getBody()->write(json_encode(['message' => 'Todo deleted']));
  return $response->withHeader('Content-Type', 'application/json');
});
