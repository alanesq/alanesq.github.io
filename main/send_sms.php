<?php

// send an sms via email gateway - used by esp8266 projects etc - nov16 

// call with   http://alanesq.com/send_email.php?password=rb&message=message_to_send


// ---------------------------------------------------------


// authorisation code
$password = $_GET["password"];

// message to send
$message = $_GET["message"];
if( $message == "" ) {
   $message ="no message supplied";
}

// message subject
$subject = "via send_sms.php: ";

// address to send email to 
$admin_email = "07871862749@txtlocal.co.uk";

// address email reports to be from
$email 	= "alanesq@disroot.org";



//send the email

if ( $password == "rb" ) {
   $retval = mail($admin_email,"$subject",$message,"From:" .$email);
}

if( $retval == true ) {
    echo "OK<br><br>";
    echo "Message sent successfully<br><br>";
    echo "Subject: " . $subject . "<br>";
    echo "Message: " . $message . "<br>";
}else {
    echo "ERROR<br><br>";
    if ( $password <> "rb" ) {
       echo "Access Denied!<br>";
    }
    echo "Message could not be sent<br>";
}

?>