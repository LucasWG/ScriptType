import { app, port } from './app'

app.listen(port, () => console.log(`\n  [INFO] running on http://localhost:${port}\n`))