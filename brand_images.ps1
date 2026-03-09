Add-Type -AssemblyName System.Drawing

$logoPath = "c:\Users\USER\Music\elixionprime\logo.png"
$imagesToBrand = @(
    "fumigation-service.png",
    "procurement-service.png",
    "manufacturing-service.png",
    "energy-service.png",
    "construction-service.png"
)

$logo = [System.Drawing.Image]::FromFile($logoPath)

foreach ($imgName in $imagesToBrand) {
    if (Test-Path "c:\Users\USER\Music\elixionprime\$imgName") {
        $imgPath = "c:\Users\USER\Music\elixionprime\$imgName"
        $img = [System.Drawing.Image]::FromFile($imgPath)
        $bmp = New-Object System.Drawing.Bitmap($img)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        
        [int]$logoWidth = [math]::Round($bmp.Width * 0.3)
        if ($logoWidth -lt 150) { $logoWidth = 150 }
        [int]$logoHeight = [math]::Round($logo.Height * ($logoWidth / $logo.Width))
        
        [int]$x = $bmp.Width - $logoWidth - 20
        [int]$y = 20
        
        $rect = New-Object System.Drawing.Rectangle(($x - 10), ($y - 10), ($logoWidth + 20), ($logoHeight + 20))
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 255, 255, 255))
        $g.FillRectangle($brush, $rect)
        $brush.Dispose()
        
        # New-Object System.Drawing.Rectangle for DrawImage is safer
        $g.DrawImage($logo, $x, $y, $logoWidth, $logoHeight)
        
        $outPath = "c:\Users\USER\Music\elixionprime\branded_$imgName"
        $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()
    }
}
$logo.Dispose()
Write-Host "Branding complete."
