<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'IMS-Thai') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Tabler CSS -->
        {{-- <link href="{{ asset('dist/css/tabler.min.css') }}" rel="stylesheet"/>
        <link href="{{ asset('dist/css/tabler-flags.min.css') }}" rel="stylesheet"/>
        <link href="{{ asset('dist/css/tabler-payments.min.css') }}" rel="stylesheet"/>
        <link href="{{ asset('dist/css/tabler-vendors.min.css') }}" rel="stylesheet"/>
        <link href="{{ asset('dist/css/demo.min.css') }}" rel="stylesheet"/>
        <link href="{{ asset('dist/css/tabler-social.min.css') }}" rel="stylesheet"/> --}}

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- Tabler Core -->
        <script src="{{ asset('dist/js/tabler.min.js') }}" defer></script>
        <script src="{{ asset('dist/js/demo.min.js') }}" defer></script>
        <script src="{{ asset('dist/js/demo-theme.min.js') }}" defer></script>
    </body>
</html> 