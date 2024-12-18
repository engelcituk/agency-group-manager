## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```


## Deployment notes
- Cambiar el PM2_HOME que usa jenkings, desde las variables de entorno de jenkins.
- Si el entorno no es HTTPS, usar las cookie de la session en modo no seguro.


## Important

La version de Node usado y que no da problemas es v22.11.0