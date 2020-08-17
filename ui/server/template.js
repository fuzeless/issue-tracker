export default function template(body) {
  return (
    `<!DOCTYPE html>
    <html lang="en">
    <!-- Page rendered from server using template.js -->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
        <style>
            table.bordered-table th, td {border: 1px solid silver; padding: 6px}
            table.bordered-table {border-collapse: collapse;}
            input.invalid {border-color: red;}
            div.error {color: red;}
            body { padding-top: 20px; }
            .dropdown-toggle::after{
                content: none
            }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Issue Tracker</title>
    </head>
    <body>
        <div id="content">
            ${body}
            <script src="vendor.bundle.js"></script>
            <script src="app.bundle.js"></script>
        </div>
    </body>
    </html>`
  );
}
