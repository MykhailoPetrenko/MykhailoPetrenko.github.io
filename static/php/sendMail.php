<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'phpMailer/src/PHPMailer.php';
require 'phpMailer/src/Exception.php';
require 'phpMailer/src/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$usr_name =  $_POST['usr_name'];
$usr_phone =  $_POST['usr_phone'];
try {
    //Server settings
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    #$mail->setLanguage('ru','phpMailer/language/phpmailer.lang-ru.php')
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'mykhailopetrenkopl@gmail.com';                     // SMTP username
    $mail->Password   = 'jcfegsxjeuvctffv';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('mykhailopetrenkopl@gmail.com', 'Mykhailo Petrenko');
    $mail->addAddress('mykhailopetrenkopl@gmail.com', 'Mykhailo Petrenko');

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Заявка на обратную связь';
    $mail->Body    = '<b>' .$usr_name . '</b> оставил заявку на обратную связь, его телефон' .$usr_phone;
    $mail->AltBody = '';

    $mail->send();
    echo json_encode(['message' => 'Сообщение отправлено']);
} catch (Exception $e) {
   echo json_encode(['message' => 'Сообщение не отправлено']);
}
?>
