<?php
$data = [];

$handle = fopen("team.tsv", "r");
$lnum = 0;
while (($l = fgets($handle)) !== false) {
    ++$lnum;
    if ($lnum == 1) {
        continue;
    }
    $ll = explode("\t", trim($l));
    $data[$ll[0]] = array_slice($ll, 1);
}

echo json_encode($data);
?>
