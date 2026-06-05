Write-Host "=== QUANTUM POWER API HEALTH CHECK ===" -ForegroundColor Cyan

# Test 1: Products endpoint
try {
    $products = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET
    Write-Host "[PASS] /api/products -> $($products.Count) models seeded:" -ForegroundColor Green
    foreach ($p in $products) {
        Write-Host "       - $($p.name) | $($p.kw_capacity) KW | Rs.$($p.price)" -ForegroundColor White
    }
} catch {
    Write-Host "[FAIL] /api/products -> $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Events endpoint
try {
    $event = Invoke-RestMethod -Uri "http://localhost:5000/api/events" -Method GET
    Write-Host "[PASS] /api/events -> Event: '$($event.title)' | Slots: $($event.available_slots)/$($event.total_slots)" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] /api/events -> $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Admin login
try {
    $body = '{"email":"admin@quantumpower.com","password":"Admin@3026"}'
    $login = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/admin/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "[PASS] /api/auth/admin/login -> JWT token issued for: $($login.user.name)" -ForegroundColor Green

    # Test 4: Analytics with admin token
    $headers = @{ Authorization = "Bearer $($login.token)" }
    $analytics = Invoke-RestMethod -Uri "http://localhost:5000/api/admin/analytics" -Method GET -Headers $headers
    Write-Host "[PASS] /api/admin/analytics -> Users: $($analytics.metrics.totalUsers) | Revenue: Rs.$($analytics.metrics.totalRevenue)" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] Admin auth/analytics -> $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "=== CHECK COMPLETE ===" -ForegroundColor Cyan
