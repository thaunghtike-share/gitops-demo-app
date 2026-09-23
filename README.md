# GitOps Demo App

A small, stateless Node.js and Express application for demonstrating a complete
DevOps delivery flow with Docker, Amazon ECR, Kubernetes, Helm, and ArgoCD

The application has no database, authentication, persistent storage, or
external API dependencies.

## Endpoints

| Endpoint | Response | Purpose |
| --- | --- | --- |
| `GET /` | DevOps landing page | Browser demo |
| `GET /api` | Application and environment status JSON | API and routing demo |
| `GET /health` | `OK` | Container and Kubernetes probes |

The application listens on port `8080`.

## Run with Docker

Build the image:

```sh
docker build -t gitops-demo-app .
```

Start the container:

```sh
docker run -d \
  --name gitops-demo-app \
  -p 8080:8080 \
  gitops-demo-app
```

Open [http://localhost:8080](http://localhost:8080).

Test the endpoints:

```sh
curl http://localhost:8080/api
curl http://localhost:8080/health
```

The `main` branch identifies itself as `Production` on the landing page and as
`"environment": "production"` in the `/api` response. For the GitOps demo,
change these values to `Development`/`dev` or `UAT`/`uat` in their respective
branches.

Stop and remove the container:

```sh
docker stop gitops-demo-app
docker rm gitops-demo-app
```

## Run without Docker

Node.js 24 or later is required.

```sh
npm install
npm start
```

## Continuous integration

The GitHub Actions workflow builds and pushes images to the
`gitops-demo-app` Amazon ECR repository.

| Source | Image tag |
| --- | --- |
| Push to `dev` | `dev-<short-sha>` |
| Push to `uat` | `uat-<short-sha>` |
| Manual run from `main` | `production-<short-sha>` |

Add these GitHub repository secrets before running CI:

```text
AWS_ACCOUNT_ID
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

The ECR repository must already exist in `us-east-1`. Kubernetes, Helm, and
ArgoCD configuration should be maintained separately during the GitOps lab.
