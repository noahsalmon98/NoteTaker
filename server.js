const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3001;
const fs = require('fs');

//Middleware
app.use(express.json());
app.use(express.static('public'));