<?php
include("../dbconnect.php");

if(isset($_POST['email']) && isset($_POST['fullname'])
&& isset($_POST['username']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $fullname = $_POST['fullname'];
        $username = $_POST['username'];
        $password = $_POST['password'];

    try {
        $query = "INSERT INTO users(email, fullname, username, password)
                  VALUE (:email, :fullname, :username, :password)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email',$email);
        $stmt->bindParam(':fullname',$fullname);
        $stmt->bindParam(':username',$username);
        $stmt->bindParam(':password',$password);
        $res = $stmt->execute();

        if ($res) {
            echo json_encode(['res' => 'success']);
        } else {
            echo json_encode(['res' => 'error']);
        }
    } catch (PDOException $th) {
        echo json_encode(['error' => $th->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Something went wrong']);
}

?>