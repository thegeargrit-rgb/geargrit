# GearGrit Sanity Studio

Sanity Studio for GearGrit content modeling and editorial workflows.

## Scripts

- `npm run dev` - Start Studio locally
- `npm run build` - Build Studio
- `npm run seed:m2` - Import M2 sample data into the `production` dataset (`--missing` mode)

## Seed Workflow

The seed file is located at:

- `seed/m2-sample.ndjson`

Import sample content:

```powershell
cd C:\thegeargrit\geargrit\geargrit-sanity
npm run seed:m2
```

Import into a different dataset (PowerShell helper):

```powershell
cd C:\thegeargrit\geargrit\geargrit-sanity
powershell -ExecutionPolicy Bypass -File .\scripts\import-seed.ps1 -Dataset development
```

## Notes

- Seed content includes linked `category`, `brand`, `author`, `product`, `review`, and `guide` documents.
- Some image fields use placeholder asset references. Replace them with uploaded images in Studio.
