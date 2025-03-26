<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        try {
            $ziggy = function () use ($request) {
                try {
                    return [
                        ...(new Ziggy)->toArray(),
                        'location' => $request->url(),
                    ];
                } catch (\Throwable $e) {
                    // Fallback when Ziggy class is not available
                    return [
                        'url' => $request->url(),
                        'location' => $request->url(),
                        'routes' => []
                    ];
                }
            };
        } catch (\Throwable $e) {
            // Fallback when Ziggy can't be used at all
            $ziggy = function () use ($request) {
                return [
                    'url' => $request->url(),
                    'location' => $request->url(),
                    'routes' => []
                ];
            };
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => $ziggy,
            'flash' => [
                'message' => session('message'),
                'error' => session('error'),
            ],
        ];
    }
} 