<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>upload result</title>
</head>
<body>
  <h1>upload ok</h1>
  <ul>
    <?php foreach($upload_data as $item => $value): ?>
    <li><?php echo $item . ': ' . $value; ?></li>
    <?php endforeach?>
  </ul>

  <p><?php echo anchor('upload', 'upload another file'); ?></p>
</body>
</html>