<html>
  <head>
    <title>test how to upload by ci</title>
  </head>
  <body>
    <?php echo $error; ?>
    <?php echo form_open_multipart('http://localhost:8088/upload/do_upload'); ?>
      <input type="file" name="userfile" size="20">
      <br>
      <br>
      <input type="submit" value="upload">
  </body>
</html>