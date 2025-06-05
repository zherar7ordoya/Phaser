<?php

    $or = array(
        'n' => empty($_GET['nombre']) ? 'Nombre default' : $_GET['nombre'],
        'c' => empty($_GET['correo']) ? 'Correo default' : $_GET['correo'],
        'm' => empty($_GET['mensaje']) ? 'Mensaje default' : $_GET['mensaje']
    );
    
    echo json_encode($or);

?>