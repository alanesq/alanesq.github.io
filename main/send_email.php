<?php


// send an email - used by esp8266 projects etc - dec17 

// call with      http://alanesq.com/send_email.php?password=xx&subject=xxxxxx&message=xxxxxxx

// password determins which email address it will be sent 


// ---------------------------------------------------------


// authorisation code
$password = $_GET["password"];
$admin_email = "blank";


if ( $password == "rb" ) {
   $admin_email = "alanesq@disroot.org";                 // send to alan
}

if ( $password == "69" ) {
   $admin_email = "linda.taylor14@ntlworld.com";      // send to linda
}

if ( $password == "rb69" ) {
   $admin_email = "blackham.roy@ntlworld.com";        // send to dad
}

if ( $password == "sh" ) {
   $admin_email = "shonen@ntlworld.com";              // send to chris
}

if ( $password == "me6" ) {
   $admin_email = "melvin.pykett@gmail.com";          // send to melvin
}

if ( $password == "ps44" ) {
   $admin_email = "peter@scully.co.uk";               // send to scully
}


// subject of email
$subject = $_GET["subject"];
if( $subject == "" ) {
   $subject ="automated message - from php script";
}

// contents of email = parameter 'Info'
$message = $_GET["message"];
if( $message == "" ) {
   $message ="no message supplied";
}
$message = $message . "     (sent via send_email.php - alanesq.com)";

// address email reports to be from
$email 	= "noreply@alanesq.com";


// ------------------------


//send the email

if ( $admin_email != "blank" ) {      // i.e. a valid password was supplied
   $retval = mail($admin_email,"$subject",$message,"From:" .$email);
}

if( $retval == true ) {
    echo "OK<br><br>";
    echo "Message sent successfully to: " . $admin_email ."<br><br>";
    echo "Subject: " . $subject . "<br><br>";
    echo "Message: " . $message . "<br>";
}else {
    echo "ERROR<br><br>";
    if ( $admin_email == "blank" ) {
       echo "Access Denied!<br>";
    }
    echo "Message could not be sent<br>";
}


// ------------------------

?>