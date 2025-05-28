pra rodar o projeto, siga os passos abaixo:
```bash
cd server
php -S localhost:8080 -t public
```




oq fiz ate agr foi?
 - criar minha pasta server
 - dentro da pasta rodar o comando
   ```bash
    mkdir server
    cd server
    composer require slim/slim:"^4.0" slim/psr7
    composer require nyholm/psr7
   ```
 - criar o arquivo index.php
```php
<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$todos = [
  ['id' => 1, 'title' => 'Todo 1', 'completed' => false],
];

$app->get('/todos', function (Request $request, Response $response) use ($todos) {
    $response->getBody()->write(json_encode($todos));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
?>
```
 - rodar o servidor
```bash
php -S localhost:8080 -t public
```
 - acessar a url http://localhost:8080/todos

 - criar o arquivo .gitignore
```gitignore
/vendor
/.env

 - Criei o banco em MySQL
 - Criei a tabela todos
```sql
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE
);
```
 - Criei o arquivo .env
```env
DB_HOST=localhost
DB_NAME=todolist
DB_USER=root
DB_PASS=password
``` 