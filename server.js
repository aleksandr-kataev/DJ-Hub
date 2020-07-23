const app = require('./app');
const PORT = require('./config').PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
