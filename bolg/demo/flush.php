<?php
set_time_limit(0);
ob_start();

$pad = str_repeat(' ', 4000);
echo $pad,'<br>';
ob_flush();
flush();

$i = 1;
while($i++){
	echo $pad,'<br>';
	echo $i,'<br>';
	ob_flush();
	flush();
	sleep(1);
}

 ?>