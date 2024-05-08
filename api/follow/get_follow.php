<?php
include("../dbconnect.php");

    $uid = $_GET['uid'] ?? null;
    try {
        $query = "SELECT * FROM users
                  LEFT JOIN follows ON users.user_id = follows.follower_id
                  WHERE user_id = :uid OR :uid IS NULL";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':uid', $uid);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-type: application/json');
        echo json_encode($result);
    } catch (PDOException $th) {
        echo json_encode(['error' => $th->getMessage()]);
    }

?>