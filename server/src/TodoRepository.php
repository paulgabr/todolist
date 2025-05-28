<?php
namespace App;

use PDO;

class TodoRepository {
  private $db;

  public function __construct() {
    $this->db = Database::getConnection();
  }

  public function getAll() {
    $stmt = $this->db->prepare("SELECT * FROM todos");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getById($id) {
    $stmt = $this->db->prepare("SELECT * FROM todos WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
  }

  public function create($title, $description = null, $done = false) {
    $stmt = $this->db->prepare("INSERT INTO todos (title, description, done) VALUES (?, ?, ?)");
    $stmt->execute([$title, $description, $done]);
    return $this->getById($this->db->lastInsertId());
  }

  public function update($id, $title = null, $description = null, $done = null) {
    $todo = $this->getById($id);
    if (!$todo) return null;

    $title = $title ?? $todo['title'];
    $description = $description ?? $todo['description'];
    $done = $done ?? $todo['done'];

    $stmt = $this->db->prepare("UPDATE todos SET title = ?, description = ?, done = ? WHERE id = ?");
    $stmt->execute([$title, $description, $done, $id]);

    return $this->getById($id);
  }

  public function delete($id) {
    $stmt = $this->db->prepare("DELETE FROM todos WHERE id = ?");
    return $stmt->execute([$id]);
  }
}