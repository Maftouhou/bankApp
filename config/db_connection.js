var mongoose = require('mongoose');
mongoose.connect('mongodb://bankapp:bankapp@ds113906.mlab.com:13906/bankapp');
//mongoose.connect('mongodb://localhost/bankApp');

mongoose.Promise = global.Promise;