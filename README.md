# Ari 3D Portfolio V3

V3 patch berisi peningkatan utama:

- Head-tracking pada model GLB/GLTF.
- Untuk model rigged: mencari node/bone `head`, `neck`, atau fallback bone paling atas.
- Untuk model static single-mesh: memakai pendekatan static mesh split agar bagian kepala dapat bergerak terpisah secara visual.
- Background futuristik: hologram rings, infinite grid, sparkles, wireframe objects.
- Toggle light/dark/system theme tanpa dependency tambahan.
- Canvas DPR tetap dibatasi `[1, Math.min(2, window.devicePixelRatio)]`.

## Jalankan

```bash
npm install
npm run dev
```

Buka:

```bash
http://localhost:3000
```

## Catatan model

Model default `public/models/humanoid.glb` adalah static single mesh, sehingga V3 menggunakan fallback static split untuk mensimulasikan head tracking. Untuk hasil paling natural, gunakan GLB/GLTF rigged dengan bone `Head` dan `Neck`.
