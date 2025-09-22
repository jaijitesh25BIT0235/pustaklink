# test.ps1 — smoke test
$base="http://127.0.0.1:8000"

Write-Host "1) Signup"
Invoke-RestMethod -Method Post -Uri "$base/auth/signup" -ContentType "application/json" -Body '{"email":"demo1@vitstudent.ac.in","full_name":"Demo User","college":"VIT Vellore","password":"password123"}'

Write-Host "2) Login"
$login = Invoke-RestMethod -Method Post -Uri "$base/auth/login" -ContentType "application/x-www-form-urlencoded" -Body @{ username="demo1@vitstudent.ac.in"; password="password123" }
$token=$login.access_token

Write-Host "3) Create listing"
Invoke-RestMethod -Method Post -Uri "$base/listing" -Headers @{ Authorization="Bearer $token" } -ContentType "application/json" -Body '{"isbn":"9780131103627","price":500,"condition":"like_new","subject":"CS","semester":3,"edition":2,"description":"Clean book","images":["https://picsum.photos/200"],"location":"VIT"}'

Write-Host "4) Fetch listings"
Invoke-RestMethod -Method Get -Uri "$base/listing?limit=5"
