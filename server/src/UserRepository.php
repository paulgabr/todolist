<?php

namespace App;

use PDO;

class UserRepository
{
  private $db;

  public function __construct()
  {
    $this->db = Database::getConnection();
  }

  public function create($email, $password)
  {
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $this->db->prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)");
    $stmt->execute([$email, $hash]);
    return $this->getUserByEmail($email);
  }

  public function getById($id)
  {
    $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
  }

  public function getUserByEmail($email)
  {
    $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
  }
}
