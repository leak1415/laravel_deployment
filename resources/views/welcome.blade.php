@extends('layouts.home')

@section('title')
    <title>Laravel 2026C | Vue Dashboard</title>
@endsection

@section('content')
    @php
        $links = [
            [
                'label' => 'Users',
                'href' => route('users.index'),
                'description' => 'Review user records and keep the directory tidy.',
            ],
            [
                'label' => 'Customers',
                'href' => route('customers.index'),
                'description' => 'Open the customer list and follow up quickly.',
            ],
            [
                'label' => 'Categories',
                'href' => route('categories.index'),
                'description' => 'Organize the catalog structure and category data.',
            ],
            [
                'label' => 'Products',
                'href' => route('products.index'),
                'description' => 'Jump into product management and price updates.',
            ],
        ];

        $metrics = [
            [
                'label' => 'Modules',
                'value' => '4',
                'detail' => 'Users, customers, categories, and products stay visible in one place.',
            ],
            [
                'label' => 'Front end',
                'value' => 'Vue',
                'detail' => 'A lightweight reactive shell powers the landing page.',
            ],
            [
                'label' => 'Scope',
                'value' => 'Small',
                'detail' => 'Only the first screen changed, so the backend flow stays familiar.',
            ],
            [
                'label' => 'Style',
                'value' => 'Refined',
                'detail' => 'Glass cards, layered gradients, and a calmer visual hierarchy.',
            ],
        ];

        $highlights = [
            [
                'title' => 'Fast entry',
                'text' => 'The landing page now feels like a dashboard instead of a plain link list.',
            ],
            [
                'title' => 'Reactive search',
                'text' => 'Vue filters the module cards without touching your controllers.',
            ],
            [
                'title' => 'Low risk',
                'text' => 'The CRUD layouts remain Bootstrap-based and untouched.',
            ],
        ];
    @endphp

    <div id="home-app" data-links='@json($links)' data-metrics='@json($metrics)' data-highlights='@json($highlights)'></div>
@endsection
