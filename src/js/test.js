function test() {
	console.log('test.js was imported');
};

test();

var sayHello = () => {
	console.log("hello world!");

	return;
};
sayHello();