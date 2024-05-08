<?php
include("../dbconnect.php");

if(isset($_GET['cuid'])) {
    $cuid = $_GET['cuid'];
    $fuid = $_GET['fuid'] ?? null;

    try {
        $query = "SELECT post.*,
        users.user_id, users.fullname, users.username, 
        image.filename, image.image_uid
        FROM post 
        INNER JOIN users ON post.user_id = users.user_id 
        LEFT JOIN follows ON post.user_id = follows.following_id
        LEFT JOIN image ON image.image_uid = post.image_uid 
        WHERE follows.follower_id = :fuid OR users.user_id = :cuid
        ORDER BY post.post_id DESC";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':fuid', $fuid);
        $stmt->bindParam(':cuid', $cuid);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $connection = [];foreach ($result as $row) {
        $collention = $row['post_id'];
        $filename = $row['filename'];if (!isset(
        $connection[$collention])) {
        $connection[$collention] = $row;
        $connection[$collention]['filenames'] = [];}
        $connection[$collention]['filenames'][] = $filename;unset(
        $connection[$collention]['filename']);unset(
        $connection[$collention]['image_id']);}
        $conection = array_values($connection);
        header('Content-type: application/json');
        echo json_encode($conection);
    } catch (PDOException $th) {
        echo json_encode(['error' => $th->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Missing reference']);
}

?>