<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="color-scheme" content="dark">
    @yield('title')
    @vite(['Frontend/src/styles/app.css', 'Frontend/src/app.js'])
</head>

<body class="bg-slate-950 text-slate-100 antialiased">
    @yield('content')
</body>

</html>
