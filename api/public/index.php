<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, Content-Type, accept');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');

require '../vendor/autoload.php';
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = 'localhost';
$config['db']['user']   = 'root';
$config['db']['pass']   = '';
$config['db']['dbname'] = 'angular_api';

$app = new \Slim\App(['settings' => $config]);
require 'db.php';


// Add a new todo
$app->post('/user', function ($request, $response) {
    $input = $request->getParsedBody();
    $hass_pwd = MD5($input['password']);
    $sql = "INSERT INTO users (username,password,firstname,lastname) VALUES (:username,:password,:firstname,:lastname)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("username", $input['username']);
    $sth->bindParam("password", $hass_pwd);
    $sth->bindParam("firstname", $input['firstname']);
    $sth->bindParam("lastname", $input['lastname']);
    $sth->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
});


// get all todos
$app->get('/users', function ($request, $response, $args) {
        $sth = $this->db->prepare("SELECT * FROM users");
    $sth->execute();
    $todos = $sth->fetchAll();
    return $this->response->withJson($todos);
});

// DELETE a todo with given id
$app->delete('/user/{id}', function ($request, $response, $args) {
    $sth = $this->db->prepare("DELETE FROM users WHERE id=:id");
    $sth->bindParam("id", $args['id']);
    $sth->execute();
    $data = ["success"=> true];
    return $this->response->withJson($data);
});
$app->run();
