import '@/css/index.css';
import '@/css/test.css';
import img from '../img/webpack.jpg';
import _ from "lodash";

function index(){
	console.log('hello webpack!');
};
index();
console.log("888888888");
document.getElementById('img').src = img;
require('./test.js');