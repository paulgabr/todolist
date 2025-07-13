<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\UserRepository;

$repo = new UserRepository();

$app->post('/register', function (Request $request, Response $response) use ($repo) {
    $data = $request->getParsedBody();
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        $response->getBody()->write(json_encode(['error' => 'Email e senha são obrigatórios']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    $existingUser = $repo->getUserByEmail($email);

    if ($existingUser) {
        $response->getBody()->write(json_encode(['error' => 'Usuário já existe']));
        return $response->withStatus(409)->withHeader('Content-Type', 'application/json');
    }

    $user = $repo->create($email, $password);

    if (!$user) {
        $response->getBody()->write(json_encode(['error' => 'Falha na registro de usuário']));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode(['message' => 'Usuário registrado com sucesso']));
    return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
});

$app->post('/login', function (Request $request, Response $response) use ($repo) {
    $data = $request->getParsedBody();
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        $response->getBody()->write(json_encode(['error' => 'Email e senha são obrigatórios']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    $user = $repo->getUserByEmail($email);

    if (!$user || !password_verify($password, $user['password_hash'])) {
        $response->getBody()->write(json_encode(['error' => 'Email ou senha inválidos']));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }

    unset($user['password_hash']);
    $response->getBody()->write(json_encode($user));
    return $response->withHeader('Content-Type', 'application/json');
});