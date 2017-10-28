var mongoose = require('mongoose');
//mongoose.connect('mongodb://vectograph:vectopas@ds127375.mlab.com:27375/bankApp');
mongoose.connect('mongodb://localhost/bankApp');

mongoose.Promise = global.Promise;