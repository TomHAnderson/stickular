<?php

$id = substr($_SERVER['REQUEST_URI'], strrpos($_SERVER['REQUEST_URI'], '/') + 1);

?>

<html>
<head>
</head>
<body>
<button class="snipcart-add-item"
  data-item-id="<?= $id; ?>"
  data-item-price="5.00"
  data-item-url="https://stickular.com/assets/inventory/<?= $id; ?>"
>Add To Cart</button>
</body>
</html>
