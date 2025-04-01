@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
{{ config('app.name') }}
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
