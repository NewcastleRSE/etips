eTIPS - Early Therapy in Perinatal Stroke

## About

eTIPS is a home based parent-delivered intervention for babies affected by perinatal stroke, developed by a team at Newcastle University and made possible by an NIHR Career Development Fellowship to Dr Anna Basu. Families involved are given developmental resources relevant to their baby's condition and additional support and advice throughout.

### Project Team

Dr Anna Basu, Newcastle University ([anna.basu@newcastle.ac.uk](mailto:anna.basu@newcastle.ac.uk))  
Janice Pearse, NHS ([janice.pearse@nhs.net](mailto:janice.pearse@nhs.net))

### RSE Contact

Arturo Guzmán Pérez
RSE Team
Newcastle University  
([arturo.guzman-perez@newcastle.ac.uk](mailto:arturo.guzman-perez@newcastle.ac.uk))

## Built With

Frameworks
[SvelteKit](https://kit.svelte.dev/)

Services (included in the docker-compose.yml file)
[Directus](https://directus.io/)
[Postgres](https://hub.docker.com/_/postgres/)
[Umami](https://umami.is)
[Caddy](https://caddyserver.com)

## Getting Started

### Prerequisites

Development:
[PNPM](https://pnpm.io/installation)

Testing/Production:
A server, or local machine to deploy to
[Docker and Docker compose](https://docs.docker.com/engine/install/debian/)
[SOPS](https://github.com/getsops/sops)
[AGE](https://github.com/FiloSottile/age#installation)

The docker compose will automatically deploy all services needed. Yet,
there will be no data and database structure at all. Please contact
[Arturo](<(mailto:arturo.guzman-perez@newcastle.ac.uk)>) to get the appropiate
AGE key, prepopulated database and media to deploy eTIPS.

Caddy sets up automatically SSL and all services under subdomains,
using the DOMAIN env variable

- for the frontend
- cms.\* for directus
- events.\*

### Installation

```bash
pnpm install
```

### Running Locally

Developing

```bash
git clone git@github.com:NewcastleRSE/etips.git
cd etips
pnpm install
pnpm run dev --host
```

Building

Locally:

```bash
pnpm run build
pnpm run preview
```

### Running Tests

Unit testing

```bash
pnpm run test:unit
```

E2E
TBC

## Deployment

### Local

[Local url](http://127.0.0.1:5173)

### Test

### Production

[https://etips.org.uk](https://etips.org.uk)

## Usage

TBC

## Roadmap

- [x] Initial Research
- [x] Minimum viable product
- [x] Alpha Release
- [ ] Feature-Complete Release

## Contributing

### Main Branch

Main

### Dev Branch

Dev

### Feature Branches

## License

## Citation

## Acknowledgements
